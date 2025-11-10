import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from "./blog.schema";
import { readFile, writeFile } from 'fs/promises'; // 파일을 읽고 쓰는 모듈 임포트
import { PostDto } from './blog.model';
import { Injectable } from "@nestjs/common";

// 블로그 리포지토리 인터페이스 정의
export interface BlogRepository {
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>): Promise<PostDto>;
    getPost(id: string): Promise<PostDto | undefined>;
    deletePost(id: string): Promise<boolean>;
    updatePost(id: string, postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>): Promise<PostDto | null>;
}

// BlogRepository를 구현한 클랫. 파일을 읽고 쓰기
@Injectable()
export class BlogFileRepository implements BlogRepository {
    FILE_NAME = './src/blog.data.json';

    // 파일을 읽어서 모든 게시글 불러오기
    private async readAll(): Promise<PostDto[]> {
        const datas = await readFile(this.FILE_NAME, 'utf8');
        return JSON.parse(datas) as PostDto[];
    }


    private async writeAll(posts: PostDto[]): Promise<void> {
        // pretty-print + utf8 명시
        await writeFile(this.FILE_NAME, JSON.stringify(posts, null, 2), 'utf8');
    }

    async getAllPost(): Promise<PostDto[]> {
        return this.readAll();
    }

    // 게시글 쓰기
    async createPost(postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>): Promise<PostDto> {
        const posts = await this.readAll();
        const id = (posts.length + 1).toString();

        const now = new Date();
        const created: PostDto = {
            id,
            ...postDto,
            createdDt: now,
            updatedDt: now,
        };

        posts.push(created);
        await this.writeAll(posts);
        return created;
    }

    // 게시글 하나 가져오기
    async getPost(id: string): Promise<PostDto | undefined> {
        const posts = await this.getAllPost();
        return posts.find((post) => post.id === id);
    }

    // 게시글 하나 삭제
    async deletePost(id: string): Promise<boolean> {
        const posts = await this.readAll();
        const filteredPosts = posts.filter((post) => post.id !== id);
        const changed = filteredPosts.length !== posts.length;
        if(changed) await this.writeAll(filteredPosts);
        return changed;
    }

    // 게시글 하나 수정하기
    async updatePost(id: string, patch: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>): Promise<PostDto | null> {
        const posts = await this.readAll();
        const index = posts.findIndex((post) => post.id === id);
        if (index === -1) return null;

        const prev = posts[index];

        // createdDt는 반드시 보존, updatedDt는 갱신
        const next: PostDto = {
            ...prev,    // 먼저 이전 값을 복사
            ...patch,   // 바꿀 필드만 덮어쓰기
            id: prev.id,// id는 불변
            createdDt: prev.createdDt ?? new Date(),
            updatedDt: new Date(),
        };

        posts[index] = next;
        await this.writeAll(posts);
        return next;
    }
}

@Injectable()
// 몽고디비용 리포지토리
export class BlogMongoRepository implements BlogRepository {
    // Model<BlogDocument> 타입인 blogModel 주입
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

    // 모든 게시글을 읽어오는 함수
    async getAllPost(): Promise<PostDto[]> {
        const docs = await this.blogModel.find().exec();
        // Mongoose Document → DTO 변환
        return docs.map(doc => ({
            id: doc._id.toString(),
            title: doc.title,
            content: doc.content,
            name: doc.name,
            createdDt: doc.createdDt,
            updatedDt: doc.updatedDt,
        }));
    }

    // 게시글 작성
    async createPost(postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>
    ): Promise<PostDto> {
        const createPost = {
            ...postDto,
            createdDt: new Date(),
            updatedDt: new Date(),
        };
        const created = await this.blogModel.create(createPost);
        return {
            id: created._id.toString(),
            title: created.title,
            content: created.content,
            name: created.name,
            createdDt: created.createdDt,
            updatedDt: created.updatedDt,
        };
    }

    // 하나의 게시글 읽기
    async getPost(id: string): Promise<PostDto | undefined> {
        const doc = await this.blogModel.findById(id).exec();
        if (!doc) return undefined;
        return {
            id: doc._id.toString(),
            title: doc.title,
            content: doc.content,
            name: doc.name,
            createdDt: doc.createdDt,
            updatedDt: doc.updatedDt,
        };
    }

    // 하나의 게시글 삭제
    async deletePost(id: string): Promise<boolean> {
        const result = await this.blogModel.findByIdAndDelete(id).exec();
        return !!result;
    }

    // 게시글 업데이트
    async updatePost(id: string, patch: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>
    ): Promise<PostDto | null> {
        const updatePost = { ...patch, updatedDt: new Date() };
        const updated = await this.blogModel.findByIdAndUpdate(id, updatePost, { new: true }).exec();
        if (!updated) return null;

        return {
            id: updated._id.toString(),
            title: updated.title,
            content: updated.content,
            name: updated.name,
            createdDt: updated.createdDt,
            updatedDt: updated.updatedDt,
        };
    }
}
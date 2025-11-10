import { PostDto } from './blog.model'; // 게시글의 타입 정보 임포트
import { Injectable } from "@nestjs/common";

// 리포지토리 클래스와 인터페이스 임포트
// import { BlogRepository, BlogFileRepository } from "./blog.repository";
import { BlogMongoRepository } from "./blog.repository";

@Injectable()
export class BlogService {
    //posts: PostDto[] = []; // 게시글 배열 선언
    // blogRepository: BlogRepository;

    // constructor() { // 블로그 리포지토리 객체 생성
    //     this.blogRepository = new BlogFileRepository();
    // }

    // 생성자를 통한 의존성 주입
    constructor(private blogRepository: BlogMongoRepository) {
        this.blogRepository = blogRepository;
    }

    async getAllPosts() { // 모든 게시글 가져오기
        return await this.blogRepository.getAllPost();
    }

    async createPost(postDto: PostDto): Promise<PostDto> { // 게시글 작성
        return this.blogRepository.createPost(postDto);
    }

    async getPost(id): Promise<PostDto | undefined> { // 게시글 하나 가져오기
        return await this.blogRepository.getPost(id);
    }

    async delete(id): Promise<boolean> { // 게시글 삭제
        return this.blogRepository.deletePost(id);
    }

    async updatePost(id, postDto: PostDto): Promise<PostDto | null> { // 게시글 수정
        return this.blogRepository.updatePost(id, postDto);
    }

    // getAllPosts() { // 모든 게시글 가져오기
    //     return this.posts;
    // }
    //
    // createPost(postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>) { // 게시글 작성
    //     const id = (this.posts.length + 1).toString();
    //     this.posts.push({ id, ...postDto, createdDt: new Date() });
    // }
    //
    // getPost(id) { // 게시글 하나 가져오기
    //     const post = this.posts.find((post) => {
    //        return post.id === id;
    //     });
    //     console.log(post);
    //     return post;
    // }
    //
    // delete(id) { // 게시글 삭제
    //     const filteredPosts = this.posts.filter((post) => post.id !== id);
    //     this.posts = [...filteredPosts];
    // }
    //
    // updatePost(id, postDto: Omit<PostDto, 'id' | 'createdDt'>) {  // 게시글 업데이트
    //     const index = this.posts.findIndex((post) => post.id === id);
    //     if (index === -1) return null;
    //
    //     const updatePost: PostDto = {
    //         ...this.posts[index],
    //         ...postDto,
    //         id,             // 기존 id 유지
    //         updatedDt: new Date() };
    //     this.posts[index] = updatePost;
    //     return updatePost;
    // }
}
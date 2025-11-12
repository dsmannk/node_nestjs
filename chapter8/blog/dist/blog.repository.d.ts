import { Model } from 'mongoose';
import { BlogDocument } from "./blog.schema";
import { PostDto } from './blog.model';
export interface BlogRepository {
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>): Promise<PostDto>;
    getPost(id: string): Promise<PostDto | undefined>;
    deletePost(id: string): Promise<boolean>;
    updatePost(id: string, postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>): Promise<PostDto | null>;
}
export declare class BlogFileRepository implements BlogRepository {
    FILE_NAME: string;
    private readAll;
    private writeAll;
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>): Promise<PostDto>;
    getPost(id: string): Promise<PostDto | undefined>;
    deletePost(id: string): Promise<boolean>;
    updatePost(id: string, patch: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>): Promise<PostDto | null>;
}
export declare class BlogMongoRepository implements BlogRepository {
    private blogModel;
    constructor(blogModel: Model<BlogDocument>);
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>): Promise<PostDto>;
    getPost(id: string): Promise<PostDto | undefined>;
    deletePost(id: string): Promise<boolean>;
    updatePost(id: string, patch: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>): Promise<PostDto | null>;
}

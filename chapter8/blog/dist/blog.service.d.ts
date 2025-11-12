import { PostDto } from './blog.model';
import { BlogMongoRepository } from "./blog.repository";
export declare class BlogService {
    private blogRepository;
    constructor(blogRepository: BlogMongoRepository);
    getAllPosts(): Promise<PostDto[]>;
    createPost(postDto: PostDto): Promise<PostDto>;
    getPost(id: any): Promise<PostDto | undefined>;
    delete(id: any): Promise<boolean>;
    updatePost(id: any, postDto: PostDto): Promise<PostDto | null>;
}

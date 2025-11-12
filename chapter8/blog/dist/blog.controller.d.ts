import { BlogService } from "./blog.service";
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    getAllPosts(): Promise<import("./blog.model").PostDto[]>;
    createPost(postDto: any): string;
    getPost(id: string): Promise<import("./blog.model").PostDto | undefined>;
    deletePost(id: string): string;
    updatePost(id: string, postDto: any): Promise<import("./blog.model").PostDto | null>;
}

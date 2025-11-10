import { PostDto } from './blog.model'; // 게시글의 타입 정보 임포트

export class BlogService {
    posts: PostDto[] = []; // 게시글 배열 선언

    getAllPosts() { // 모든 게시글 가져오기
        return this.posts;
    }

    createPost(postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>) { // 게시글 작성
        const id = (this.posts.length + 1).toString();
        this.posts.push({ id, ...postDto, createdDt: new Date() });
    }

    getPost(id) { // 게시글 하나 가져오기
        const post = this.posts.find((post) => {
           return post.id === id;
        });
        console.log(post);
        return post;
    }

    delete(id) { // 게시글 삭제
        const filteredPosts = this.posts.filter((post) => post.id !== id);
        this.posts = [...filteredPosts];
    }

    updatePost(id, postDto: Omit<PostDto, 'id' | 'createdDt'>) {  // 게시글 업데이트
        const index = this.posts.findIndex((post) => post.id === id);
        if (index === -1) return null;

        const updatePost: PostDto = {
            ...this.posts[index],
            ...postDto,
            id,             // 기존 id 유지
            updatedDt: new Date() };
        this.posts[index] = updatePost;
        return updatePost;
    }
}
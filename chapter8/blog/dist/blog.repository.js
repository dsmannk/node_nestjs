"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogMongoRepository = exports.BlogFileRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_schema_1 = require("./blog.schema");
const promises_1 = require("fs/promises");
const common_1 = require("@nestjs/common");
let BlogFileRepository = class BlogFileRepository {
    FILE_NAME = './src/blog.data.json';
    async readAll() {
        const datas = await (0, promises_1.readFile)(this.FILE_NAME, 'utf8');
        return JSON.parse(datas);
    }
    async writeAll(posts) {
        await (0, promises_1.writeFile)(this.FILE_NAME, JSON.stringify(posts, null, 2), 'utf8');
    }
    async getAllPost() {
        return this.readAll();
    }
    async createPost(postDto) {
        const posts = await this.readAll();
        const id = (posts.length + 1).toString();
        const now = new Date();
        const created = {
            id,
            ...postDto,
            createdDt: now,
            updatedDt: now,
        };
        posts.push(created);
        await this.writeAll(posts);
        return created;
    }
    async getPost(id) {
        const posts = await this.getAllPost();
        return posts.find((post) => post.id === id);
    }
    async deletePost(id) {
        const posts = await this.readAll();
        const filteredPosts = posts.filter((post) => post.id !== id);
        const changed = filteredPosts.length !== posts.length;
        if (changed)
            await this.writeAll(filteredPosts);
        return changed;
    }
    async updatePost(id, patch) {
        const posts = await this.readAll();
        const index = posts.findIndex((post) => post.id === id);
        if (index === -1)
            return null;
        const prev = posts[index];
        const next = {
            ...prev,
            ...patch,
            id: prev.id,
            createdDt: prev.createdDt ?? new Date(),
            updatedDt: new Date(),
        };
        posts[index] = next;
        await this.writeAll(posts);
        return next;
    }
};
exports.BlogFileRepository = BlogFileRepository;
exports.BlogFileRepository = BlogFileRepository = __decorate([
    (0, common_1.Injectable)()
], BlogFileRepository);
let BlogMongoRepository = class BlogMongoRepository {
    blogModel;
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async getAllPost() {
        const docs = await this.blogModel.find().exec();
        return docs.map(doc => ({
            id: doc._id.toString(),
            title: doc.title,
            content: doc.content,
            name: doc.name,
            createdDt: doc.createdDt,
            updatedDt: doc.updatedDt,
        }));
    }
    async createPost(postDto) {
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
    async getPost(id) {
        const doc = await this.blogModel.findById(id).exec();
        if (!doc)
            return undefined;
        return {
            id: doc._id.toString(),
            title: doc.title,
            content: doc.content,
            name: doc.name,
            createdDt: doc.createdDt,
            updatedDt: doc.updatedDt,
        };
    }
    async deletePost(id) {
        const result = await this.blogModel.findByIdAndDelete(id).exec();
        return !!result;
    }
    async updatePost(id, patch) {
        const updatePost = { ...patch, updatedDt: new Date() };
        const updated = await this.blogModel.findByIdAndUpdate(id, updatePost, { new: true }).exec();
        if (!updated)
            return null;
        return {
            id: updated._id.toString(),
            title: updated.title,
            content: updated.content,
            name: updated.name,
            createdDt: updated.createdDt,
            updatedDt: updated.updatedDt,
        };
    }
};
exports.BlogMongoRepository = BlogMongoRepository;
exports.BlogMongoRepository = BlogMongoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogMongoRepository);
//# sourceMappingURL=blog.repository.js.map
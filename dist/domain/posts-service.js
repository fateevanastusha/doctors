"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsService = void 0;
const posts_db_repositiory_1 = require("../repositories/posts-db-repositiory");
const queryRepo_1 = require("../queryRepo");
exports.postsService = {
    //return all posts
    returnAllPost(PageSize, Page, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const total = (yield posts_db_repositiory_1.postsRepository.returnAllPost()).length;
            const PageCount = Math.ceil(total / PageSize);
            const Items = yield queryRepo_1.QueryRepository.PaginatorForPosts(PageCount, PageSize, Page, sortBy, sortDirection);
            return queryRepo_1.QueryRepository.PaginationForm(PageCount, PageSize, Page, total, Items);
        });
    },
    //return post by id
    returnPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return posts_db_repositiory_1.postsRepository.returnPostById(id);
        });
    },
    //delete post by id
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return posts_db_repositiory_1.postsRepository.deletePostById(id);
        });
    },
    //delete all data
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            posts_db_repositiory_1.postsRepository.deleteAllData();
        });
    },
    //create new post
    createNewPost(post, blogName, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                id: '' + (+(new Date())),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: blogId,
                blogName: blogName,
                createdAt: new Date().toISOString()
            };
            const createdPost = yield posts_db_repositiory_1.postsRepository.createNewPost(newPost);
            return createdPost;
        });
    },
    //update post by id
    updatePostById(post, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_db_repositiory_1.postsRepository.updatePostById(post, id);
        });
    },
    //return all posts by blogId
    getAllPostsByBlogId(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            return posts_db_repositiory_1.postsRepository.getAllPostsByBlogId(blogId);
        });
    }
};

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
exports.postsRepository = void 0;
const db_1 = require("../db/db");
exports.postsRepository = {
    //return all posts
    returnAllPost() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.postsCollection
                .find({}, { projection: { _id: 0 } })
                .toArray();
        });
    },
    //return post by Id
    returnPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.postsCollection.findOne({ id: id }, { projection: { _id: 0 } });
        });
    },
    //delete post by Id
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    //delete all data
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.postsCollection.deleteMany({});
            return [];
        });
    },
    //create new post
    createNewPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.postsCollection.insertOne(newPost);
            console.log(newPost);
            return this.returnPostById(newPost.id);
        });
    },
    //update post by id
    updatePostById(post, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.updateOne({ id: id }, { $set: {
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId
                }
            });
            return result.matchedCount === 1;
        });
    },
    //return all posts by blogId
    getAllPostsByBlogId(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.postsCollection.find({ blogId }, { projection: { _id: 0 } }).toArray();
        });
    }
};

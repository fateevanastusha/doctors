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
exports.adminAuth = exports.basicAuth = exports.postsRouter = void 0;
const express_1 = require("express");
exports.postsRouter = (0, express_1.Router)();
const posts_db_repositiory_1 = require("../repositories/posts-db-repositiory");
const blogs_db_repositiory_1 = require("../repositories/blogs-db-repositiory");
const input_valudation_middleware_1 = require("../middlewares/input-valudation-middleware");
exports.basicAuth = require('express-basic-auth');
exports.adminAuth = (0, exports.basicAuth)({ users: { 'admin': 'qwerty' } });
//GET - return all
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let posts = yield posts_db_repositiory_1.postsRepository.returnAllPost();
    res.status(200).send(posts);
}));
//GET - return by ID
exports.postsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPost = yield posts_db_repositiory_1.postsRepository.returnPostById(req.params.id);
    if (foundPost) {
        res.status(200).send(foundPost);
    }
    else {
        res.sendStatus(404);
    }
}));
//DELETE - delete by ID
exports.postsRouter.delete('/:id', exports.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let status = yield posts_db_repositiory_1.postsRepository.deletePostById(req.params.id);
    if (status) {
        res.sendStatus(204);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
}));
//POST - create new 
exports.postsRouter.post('/', exports.adminAuth, input_valudation_middleware_1.postValidationMiddleware, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = yield blogs_db_repositiory_1.blogsRepository.returnBlogById(req.body.blogId);
    if (foundBlog === null) {
        res.sendStatus(404);
    }
    else {
        const blogName = foundBlog.name;
        const newPostPromise = yield posts_db_repositiory_1.postsRepository.createNewPost(req.body, blogName);
        res.status(201).send(newPostPromise);
    }
}));
//PUT - update
exports.postsRouter.put('/:id', exports.adminAuth, input_valudation_middleware_1.postValidationMiddleware, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield posts_db_repositiory_1.postsRepository.updatePostById(req.body, req.params.id);
    if (status) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));

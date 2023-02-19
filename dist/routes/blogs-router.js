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
exports.adminAuth = exports.basicAuth = exports.blogsRouter = void 0;
const express_1 = require("express");
exports.blogsRouter = (0, express_1.Router)();
const blogs_db_repositiory_1 = require("../repositories/blogs-db-repositiory");
const input_valudation_middleware_1 = require("../middlewares/input-valudation-middleware");
const posts_db_repositiory_1 = require("../repositories/posts-db-repositiory");
exports.basicAuth = require('express-basic-auth');
exports.adminAuth = (0, exports.basicAuth)({ users: { 'admin': 'qwerty' } });
//GET - return all
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allBlogs = yield blogs_db_repositiory_1.blogsRepository.returnAllBlogs();
    res.status(200).send(allBlogs);
    return;
}));
//GET - return by ID
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = blogs_db_repositiory_1.blogsRepository.returnBlogById(req.params.id);
    let blog = yield foundBlog;
    if (blog) {
        res.status(200).send(blog);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
}));
//DELETE - delete by ID
exports.blogsRouter.delete('/:id', exports.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let status = yield blogs_db_repositiory_1.blogsRepository.deleteBlogById(req.params.id);
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
exports.blogsRouter.post('/', exports.adminAuth, input_valudation_middleware_1.blogValidationMiddleware, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield blogs_db_repositiory_1.blogsRepository.createNewBlog(req.body);
    res.status(201).send(newBlog);
    return;
}));
//PUT - update
exports.blogsRouter.put('/:id', exports.adminAuth, input_valudation_middleware_1.blogValidationMiddleware, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield blogs_db_repositiory_1.blogsRepository.updateBlogById(req.body, req.params.id);
    if (status) {
        res.sendStatus(204);
    }
    else {
        res.send(404);
    }
}));
//NEW - POST - create post for blog
exports.blogsRouter.post('/:id/posts', exports.adminAuth, input_valudation_middleware_1.postValidationMiddleware, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //find blog by id
    console.log(req.params);
    const foundBlog = yield blogs_db_repositiory_1.blogsRepository.returnBlogById(req.params.id);
    if (foundBlog === null) {
        res.sendStatus(404);
    }
    else {
        const blogId = foundBlog.id;
        const blogName = foundBlog.name;
        const newPost = yield posts_db_repositiory_1.postsRepository.createNewPost(req.body, blogName, blogId);
        res.status(201).send(newPost);
    }
}));
//NEW - GET - get all posts in blog
exports.blogsRouter.get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //find blog by id
    const blogId = req.params.id;
    const foundPosts = posts_db_repositiory_1.postsRepository.getAllPostsByBlogId(req.params.id);
    const posts = yield foundPosts;
    if (posts) {
        res.status(200).send(posts);
    }
    else {
        res.send(404);
    }
}));

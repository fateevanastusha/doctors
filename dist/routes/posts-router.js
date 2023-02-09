"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.basicAuth = exports.postsRouter = void 0;
const express_1 = require("express");
exports.postsRouter = (0, express_1.Router)();
const posts_repositiory_1 = require("../repositories/posts-repositiory");
const input_valudation_middleware_1 = require("../middlewares/input-valudation-middleware");
const blogs_repositiory_1 = require("../repositories/blogs-repositiory");
exports.basicAuth = require('express-basic-auth');
exports.adminAuth = (0, exports.basicAuth)({ users: { 'admin': 'qwerty' } });
//GET - return all
exports.postsRouter.get('/', (req, res) => {
    let newPost = posts_repositiory_1.postsRepository.returnAllPost();
    res.status(200).send(newPost);
    return;
});
//GET - return by ID
exports.postsRouter.get('/:id', (req, res) => {
    let post = posts_repositiory_1.postsRepository.returnPostById(req.params.id);
    if (post) {
        res.status(200).send(post);
        return;
    }
    else {
        res.send(404);
        return;
    }
});
//DELETE - delete by ID
exports.postsRouter.delete('/:delete', exports.adminAuth, (req, res) => {
    let status = posts_repositiory_1.postsRepository.deletePostById(req.params.id);
    if (status) {
        res.sendStatus(204);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
});
//POST - create new 
exports.postsRouter.post('/', exports.adminAuth, input_valudation_middleware_1.postValidationMiddleware, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => {
    const blog = blogs_repositiory_1.blogsRepository.returnBlogById(req.body.blogId);
    let newPost = posts_repositiory_1.postsRepository.createNewPost(req.body, blog.name);
    res.status(201).send(newPost);
    return;
});
//PUT - update
exports.postsRouter.put('/:id', exports.adminAuth, input_valudation_middleware_1.postValidationMiddleware, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => {
    posts_repositiory_1.postsRepository.updatePostById(req.body, req.params.id);
    res.sendStatus(204);
});

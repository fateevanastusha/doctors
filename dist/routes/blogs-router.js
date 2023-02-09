"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.basicAuth = exports.blogsRouter = void 0;
const express_1 = require("express");
exports.blogsRouter = (0, express_1.Router)();
const blogs_repositiory_1 = require("../repositories/blogs-repositiory");
const input_valudation_middleware_1 = require("../middlewares/input-valudation-middleware");
exports.basicAuth = require('express-basic-auth');
exports.adminAuth = (0, exports.basicAuth)({ users: { 'admin': 'querty' } });
//GET - return all
exports.blogsRouter.get('/', (req, res) => {
    let allBlogs = blogs_repositiory_1.blogsRepository.returnAllBlogs();
    res.status(200).send(allBlogs);
});
//GET - return by ID
exports.blogsRouter.get('/:id', (req, res) => {
    let blog = blogs_repositiory_1.blogsRepository.returnBlogById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
    }
    else {
        res.send(404);
    }
});
//DELETE - delete by ID
exports.blogsRouter.delete('/:id', exports.adminAuth, (req, res) => {
    let status = blogs_repositiory_1.blogsRepository.deleteBlogById(req.params.id);
    if (status) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
//POST - create new
exports.blogsRouter.post('/', exports.adminAuth, input_valudation_middleware_1.blogValidationMiddleware, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => {
    let newVideo = blogs_repositiory_1.blogsRepository.createNewBlog(req.body);
    res.status(201).send(newVideo);
});
//PUT - update
exports.blogsRouter.put('/:id', exports.adminAuth, input_valudation_middleware_1.blogValidationMiddleware, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => {
    blogs_repositiory_1.blogsRepository.updateBlogById(req.body, req.params.id);
    res.sendStatus(204);
});

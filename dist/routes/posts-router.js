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
const input_valudation_middleware_1 = require("../middlewares/input-valudation-middleware");
const posts_service_1 = require("../domain/posts-service");
const blogs_service_1 = require("../domain/blogs-service");
const pagination_helpers_1 = require("../helpers/pagination-helpers");
const posts_db_repositiory_1 = require("../repositories/posts-db-repositiory");
const auth_middlewares_1 = require("../middlewares/auth-middlewares");
const jwt_service_1 = require("../application/jwt-service");
const comments_service_1 = require("../domain/comments-service");
exports.basicAuth = require('express-basic-auth');
exports.adminAuth = (0, exports.basicAuth)({ users: { 'admin': 'qwerty' } });
//GET - return all
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pageSize = pagination_helpers_1.paginationHelpers.pageSize(req.query.pageSize);
    let pageNumber = pagination_helpers_1.paginationHelpers.pageNumber(req.query.pageNumber);
    let sortBy = pagination_helpers_1.paginationHelpers.sortBy(req.query.sortBy);
    let sortDirection = pagination_helpers_1.paginationHelpers.sortDirection(req.query.sortDirection);
    let allPosts = yield posts_service_1.postsService.returnAllPost(pageSize, pageNumber, sortBy, sortDirection);
    res.status(200).send(allPosts);
}));
//GET - return by ID
exports.postsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPost = yield posts_service_1.postsService.returnPostById(req.params.id);
    if (foundPost) {
        res.status(200).send(foundPost);
    }
    else {
        res.sendStatus(404);
    }
}));
//DELETE - delete by ID
exports.postsRouter.delete('/:id', exports.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let status = yield posts_service_1.postsService.deletePostById(req.params.id);
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
exports.postsRouter.post('/', exports.adminAuth, input_valudation_middleware_1.titleCheck, input_valudation_middleware_1.shortDescriptionCheck, input_valudation_middleware_1.contentCheck, input_valudation_middleware_1.blogIdCheck, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = yield blogs_service_1.blogsService.returnBlogById(req.body.blogId);
    if (foundBlog === null) {
        res.sendStatus(404);
    }
    else {
        const blogId = foundBlog.id;
        const blogName = foundBlog.name;
        const newPost = yield posts_service_1.postsService.createNewPost(req.body, blogName, blogId);
        console.log(newPost);
        res.status(201).send(newPost);
    }
}));
//PUT - update
exports.postsRouter.put('/:id', exports.adminAuth, input_valudation_middleware_1.titleCheck, input_valudation_middleware_1.shortDescriptionCheck, input_valudation_middleware_1.contentCheck, input_valudation_middleware_1.blogIdCheck, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield posts_service_1.postsService.updatePostById(req.body, req.params.id);
    if (status) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
//CREATE COMMENT BY POST ID
exports.postsRouter.post('/:id/comments', auth_middlewares_1.authMiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPost = yield posts_db_repositiory_1.postsRepository.returnPostById(req.params.id);
    if (foundPost === null) {
        res.sendStatus(404);
    }
    else {
        const postId = req.params.id;
        let userId = yield jwt_service_1.jwtService.getUserByIdToken(req.headers.authorization.split(" ")[1]);
        console.log(userId);
        const createdComment = yield comments_service_1.commentsService.createComment(postId, userId, req.body.content);
        if (createdComment) {
            res.status(201).send(createdComment);
        }
        else {
            res.sendStatus(401);
        }
    }
}));
exports.postsRouter.get('/:id/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPost = yield posts_service_1.postsService.returnPostById(req.params.id);
    if (foundPost === null) {
        res.sendStatus(404);
    }
    else {
        let pageSize = pagination_helpers_1.paginationHelpers.pageSize(req.query.pageSize);
        let pageNumber = pagination_helpers_1.paginationHelpers.pageNumber(req.query.pageNumber);
        let sortBy = pagination_helpers_1.paginationHelpers.sortBy(req.query.sortBy);
        let sortDirection = pagination_helpers_1.paginationHelpers.sortDirection(req.query.sortDirection);
        const foundComments = yield comments_service_1.commentsService.getAllCommentsByPostId(pageSize, pageNumber, sortBy, sortDirection, req.params.id);
        res.status(200).send(foundComments);
    }
}));

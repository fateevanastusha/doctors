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
exports.commentsRouter = void 0;
const express_1 = require("express");
const comments_service_1 = require("../domain/comments-service");
const input_valudation_middleware_1 = require("../middlewares/input-valudation-middleware");
const auth_middlewares_1 = require("../middlewares/auth-middlewares");
exports.commentsRouter = (0, express_1.Router)();
//GET COMMENT BY ID
exports.commentsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comments_service_1.commentsService.getCommentById(req.params.id);
    if (!comment) {
        res.sendStatus(404);
    }
    else {
        res.send(comment).status(200);
    }
}));
//DELETE COMMENT BY ID
exports.commentsRouter.delete('/:id', auth_middlewares_1.authMiddlewares, auth_middlewares_1.checkForUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield comments_service_1.commentsService.deleteCommentById(req.params.id);
    if (status) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
//UPDATE COMMENT BY ID
exports.commentsRouter.put('/:id', auth_middlewares_1.authMiddlewares, auth_middlewares_1.checkForUser, input_valudation_middleware_1.commentContentCheck, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield comments_service_1.commentsService.updateCommentById(req.body.content, req.params.id);
    if (status) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));

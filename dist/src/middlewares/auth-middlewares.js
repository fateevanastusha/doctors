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
exports.checkForUser = exports.authMiddlewares = void 0;
const jwt_service_1 = require("../application/jwt-service");
const comments_service_1 = require("../domain/comments-service");
const authMiddlewares = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.sendStatus(401);
    }
    else {
        //req.headers.authorization - "bearer fsfsdrgrgwerwgwg"
        const token = req.headers.authorization.split(" ")[1];
        const user = yield jwt_service_1.jwtService.getUserByIdToken(token);
        if (user) {
            next();
        }
        else {
            res.sendStatus(401);
        }
    }
});
exports.authMiddlewares = authMiddlewares;
const checkForUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(" ")[1];
    const userId = yield jwt_service_1.jwtService.getUserByIdToken(token);
    const comment = yield comments_service_1.commentsService.getCommentById(req.params.id);
    if (!comment) {
        res.sendStatus(404);
    }
    else if (comment.commentatorInfo.userId === userId) {
        next();
    }
    else {
        res.sendStatus(403);
    }
});
exports.checkForUser = checkForUser;

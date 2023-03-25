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
exports.checkForRefreshToken = exports.checkForUser = exports.authMiddlewares = void 0;
const jwt_service_1 = require("../application/jwt-service");
const comments_service_1 = require("../domain/comments-service");
const auth_db_repository_1 = require("../repositories/auth-db-repository");
const security_db_repository_1 = require("../repositories/security-db-repository");
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
const checkForRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //CHECK FOR EXISTING REFRESH TOKEN
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    //CHECK FOR NOT BLOCKED REFRESH TOKEN
    const isTokenBlocked = yield auth_db_repository_1.authRepository.checkRefreshToken(refreshToken);
    if (isTokenBlocked)
        return res.sendStatus(401);
    //CHECK FOR EXISTING SESSION WITH THIS REFRESH TOKEN
    const tokenList = yield jwt_service_1.jwtService.getIdByRefreshToken(refreshToken);
    if (!tokenList)
        return res.sendStatus(401);
    const session = yield security_db_repository_1.securityRepository.findSessionByDeviceId(tokenList.deviceId);
    if (!session)
        return res.sendStatus(401);
    const userId = yield jwt_service_1.jwtService.getIdByRefreshToken(refreshToken);
    if (userId) {
        next();
    }
    else {
        res.sendStatus(401);
    }
});
exports.checkForRefreshToken = checkForRefreshToken;

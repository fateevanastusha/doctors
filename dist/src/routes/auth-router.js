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
exports.authRouter = void 0;
const express_1 = require("express");
const auth_service_1 = require("../domain/auth-service");
const jwt_service_1 = require("../application/jwt-service");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield auth_service_1.authService.authRequest(req.body);
    if (status) {
        const user = yield auth_service_1.authService.authFindUser(req.body.loginOrEmail);
        if (user) {
            const token = yield jwt_service_1.jwtService.createJWT(user);
            res.status(200).send(token);
        }
    }
    else {
        res.sendStatus(401);
    }
}));
//GET INFORMATION ABOUT CURRENT AUTH
exports.authRouter.get('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body;
    const user = yield auth_service_1.authService.getUserByToken(token);
    if (user) {
        res.status(200).send(user);
    }
    else {
        res.status(401);
    }
}));

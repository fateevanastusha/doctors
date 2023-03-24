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
const input_valudation_middleware_1 = require("../middlewares/input-valudation-middleware");
const auth_middlewares_1 = require("../middlewares/auth-middlewares");
exports.authRouter = (0, express_1.Router)();
//LOGIN REQUEST
exports.authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.headers["user-agent"] || "unknown";
    const tokenList = yield auth_service_1.authService.authRequest(req.body.password, req.ip, req.body.loginOrEmail, title);
    if (tokenList) {
        let token = {
            accessToken: tokenList.accessToken
        };
        res.cookie('refreshToken', tokenList.refreshToken, { httpOnly: true, secure: true });
        res.status(200).send(token);
    }
    else {
        res.sendStatus(401);
    }
}));
//GET INFORMATION ABOUT CURRENT AUTH
exports.authRouter.get('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.headers.authorization;
    if (!auth)
        return res.sendStatus(401);
    const [authType, token] = auth.split(' ');
    if (authType !== 'Bearer')
        return res.sendStatus(401);
    const user = yield auth_service_1.authService.getInformationAboutCurrentUser(token);
    if (user) {
        const currentUser = {
            email: user.email,
            login: user.login,
            userId: user.id
        };
        res.status(200).send(currentUser);
    }
    else {
        res.sendStatus(401);
    }
}));
//REGISTRATION IN THE SYSTEM
exports.authRouter.post('/registration', input_valudation_middleware_1.loginCheck, input_valudation_middleware_1.passwordCheck, input_valudation_middleware_1.emailCheck, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield auth_service_1.authService.registrationUser(req.body);
    if (status) {
        res.send(204);
    }
    else {
        res.send(404);
    }
    ;
}));
//CODE CONFIRMATION
exports.authRouter.post('/registration-confirmation', input_valudation_middleware_1.codeConfirmationCheck, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield auth_service_1.authService.checkForConfirmationCode(req.body.code);
    if (!status) {
        res.sendStatus(400);
    }
    else {
        res.sendStatus(204);
    }
}));
//RESEND CODE CONFIRMATION
exports.authRouter.post('/registration-email-resending', input_valudation_middleware_1.emailConfirmationCheck, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield auth_service_1.authService.emailResending(req.body);
    if (status) {
        res.send(204);
    }
    else {
        res.send(400);
    }
}));
//LOGOUT. KILL REFRESH TOKEN + KILL SESSION
exports.authRouter.post('/logout', auth_middlewares_1.checkForRefreshToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield auth_service_1.authService.logoutRequest(req.cookies.refreshToken);
    if (status) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(401);
    }
}));
//REFRESH TOKEN
exports.authRouter.post('/refresh-token', auth_middlewares_1.checkForRefreshToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenList = yield auth_service_1.authService.createNewToken(req.cookies.refreshToken, req.ip);
    if (tokenList) {
        let token = {
            accessToken: tokenList.accessToken
        };
        res.cookie('refreshToken', tokenList.refreshToken, { httpOnly: true, secure: true });
        res.status(200).send(token);
    }
    else {
        res.sendStatus(401);
    }
}));

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_service_1 = require("../domain/auth-service");
const input_valudation_middleware_1 = require("../middlewares/input-valudation-middleware");
const auth_middlewares_1 = require("../middlewares/auth-middlewares");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.authRouter = (0, express_1.Router)();
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 429
});
//LOGIN REQUEST
exports.authRouter.post('/login', authLimiter, auth_middlewares_1.checkForSameDevice, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.authRouter.post('/registration', authLimiter, input_valudation_middleware_1.loginCheck, input_valudation_middleware_1.passwordCheck, input_valudation_middleware_1.emailCheck, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.authRouter.post('/registration-confirmation', authLimiter, input_valudation_middleware_1.codeConfirmationCheck, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield auth_service_1.authService.checkForConfirmationCode(req.body.code);
    if (!status) {
        res.sendStatus(400);
    }
    else {
        res.sendStatus(204);
    }
}));
//RESEND CODE CONFIRMATION
exports.authRouter.post('/registration-email-resending', authLimiter, input_valudation_middleware_1.emailConfirmationCheck, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.authRouter.post('/refresh-token', authLimiter, auth_middlewares_1.checkForRefreshToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.headers["user-agent"] || "unknown";
    const tokenList = yield auth_service_1.authService.createNewToken(req.cookies.refreshToken, req.ip, title);
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

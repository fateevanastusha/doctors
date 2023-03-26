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
exports.securityRouter = void 0;
const express_1 = require("express");
const security_service_1 = require("../domain/security-service");
const auth_middlewares_1 = require("../middlewares/auth-middlewares");
exports.securityRouter = (0, express_1.Router)();
//GET ALL SESSIONS
exports.securityRouter.get('/devices', auth_middlewares_1.checkForRefreshToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessions = yield security_service_1.securityService.getAllSessions(req.cookies.refreshToken);
    if (sessions) {
        res.status(200).send(sessions);
    }
    else {
        res.sendStatus(401);
    }
}));
//DELETE ALL SESSIONS
exports.securityRouter.delete('/devices', auth_middlewares_1.checkForRefreshToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield security_service_1.securityService.deleteAllSessions(req.cookies.refreshToken);
    if (status) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(401);
    }
}));
//DELETE SESSION
exports.securityRouter.delete('/devices/:id', auth_middlewares_1.checkForRefreshToken, auth_middlewares_1.checkForDeviceId, auth_middlewares_1.checkForSameUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    const status = yield security_service_1.securityService.deleteOneSession(req.params.id);
    if (!status)
        return res.sendStatus(403);
    res.sendStatus(204);
}));

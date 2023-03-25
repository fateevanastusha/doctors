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
exports.securityService = void 0;
const security_db_repository_1 = require("../repositories/security-db-repository");
const jwt_service_1 = require("../application/jwt-service");
//const createError = require('http-errors');
exports.securityService = {
    getAllSessions(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const idList = yield jwt_service_1.jwtService.getIdByRefreshToken(refreshToken);
            if (!idList)
                return null;
            const userId = idList.userId;
            return yield security_db_repository_1.securityRepository.getAllSessions(userId);
        });
    },
    deleteAllSessions(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const idList = yield jwt_service_1.jwtService.getIdByRefreshToken(refreshToken);
            if (!idList)
                return false;
            return yield security_db_repository_1.securityRepository.deleteAllSessions(idList.deviceId, idList.userId);
        });
    },
    deleteOneSession(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield security_db_repository_1.securityRepository.deleteOneSessions(deviceId);
        });
    },
    deleteOneSession1(deviceId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken)
                return false;
            const user = yield jwt_service_1.jwtService.getIdByRefreshToken(refreshToken);
            if (!user)
                return false;
            const device = yield security_db_repository_1.securityRepository.findSessionByDeviceId(deviceId);
            if (!device)
                return false;
            //if (user.userId !== device.deviceId) throw new createError(401);
            return security_db_repository_1.securityRepository.deleteAllSessions(deviceId, user.userId);
        });
    }
};

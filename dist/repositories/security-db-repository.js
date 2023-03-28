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
exports.securityRepository = void 0;
const models_1 = require("../types/models");
exports.securityRepository = {
    getAllSessions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.RefreshTokensMetaModel
                .find({ userId }, { projection: { _id: 0, userId: 0 } })
                .lean();
        });
    },
    deleteAllSessions(deviceId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.RefreshTokensMetaModel
                .deleteMany({
                userId,
                deviceId: { $ne: deviceId }
            });
            return result.deletedCount > 0;
        });
    },
    deleteOneSessions(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.RefreshTokensMetaModel
                .deleteOne({ deviceId });
            return result.deletedCount === 1;
        });
    },
    createNewSession(refreshTokensMeta) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.RefreshTokensMetaModel
                .insertMany({
                userId: refreshTokensMeta.userId,
                ip: refreshTokensMeta.ip,
                title: refreshTokensMeta.title,
                lastActiveDate: refreshTokensMeta.lastActiveDate,
                deviceId: refreshTokensMeta.deviceId
            });
            const createdSession = yield this.findSessionByIp(refreshTokensMeta.ip);
            if (createdSession)
                return true;
            return false;
        });
    },
    findSessionByIp(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.RefreshTokensMetaModel
                .findOne({ ip: ip });
        });
    },
    findSessionByDeviceId(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.RefreshTokensMetaModel
                .findOne({ deviceId: deviceId });
        });
    },
    findSessionByDeviceIdAndUserId(userId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.RefreshTokensMetaModel
                .findOne({ userId: userId, deviceId: deviceId });
        });
    },
    updateSession(ip, title, lastActiveDate, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.RefreshTokensMetaModel
                .updateOne({ deviceId: deviceId }, { $set: {
                    ip: ip,
                    title: title,
                    lastActiveDate: lastActiveDate,
                    deviceId: deviceId
                }
            });
            return result.matchedCount === 1;
        });
    },
    //DELETE ALL DATA
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.RefreshTokensMetaModel.deleteMany({});
            return [];
        });
    },
    //CHECK FOR THE SAME SESSION
    checkSameDevice(title, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.RefreshTokensMetaModel.find({ title: title, userId: userId });
            if (result)
                return true;
            return false;
        });
    }
};

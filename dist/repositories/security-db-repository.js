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
const db_1 = require("../db/db");
exports.securityRepository = {
    getAllSessions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.refreshTokensCollection
                .find({ userId }, { projection: { _id: 0, userId: 0 } })
                .toArray();
        });
    },
    deleteAllSessions(deviceId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.refreshTokensCollection
                .deleteMany({
                userId,
                deviceId: { $ne: deviceId }
            });
            return result.deletedCount > 0;
        });
    },
    deleteOneSessions(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.refreshTokensCollection
                .deleteOne({ deviceId });
            return result.deletedCount === 1;
        });
    },
    createNewSession(refreshTokensMeta) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.refreshTokensCollection
                .insertOne({
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
            return db_1.refreshTokensCollection
                .findOne({ ip: ip });
        });
    },
    findSessionByDeviceId(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.refreshTokensCollection
                .findOne({ deviceId: deviceId });
        });
    },
    updateSession(ip, title, lastActiveDate, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.refreshTokensCollection
                .updateOne({ deviceId: deviceId }, {
                ip: ip,
                title: title,
                lastActiveDate: lastActiveDate,
                deviceId: deviceId
            });
            return result.matchedCount === 1;
        });
    }
};

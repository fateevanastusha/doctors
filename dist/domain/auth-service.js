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
exports.authService = void 0;
const auth_db_repository_1 = require("../repositories/auth-db-repository");
const jwt_service_1 = require("../application/jwt-service");
const users_service_1 = require("./users-service");
const users_db_repository_1 = require("../repositories/users-db-repository");
const business_service_1 = require("./business-service");
const security_db_repository_1 = require("../repositories/security-db-repository");
exports.authService = {
    authRequest(password, ip, loginOrEmail, title) {
        return __awaiter(this, void 0, void 0, function* () {
            //CHECK FOR CORRECT PASSWORD
            const status = yield auth_db_repository_1.authRepository.authRequest(loginOrEmail, password);
            if (!status)
                return null;
            //CHECK FOR USER
            const user = yield exports.authService.authFindUser(loginOrEmail);
            if (!user)
                return null;
            //CREATE DEVICE ID
            const deviceId = (+new Date()).toString();
            //GET USER ID
            const userId = user.id;
            //GET TOKENS
            const refreshToken = yield jwt_service_1.jwtService.createJWTRefresh(userId, deviceId);
            const accessToken = yield jwt_service_1.jwtService.createJWTAccess(userId);
            //GET DATE
            const date = yield jwt_service_1.jwtService.getRefreshTokenDate(refreshToken.refreshToken);
            if (!date)
                return null;
            //CREATE REFRESH TOKENS META
            const refreshTokenMeta = {
                userId: userId,
                ip: ip,
                title: title,
                lastActiveDate: date,
                deviceId: deviceId
            };
            //CREATE NEW SESSION
            yield security_db_repository_1.securityRepository.createNewSession(refreshTokenMeta);
            //RETURN TOKENS
            return {
                accessToken: accessToken.accessToken,
                refreshToken: refreshToken.refreshToken
            };
        });
    },
    logoutRequest(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            //ADD REFRESH TO BLACK LIST
            const statusBlackList = yield exports.authService.addRefreshTokenToBlackList(refreshToken);
            if (!statusBlackList)
                return false;
            //GET USER ID AND DEVICE ID BY REFRESH TOKEN
            const idList = yield jwt_service_1.jwtService.getIdByRefreshToken(refreshToken);
            if (!idList)
                return false;
            return yield security_db_repository_1.securityRepository.deleteOneSessions(idList.deviceId);
        });
    },
    //CREATE NEW TOKENS
    createNewToken(refreshToken, ip, title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield auth_db_repository_1.authRepository.addRefreshTokenToBlackList(refreshToken);
            const session = yield security_db_repository_1.securityRepository.findSessionByIp(ip);
            if (!session)
                return null;
            const deviceId = session.deviceId;
            const userId = yield jwt_service_1.jwtService.getUserByIdToken(refreshToken);
            const user = yield users_service_1.usersService.getUserById(userId);
            if (user === null)
                return null;
            const accessToken = yield jwt_service_1.jwtService.createJWTAccess(userId);
            const newRefreshToken = yield jwt_service_1.jwtService.createJWTRefresh(userId, deviceId);
            const date = yield jwt_service_1.jwtService.getRefreshTokenDate(newRefreshToken.refreshToken);
            if (!date)
                return null;
            //UPDATE SESSION
            yield security_db_repository_1.securityRepository.updateSession(ip, title, date, deviceId);
            return {
                accessToken: accessToken.accessToken,
                refreshToken: newRefreshToken.refreshToken
            };
        });
    },
    addRefreshTokenToBlackList(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_db_repository_1.authRepository.addRefreshTokenToBlackList(refreshToken);
        });
    },
    //GET USER BY TOKEN
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield jwt_service_1.jwtService.getUserByIdToken(token);
            const user = yield users_service_1.usersService.getUserById(userId);
            return user;
        });
    },
    //FIND USER BY LOGIN OR EMAIL
    authFindUser(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_db_repository_1.usersRepository.returnUserByField(loginOrEmail);
        });
    },
    //
    checkForConfirmationCode(confirmationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_db_repository_1.usersRepository.changeConfirmedStatus(confirmationCode);
        });
    },
    //UPDATE CONFIRMATION CODE
    updateConfirmationCode(confirmationCode, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_db_repository_1.usersRepository.changeConfirmationCode(confirmationCode, email);
        });
    },
    //REGISTRATION USER
    registrationUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let confirmationCode = (+new Date()).toString();
            //CREATE NEW USER
            const newUser = yield users_service_1.usersService.createNewUser(user, false, confirmationCode);
            if (!newUser) {
                return false;
            }
            //SEND EMAIL
            yield business_service_1.businessService.sendConfirmationCode(user.email, confirmationCode);
            return true;
        });
    },
    //EMAIL RESENDING
    emailResending(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let confirmationCode = (+new Date()).toString();
            let email = user.email;
            //UPDATE CONFIRMATION CODE
            const status = yield exports.authService.updateConfirmationCode(confirmationCode, email);
            if (!status) {
                return false;
            }
            //SEND EMAIL
            yield business_service_1.businessService.sendConfirmationCode(user.email, confirmationCode);
            return true;
        });
    },
    //GET INFORMATION ABOUT CURRENT USER
    getInformationAboutCurrentUser(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = accessToken;
            const getUser = yield exports.authService.getUserByToken(token);
            if (getUser) {
                return getUser;
            }
            else {
                return null;
            }
        });
    }
};

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
exports.authService = {
    authRequest(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginOrEmail = auth.loginOrEmail;
            const password = auth.password;
            const status = yield auth_db_repository_1.authRepository.authRequest(loginOrEmail, password);
            if (status) {
                const user = yield exports.authService.authFindUser(auth.loginOrEmail);
                if (user) {
                    const accessToken = yield jwt_service_1.jwtService.createJWTAccess(user);
                    const refreshToken = yield jwt_service_1.jwtService.createJWTRefresh(user);
                    return {
                        accessToken: accessToken.accessToken,
                        refreshToken: refreshToken.refreshToken
                    };
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        });
    },
    //CREATE NEW TOKENS
    createNewToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            //ADD OLD REFRESH TOKEN IN BLACK LIST
            yield auth_db_repository_1.authRepository.addRefreshTokenToBlackList(refreshToken);
            const userId = yield jwt_service_1.jwtService.getUserByIdToken(refreshToken);
            const user = yield users_service_1.usersService.getUserById(userId);
            if (user === null) {
                return null;
            }
            const accessToken = yield jwt_service_1.jwtService.createJWTAccess(user);
            const newRefreshToken = yield jwt_service_1.jwtService.createJWTRefresh(user);
            return {
                accessToken: accessToken.accessToken,
                refreshToken: newRefreshToken.refreshToken
            };
        });
    },
    addRefreshTokenToBlackList(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            //ADD OLD REFRESH TOKEN IN BLACK LIST
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

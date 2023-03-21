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
exports.authService = {
    authRequest(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginOrEmail = auth.loginOrEmail;
            const password = auth.password;
            return yield auth_db_repository_1.authRepository.authRequest(loginOrEmail, password);
        });
    },
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield jwt_service_1.jwtService.getUserByIdToken(token);
            const user = yield users_service_1.usersService.getUserById(userId);
            return user;
        });
    },
    authFindUser(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_db_repository_1.authRepository.authFindUser(loginOrEmail);
        });
    },
};

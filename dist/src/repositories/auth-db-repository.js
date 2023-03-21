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
exports.authRepository = void 0;
const users_db_repository_1 = require("./users-db-repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.authRepository = {
    authRequest(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //find by loginOrEmail
            const user = yield users_db_repository_1.usersRepository.returnUserByField(loginOrEmail);
            if (user) {
                return bcrypt_1.default.compareSync(password, user.password);
            }
            else {
                return false;
            }
        });
    },
    authFindUser(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            //find by loginOrEmail
            const user = yield users_db_repository_1.usersRepository.returnUserByField(loginOrEmail);
            return user;
        });
    },
};

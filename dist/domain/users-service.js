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
exports.usersService = void 0;
const users_db_repository_1 = require("../repositories/users-db-repository");
const posts_db_repositiory_1 = require("../repositories/posts-db-repositiory");
const queryRepo_1 = require("../queryRepo");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.usersService = {
    //GET ALL USERS
    getAllUsers(PageSize, Page, sortBy, sortDirection, searchLoginTerm, searchEmailTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            //add pagination
            const total = yield users_db_repository_1.usersRepository.returnUsersCount(searchLoginTerm, searchEmailTerm);
            const PageCount = Math.ceil(total / PageSize);
            const Items = yield queryRepo_1.QueryRepository.PaginatorForUsers(PageCount, PageSize, Page, sortBy, sortDirection, searchLoginTerm, searchEmailTerm);
            return queryRepo_1.QueryRepository.PaginationForm(PageCount, PageSize, Page, total, Items);
        });
    },
    //GET USER BY ID
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_db_repository_1.usersRepository.returnUserById(id);
        });
    },
    //CREATE NEW USER
    createNewUser(user, isConfirmed = true, confirmationCode = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = bcrypt_1.default.hashSync(user.password, 10);
            const newUser = {
                id: (+new Date()).toString(),
                login: user.login,
                email: user.email,
                password: hash,
                createdAt: new Date().toISOString(),
                isConfirmed: isConfirmed,
                confirmedCode: confirmationCode
            };
            const createdUser = yield users_db_repository_1.usersRepository.createNewUser(newUser);
            return createdUser;
        });
    },
    //CHANGE PASSWORD
    changeUserPassword(code, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = bcrypt_1.default.hashSync(password, 10);
            return yield users_db_repository_1.usersRepository.changeUserPassword(code, hash);
        });
    },
    //DELETE BY ID
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_db_repository_1.usersRepository.deleteUserById(id);
        });
    },
    //DELETE ALL DATA
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield posts_db_repositiory_1.postsRepository.deleteAllData();
        });
    }
};

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
exports.commentsService = void 0;
const comments_db_repository_1 = require("../repositories/comments-db-repository");
const users_service_1 = require("./users-service");
const queryRepo_1 = require("../queryRepo");
exports.commentsService = {
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return comments_db_repository_1.commentsRepository.getCommentById(id);
        });
    },
    deleteCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return comments_db_repository_1.commentsRepository.deleteCommentById(id);
        });
    },
    updateCommentById(content, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield comments_db_repository_1.commentsRepository.updateCommentById(content, id);
        });
    },
    createComment(postId, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.usersService.getUserById(userId);
            const comment = {
                id: (+new Date()).toString(),
                content: content,
                commentatorInfo: {
                    userId: userId,
                    userLogin: user.login
                },
                createdAt: new Date().toISOString(),
                postId: postId
            };
            return comments_db_repository_1.commentsRepository.createNewComment(comment);
        });
    },
    getAllCommentsByPostId(PageSize, Page, sortBy, sortDirection, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            let total = yield comments_db_repository_1.commentsRepository.getAllCommentsByPostId(postId);
            if (total === null) {
                total = 0;
            }
            else {
                total = total.length;
            }
            const PageCount = Math.ceil(total / PageSize);
            const Items = yield queryRepo_1.QueryRepository.PaginatorForCommentsByBlogId(PageCount, PageSize, Page, sortBy, sortDirection, postId);
            return queryRepo_1.QueryRepository.PaginationForm(PageCount, PageSize, Page, total, Items);
        });
    }
};

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
exports.commentsRepository = void 0;
const models_1 = require("../types/models");
exports.commentsRepository = {
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.CommentModel.findOne({ id: id }, { _id: 0, __v: 0, postId: 0 });
        });
    },
    deleteCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.CommentModel.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    updateCommentById(content, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.CommentModel.updateOne({ id: id }, { $set: {
                    content: content
                }
            });
            return result.matchedCount === 1;
        });
    },
    createNewComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.CommentModel.insertMany(comment);
            const createdComment = yield this.getCommentById(comment.id);
            if (createdComment) {
                return createdComment;
            }
            else {
                return null;
            }
        });
    },
    getAllCommentsByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.CommentModel
                .find({ postId: postId }, { _id: 0, __v: 0, postId: 0 })
                .lean();
        });
    },
    commentsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.CommentModel
                .find()
                .count();
        });
    }
};

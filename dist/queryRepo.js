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
exports.QueryRepository = void 0;
const models_1 = require("./types/models");
exports.QueryRepository = {
    PaginatorForBlogs(PageCount, PageSize, Page, sortBy, sortDirection, searchNameTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = PageSize * (Page - 1);
            return models_1.BlogModel
                .find({ name: { $regex: searchNameTerm, $options: 'i' } }, { _id: 0, __v: 0 })
                .sort({ [sortBy]: sortDirection })
                .skip(skipSize)
                .limit(PageSize)
                .lean();
        });
    },
    PaginatorForPosts(PageCount, PageSize, Page, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = PageSize * (Page - 1);
            return models_1.PostModel
                .find({}, { projection: { _id: 0 } })
                .sort({ [sortBy]: sortDirection })
                .skip(skipSize)
                .limit(PageSize)
                .lean();
        });
    },
    PaginatorForCommentsByBlogId(PageCount, PageSize, Page, sortBy, sortDirection, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = PageSize * (Page - 1);
            return models_1.CommentModel
                .find({ postId: postId }, { _id: 0, __v: 0 })
                .sort({ [sortBy]: sortDirection })
                .skip(skipSize)
                .limit(PageSize)
                .lean();
        });
    },
    PaginatorForPostsByBlogId(PageCount, PageSize, Page, sortBy, sortDirection, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = PageSize * (Page - 1);
            return models_1.PostModel
                .find({ blogId: blogId }, { _id: 0, __v: 0 })
                .sort({ [sortBy]: sortDirection })
                .skip(skipSize)
                .limit(PageSize)
                .lean();
        });
    },
    PaginatorForUsers(PageCount, PageSize, Page, sortBy, sortDirection, searchLoginTerm, searchEmailTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = PageSize * (Page - 1);
            return models_1.UserModel
                .find({
                $or: [
                    { login: { $regex: searchLoginTerm, $options: 'i' } },
                    { email: { $regex: searchEmailTerm, $options: 'i' } }
                ]
            }, { _id: 0, __v: 0, password: 0 })
                .sort({ [sortBy]: sortDirection })
                .skip(skipSize)
                .limit(PageSize)
                .lean();
        });
    },
    PaginationForm(PageCount, PageSize, Page, total, Items) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                pagesCount: PageCount,
                page: Page,
                pageSize: PageSize,
                totalCount: total,
                items: Items
            };
        });
    },
};

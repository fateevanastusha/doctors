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
const db_1 = require("./db/db");
exports.QueryRepository = {
    PaginatorForBlogs(PageCount, PageSize, Page, sortBy, sortDirection, searchNameTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = PageSize * (Page - 1);
            return db_1.blogsCollection
                .find({ name: { $regex: searchNameTerm, $options: 'i' } }, { projection: { _id: 0 } })
                .sort({ [sortBy]: sortDirection })
                .skip(skipSize)
                .limit(PageSize)
                .toArray();
        });
    },
    PaginatorForPosts(PageCount, PageSize, Page, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = PageSize * (Page - 1);
            return db_1.postsCollection
                .find({}, { projection: { _id: 0 } })
                .sort({ [sortBy]: sortDirection })
                .skip(skipSize)
                .limit(PageSize)
                .toArray();
        });
    },
    PaginatorForPostsByBlogId(PageCount, PageSize, Page, sortBy, sortDirection, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = PageSize * (Page - 1);
            return db_1.postsCollection
                .find({ blogId: blogId }, { projection: { _id: 0 } })
                .sort({ [sortBy]: sortDirection })
                .skip(skipSize)
                .limit(PageSize)
                .toArray();
        });
    },
    PaginatorForUsers(PageCount, PageSize, Page, sortBy, sortDirection, searchLoginTerm, searchEmailTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = PageSize * (Page - 1);
            return db_1.usersCollection
                .find({
                $or: [{
                        login: { $regex: searchLoginTerm, $options: 'i' },
                        email: { $regex: searchEmailTerm, $options: 'i' }
                    }]
            }, { projection: { _id: 0, password: 0 } })
                .sort({ [sortBy]: sortDirection })
                .skip(skipSize)
                .limit(PageSize)
                .toArray();
        });
    },
    PaginationForm(PageCount, PageSize, Page, total, Items) {
        return __awaiter(this, void 0, void 0, function* () {
            const paginator = {
                pagesCount: PageCount,
                page: Page,
                pageSize: PageSize,
                totalCount: total,
                items: Items
            };
            return paginator;
        });
    },
};

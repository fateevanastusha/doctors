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
    PaginatorForBlogs(PageCount, PageSize, Page, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = PageSize * (Page - 1);
            return db_1.blogsCollection
                .find()
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
                .find()
                .sort({ [sortBy]: sortDirection })
                .skip(skipSize)
                .limit(PageSize)
                .toArray();
        });
    },
    PaginationForm(PageCount, PageSize, Page, Items) {
        return __awaiter(this, void 0, void 0, function* () {
            const paginator = {
                pagesCount: PageCount,
                page: Page,
                pageSize: PageSize,
                totalCount: Items.length,
                items: Items
            };
            return paginator;
        });
    },
};

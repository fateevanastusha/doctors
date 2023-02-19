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
exports.blogsService = void 0;
const blogs_db_repositiory_1 = require("../repositories/blogs-db-repositiory");
exports.blogsService = {
    //GET - return all
    returnAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return blogs_db_repositiory_1.blogsRepository.returnAllBlogs();
        });
    },
    //GET - return by ID
    returnBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return blogs_db_repositiory_1.blogsRepository.returnBlogById(id);
        });
    },
    //DELETE - delete by ID
    deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_db_repositiory_1.blogsRepository.deleteBlogById(id);
        });
    },
    //delete all data
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield blogs_db_repositiory_1.blogsRepository.deleteAllData();
        });
    },
    //POST - create new
    createNewBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: '' + (+(new Date())),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            const createdBlog = yield blogs_db_repositiory_1.blogsRepository.createNewBlog(newBlog);
            return createdBlog;
        });
    },
    //PUT - update
    updateBlogById(blog, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_db_repositiory_1.blogsRepository.updateBlogById(blog, id);
        });
    }
};

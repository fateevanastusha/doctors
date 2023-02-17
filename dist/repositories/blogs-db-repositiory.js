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
exports.blogsRepository = void 0;
const db_1 = require("../db/db");
exports.blogsRepository = {
    //GET - return all
    returnAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.blogsCollection.find({}, { projection: { _id: 0 } }).toArray();
        });
    },
    //GET - return by ID
    returnBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogsCollection.findOne({ id: id }, { projection: { _id: 0 } });
            return blog;
        });
    },
    //DELETE - delete by ID
    deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    //delete all data
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.deleteMany({});
            return [];
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
            yield db_1.blogsCollection.insertOne(newBlog);
            const updatedBlog = this.returnBlogById(newBlog.id);
            if (updatedBlog) {
                return updatedBlog;
            }
            return null;
        });
    },
    //PUT - update
    updateBlogById(blog, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.updateOne({ id: id }, { $set: {
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                }
            });
            return result.matchedCount === 1;
        });
    },
};

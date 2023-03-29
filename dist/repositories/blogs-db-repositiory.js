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
const models_1 = require("../types/models");
exports.blogsRepository = {
    returnBlogsCount(searchNameTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.BlogModel
                .countDocuments({ name: { $regex: searchNameTerm, $options: 'i' } });
        });
    },
    //GET - return by ID
    returnBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield models_1.BlogModel.findOne({ id: id }, { _id: 0, __v: 0 });
            return blog;
        });
    },
    //DELETE - delete by ID
    deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.BlogModel.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    //delete all data
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.BlogModel.deleteMany({});
            return [];
        });
    },
    //POST - create new 
    createNewBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(newBlog);
            yield models_1.BlogModel.insertMany(newBlog);
            const createdBlog = yield this.returnBlogById(newBlog.id);
            if (createdBlog) {
                return createdBlog;
            }
            return null;
        });
    },
    //PUT - update
    updateBlogById(blog, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield models_1.BlogModel.updateOne({ id: id }, { $set: blog });
            return result.matchedCount === 1;
        });
    },
};

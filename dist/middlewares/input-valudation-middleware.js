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
exports.emailCheck = exports.passwordCheck = exports.loginCheck = exports.blogIdCheck = exports.contentCheck = exports.shortDescriptionCheck = exports.titleCheck = exports.findByIdBlogs = exports.websiteUrlCheck = exports.descriptionCheck = exports.nameCheck = exports.inputValidationMiddleware = void 0;
const blogs_db_repositiory_1 = require("../repositories/blogs-db-repositiory");
const express_validator_1 = require("express-validator");
//errors storage
const inputValidationMiddleware = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).send({
            errorsMessages: error.array({ onlyFirstError: true }).map(e => {
                return {
                    message: e.msg,
                    field: e.param
                };
            })
        });
    }
    next();
};
exports.inputValidationMiddleware = inputValidationMiddleware;
//check for blog
exports.nameCheck = (0, express_validator_1.body)('name').trim().isLength({ min: 1, max: 15 }).isString();
exports.descriptionCheck = (0, express_validator_1.body)('description').trim().isLength({ min: 1, max: 500 }).isString();
exports.websiteUrlCheck = (0, express_validator_1.body)('websiteUrl').trim().isLength({ min: 1, max: 100 }).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).isString();
//check for blogId
const findByIdBlogs = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = yield blogs_db_repositiory_1.blogsRepository.returnBlogById(value);
    if (foundBlog === null) {
        throw new Error('not blogId');
    }
});
exports.findByIdBlogs = findByIdBlogs;
//check for post
exports.titleCheck = (0, express_validator_1.body)('title').trim().isLength({ min: 1, max: 30 }).isString();
exports.shortDescriptionCheck = (0, express_validator_1.body)('shortDescription').trim().isLength({ min: 1, max: 100 }).isString();
exports.contentCheck = (0, express_validator_1.body)('content').trim().isLength({ min: 1, max: 1000 }).isString();
exports.blogIdCheck = (0, express_validator_1.body)('blogId').trim().custom(exports.findByIdBlogs).isString();
//check for user
exports.loginCheck = (0, express_validator_1.body)('login').trim().isLength({ min: 3, max: 10 }).isString();
exports.passwordCheck = (0, express_validator_1.body)('password').trim().isLength({ min: 6, max: 20 }).isString();
exports.emailCheck = (0, express_validator_1.body)('email').trim().isEmail().isString();

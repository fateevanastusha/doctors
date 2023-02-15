"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidationMiddleware = exports.blogIdCheck = exports.contentCheck = exports.shortDescriptionCheck = exports.titleCheck = exports.websiteUrlCheck = exports.descriptionCheck = exports.nameCheck = exports.blogValidationMiddleware = exports.inputValidationMiddleware = exports.findByIdBlogs = void 0;
const blogs_db_repositiory_1 = require("../repositories/blogs-db-repositiory");
const express_validator_1 = require("express-validator");
const findByIdBlogs = value => {
    let blog = blogs_db_repositiory_1.blogsRepository.returnBlogById(value);
    if (!blog) {
        throw new Error('Invalid blogId');
    }
    return true;
};
exports.findByIdBlogs = findByIdBlogs;
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
exports.blogValidationMiddleware = [
    (0, express_validator_1.body)('name').trim().isLength({ min: 1, max: 15 }).isString(),
    (0, express_validator_1.body)('description').trim().isLength({ min: 1, max: 500 }).isString(),
    (0, express_validator_1.body)('websiteUrl').trim().isLength({ min: 1, max: 100 }).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).isString(),
];
exports.nameCheck = (0, express_validator_1.body)('name').trim().isLength({ min: 1, max: 15 }).isString();
exports.descriptionCheck = (0, express_validator_1.body)('description').trim().isLength({ min: 1, max: 500 }).isString();
exports.websiteUrlCheck = (0, express_validator_1.body)('websiteUrl').trim().isLength({ min: 1, max: 100 }).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).isString();
exports.titleCheck = (0, express_validator_1.body)('title').trim().isLength({ min: 1, max: 30 }).isString();
exports.shortDescriptionCheck = (0, express_validator_1.body)('shortDescription').trim().isLength({ min: 1, max: 100 }).isString();
exports.contentCheck = (0, express_validator_1.body)('content').trim().isLength({ min: 1, max: 1000 }).isString();
exports.blogIdCheck = (0, express_validator_1.body)('blogId').trim().custom(exports.findByIdBlogs).isString();
exports.postValidationMiddleware = [
    (0, express_validator_1.body)('title').trim().isLength({ min: 1, max: 30 }).isString(),
    (0, express_validator_1.body)('shortDescription').trim().isLength({ min: 1, max: 100 }).isString(),
    (0, express_validator_1.body)('content').trim().isLength({ min: 1, max: 1000 }).isString(),
    (0, express_validator_1.body)('blogId').trim().custom(exports.findByIdBlogs).isString()
];

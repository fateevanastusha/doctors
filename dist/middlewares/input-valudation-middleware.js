"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidationMiddleware = exports.blogValidationMiddleware = exports.inputValidationMiddleware = exports.findByIdBlogs = void 0;
const blogs_repositiory_1 = require("../repositories/blogs-repositiory");
const express_validator_1 = require("express-validator");
const findByIdBlogs = value => {
    let blog = blogs_repositiory_1.blogsRepository.returnBlogById(value);
    if (!blog) {
        throw new Error('Invalid blogId');
    }
    return true;
};
exports.findByIdBlogs = findByIdBlogs;
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(404).json({ errors: errors.array() });
    }
    else {
        next();
    }
    ;
};
exports.inputValidationMiddleware = inputValidationMiddleware;
exports.blogValidationMiddleware = [
    (0, express_validator_1.body)('name').isLength({ min: 1, max: 15 }),
    (0, express_validator_1.body)('description').isLength({ min: 1, max: 500 }),
    (0, express_validator_1.body)('websiteUrl').isLength({ min: 1, max: 100 }).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/),
];
exports.postValidationMiddleware = [
    (0, express_validator_1.body)('title').isLength({ min: 1, max: 30 }),
    (0, express_validator_1.body)('shortDescription').isLength({ min: 1, max: 100 }),
    (0, express_validator_1.body)('content').isLength({ min: 1, max: 1000 }),
    (0, express_validator_1.body)('blogId').custom(exports.findByIdBlogs)
];

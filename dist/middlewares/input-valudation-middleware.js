"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidationMiddleware = exports.inputValidationMiddleware = void 0;
const blogs_repositiory_1 = require("../repositories/blogs-repositiory");
const { body, validationResult } = require('express-validator');
const inputValidationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
exports.blogValidationMiddleware = [
    body('id').isLength({ min: 1, max: 15 }).custom((value) => {
        return blogs_repositiory_1.blogsRepository === null || blogs_repositiory_1.blogsRepository === void 0 ? void 0 : blogs_repositiory_1.blogsRepository.returnBlogById(value).then(id => {
            if (id) {
                return Promise.reject;
            }
        });
    }),
    body('name').isLength({ min: 1, max: 15 }),
    body('description').isLength({ min: 1, max: 500 }),
    body('websiteUrl').isLength({ min: 1, max: 100 }).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
];
//check for ID

import exp from "constants";
import { NextFunction } from "express";
import { Response, Request } from "express";
import { CustomValidator } from "express-validator/src/base";
import { blogs, blogsRepository } from "../repositories/blogs-repositiory";
import { posts, postsRepository } from "../repositories/posts-repositiory";
import { body, validationResult } from 'express-validator';

export const findByIdBlogs : CustomValidator = value => {
    let blog = blogsRepository.returnBlogById(value)
    if (!blog){
        throw new Error('Invalid blogId')
    }
    return true
};

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(404).json({errors : errors.array()})
    } else {
        next();
    };
};

export const blogValidationMiddleware = [
body('name').isLength({min: 1, max: 15}), 
body('description').isLength({min: 1, max: 500}), 
body('websiteUrl').isLength({min: 1, max: 100}).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/),
];

export const postValidationMiddleware = [
body('title').isLength({min:1, max: 30}),
body('shortDescription').isLength({min:1,max:100}),
body('content').isLength({min:1, max: 1000}),
body('blogId').custom(findByIdBlogs)
];






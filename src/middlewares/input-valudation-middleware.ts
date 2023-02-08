import exp from "constants";
import { NextFunction } from "express";
import { Response, Request } from "express";
import { checkSchema } from "express-validator";
import { blogsRepository } from "../repositories/blogs-repositiory";
const { body, validationResult } = require('express-validator');

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({errors : errors.array()})
    } else {
        next()
    }
}
export const blogValidationMiddleware = [
body('id').isLength({min: 1, max: 15}).custom((value : any) => {
    return blogsRepository?.returnBlogById(value).then(id => {
        if (id) {
            return Promise.reject
        }
        });
    }),   
body('name').isLength({min: 1, max: 15}), 
body('description').isLength({min: 1, max: 500}), 
body('websiteUrl').isLength({min: 1, max: 100}).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
]


//check for ID



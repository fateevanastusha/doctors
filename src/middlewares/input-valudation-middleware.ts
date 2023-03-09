import { NextFunction } from "express";
import { Response, Request } from "express";
import { CustomValidator } from "express-validator/src/base";
import { blogsRepository } from "../repositories/blogs-db-repositiory";
import { body, validationResult } from 'express-validator';
import {usersRepository} from "../repositories/users-db-repository";

//errors storage
export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).send({
            errorsMessages: error.array({onlyFirstError: true}).map(e => {
                return {
                    message: e.msg,
                    field: e.param
                }
            })
        })
    }
    next()
}
//check for blog
export const nameCheck = body('name').trim().isLength({min: 1, max: 15}).isString();
export const descriptionCheck = body('description').trim().isLength({min: 1, max: 500}).isString();
export const websiteUrlCheck = body('websiteUrl').trim().isLength({min: 1, max: 100}).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).isString()

//check for blogId
export const findByIdBlogs : CustomValidator = async value => {
    const foundBlog = await blogsRepository.returnBlogById(value);
    if (foundBlog === null) {
        throw new Error('not blogId')
    }
};

//check for unique login
export const checkForExistingLogin : CustomValidator = async login => {
    const User = await usersRepository.returnUserByLogin(login)
    if (User !== null) {
        throw new Error('login is already exist')
    }
}
//check for unique email
export const checkForExistingEmail : CustomValidator = async email => {
    const User = await usersRepository.returnUserByEmail(email)
    if (User !== null) {
        throw new Error('email is already exist')
    }
}

export const checkForSameField : CustomValidator = async field => {
    const User = await usersRepository.returnUserByField(field)
    if (User !== null) {
        throw new Error('this is not exist')
    }
}


export const checkForPasswordAuth : CustomValidator = async (login, { req }) => {
    const User = await usersRepository.returnUserByField(login)
    if (!User){
        throw new Error('login is already exist')
    }
    const hash = User.password
    const password = req.body.password
    const status = bcrypt.compareSync(password, hash);
    if (!status){
        throw new Error('invalid login or password')
    }
}


//check for post
export const titleCheck = body('title').trim().isLength({min:1, max: 30}).isString()
export const shortDescriptionCheck = body('shortDescription').trim().isLength({min:1,max:100}).isString()
export const contentCheck = body('content').trim().isLength({min:1, max: 1000}).isString()
export const blogIdCheck = body('blogId').trim().custom(findByIdBlogs).isString()

//check for user
export const loginCheck = body('login').trim().custom(checkForExistingLogin).isLength({min:3, max: 10}).isString()
export const passwordAuthCheck = body ('password').trim().custom(checkForPasswordAuth).isLength({min:6, max: 20}).isString()
export const passwordCheck = body ('password').trim().isLength({min:6, max: 20}).isString()
export const emailCheck =  body ('email').trim().custom(checkForExistingEmail).isEmail().isString()

//check for comments
export const commentContentCheck = body('content').trim().isLength({min:20, max: 300}).isString()





import { Router } from "express"
export const postsRouter = Router()
import {Request, Response} from 'express'
import {Post, Blog} from "../types/types";
import {
    blogIdCheck,
    contentCheck,
    inputValidationMiddleware,
    shortDescriptionCheck,
    titleCheck
} from "../middlewares/input-valudation-middleware"
import {postsService} from "../domain/posts-service";
import {blogsService} from "../domain/blogs-service";
import {SortDirection} from "mongodb";
import {paginationHelpers} from "../helpers/pagination-helpers";


export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});

//GET - return all
postsRouter.get('/', async (req: Request, res: Response) => {
    let pageSize : number = paginationHelpers.pageSize(<string>req.query.pageSize);
    let pageNumber : number = paginationHelpers.pageNumber(<string>req.query.pageNumber)
    let sortBy : string = paginationHelpers.sortBy(<string>req.query.sortBy);
    let sortDirection : SortDirection = paginationHelpers.sortDirection(<string>req.query.sortDirection);
    let allPosts = await postsService.returnAllPost(pageSize, pageNumber, sortBy, sortDirection);
    res.status(200).send(allPosts)
})
//GET - return by ID
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const foundPost : Post | null = await postsService.returnPostById(req.params.id)
    if (foundPost){
        res.status(200).send(foundPost)

    } else {
        res.sendStatus(404)

    }
})
//DELETE - delete by ID
postsRouter.delete('/:id', adminAuth, async (req: Request, res: Response) => {
    let status = await postsService.deletePostById(req.params.id)
    if (status){
        res.sendStatus(204)
        return
    } else{
        res.sendStatus(404)
        return
    } 
})
//POST - create new 
postsRouter.post('/',
    adminAuth,
    titleCheck,
    shortDescriptionCheck,
    contentCheck,
    blogIdCheck,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

    const foundBlog : Blog | null = await blogsService.returnBlogById(req.body.blogId);
    if (foundBlog === null) {
        res.sendStatus(404)
    } else {
        const blogId = foundBlog.id
        const blogName = foundBlog.name
        const newPost : Post | null = await postsService.createNewPost(req.body, blogName, blogId);
        console.log(newPost)
        res.status(201).send(newPost)
    }

})
//PUT - update
postsRouter.put('/:id', adminAuth, titleCheck, shortDescriptionCheck, contentCheck, blogIdCheck, inputValidationMiddleware, async (req: Request, res: Response) => {
    const status : boolean = await postsService.updatePostById(req.body, req.params.id);
    if (status){
        res.sendStatus(204)
    }
    else {
        res.sendStatus(404)
    }
    
})
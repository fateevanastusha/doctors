import { Router } from "express"
export const postsRouter = Router()
import {Request, Response} from 'express'
import {Post, Blog} from "../types/types";
import { inputValidationMiddleware, postValidationMiddleware } from "../middlewares/input-valudation-middleware"
import {postsService} from "../domain/posts-service";
import {blogsService} from "../domain/blogs-service";


export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});

//GET - return all
postsRouter.get('/', async (req: Request, res: Response) => {
    const pageSize = +req.query.pageSize;
    const pageNumber = +req.query.pageNumber;
    const sortBy = "" + req.query.sortBy;
    let allPosts = await postsService.returnAllPost(pageSize, pageNumber, sortBy, -1);
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
postsRouter.post('/', adminAuth, postValidationMiddleware, inputValidationMiddleware, async (req: Request, res: Response) => {
    const foundBlog : Blog | null = await blogsService.returnBlogById(req.body.blogId);
    if (foundBlog === null) {
        res.sendStatus(404)
    } else {
        const blogId = foundBlog.id
        const blogName = foundBlog.name
        const newPost : Post | null = await postsService.createNewPost(req.body, blogName, blogId);
        res.status(201).send(newPost)
    }
})
//PUT - update
postsRouter.put('/:id', adminAuth, postValidationMiddleware, inputValidationMiddleware, async (req: Request, res: Response) => {
    const status : boolean = await postsService.updatePostById(req.body, req.params.id);
    if (status){
        res.sendStatus(204)
    }
    else {
        res.sendStatus(404)
    }
    
})
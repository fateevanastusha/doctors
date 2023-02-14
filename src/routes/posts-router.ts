import { Router } from "express"
export const postsRouter = Router()
import {Request, Response} from 'express'
import {Post, postsRepository} from "../repositories/posts-repositiory"
import { inputValidationMiddleware, postValidationMiddleware } from "../middlewares/input-valudation-middleware"
import { blogsRepository } from "../repositories/blogs-repositiory"

export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});

//GET - return all
postsRouter.get('/', async (req: Request, res: Response) => {
    let newPost = await postsRepository.returnAllPost()
    res.status(200).send(newPost)
    return
})
//GET - return by ID
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const foundPost : Promise<Post | undefined> = postsRepository.returnPostById(req.params.id)
    const post : Post | undefined = await  foundPost
    if (post){
        res.status(200).send(post)
        return
    } else {
        res.send(404)
        return
    }
})
//DELETE - delete by ID
postsRouter.delete('/:id', adminAuth, async (req: Request, res: Response) => {
    let status = await postsRepository.deletePostById(req.params.id)
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
    const blog = blogsRepository.returnBlogById(req.body.blogId)
    const newPostPromise : Promise<Post> = postsRepository.createNewPost(req.body, blog!.name);
    const newPost : Post = await newPostPromise
    res.status(201).send(newPost)
    return
})
//PUT - update
postsRouter.put('/:id', adminAuth, postValidationMiddleware, inputValidationMiddleware, async (req: Request, res: Response) => {
    const status : boolean = await postsRepository.updatePostById(req.body, req.params.id);
    if (status){
        res.sendStatus(204)
    }
    else {
        res.sendStatus(404)
    }
    
})
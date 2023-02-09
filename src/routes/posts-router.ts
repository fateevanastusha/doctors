import { Router } from "express"
export const postsRouter = Router()
import {Request, Response} from 'express'
import { postsRepository } from "../repositories/posts-repositiory"
import { inputValidationMiddleware, postValidationMiddleware } from "../middlewares/input-valudation-middleware"
import { blogsRepository } from "../repositories/blogs-repositiory"

//GET - return all
postsRouter.get('/', (req: Request, res: Response) => {
    let newPost = postsRepository.returnAllPost()
    res.status(200).send(newPost)
})
//GET - return by ID
postsRouter.get('/:id', (req: Request, res: Response) => {
    let post = postsRepository.returnPostById(req.params.id)
    if (post){
        res.status(200).send(post)
    } else {
        res.send(404)
    }
})
//DELETE - delete by ID
postsRouter.delete('/:delete', (req: Request, res: Response) => {
    let status = postsRepository.deletePostById(req.params.id)
    if (status){
        res.send(204)
    } else{
        res.send(404)
    }
})
//POST - create new 
postsRouter.post('/', postValidationMiddleware, inputValidationMiddleware, (req: Request, res: Response) => {
    const blog = blogsRepository.returnBlogById(req.body.blogId)
    let newPost = postsRepository.createNewPost(req.body, blog!.name);
    
    res.status(201).send(newPost)
})
//PUT - update
postsRouter.put('/:id', postValidationMiddleware, inputValidationMiddleware, (req: Request, res: Response) => {
    postsRepository.updatePostById(req.body, req.params.id)
    res.sendStatus(204)
})
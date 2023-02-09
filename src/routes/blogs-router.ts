import { Router } from "express"
export const blogsRouter = Router()
import {Request, Response} from 'express'
import { blogsRepository } from "../repositories/blogs-repositiory"
import { inputValidationMiddleware, blogValidationMiddleware } from "../middlewares/input-valudation-middleware"

export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'querty' }});

//GET - return all
blogsRouter.get('/',  (req: Request, res: Response) =>{
    let allBlogs = blogsRepository.returnAllBlogs();
    res.status(200).send(allBlogs);
    return
})
//GET - return by ID
blogsRouter.get('/:id', (req: Request, res: Response)=>{
    let blog = blogsRepository.returnBlogById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
        return
    } else {
        res.sendStatus(404)
        return
    }
})
//DELETE - delete by ID
blogsRouter.delete('/:id', adminAuth, (req: Request, res: Response) => {
    let status = blogsRepository.deleteBlogById(req.params.id);
    if (status){
        res.sendStatus(204);
        return
    } else {
        res.sendStatus(404)
        return
    }
})
//POST - create new
blogsRouter.post('/', adminAuth, blogValidationMiddleware, inputValidationMiddleware, (req: Request, res: Response)=> {
    let newVideo = blogsRepository.createNewBlog(req.body);
    res.status(201).send(newVideo);
    return
})
//PUT - update
blogsRouter.put('/:id', adminAuth, blogValidationMiddleware, inputValidationMiddleware, (req: Request, res: Response) => {
    blogsRepository.updateBlogById(req.body, req.params.id)
    res.sendStatus(204)
    return
})



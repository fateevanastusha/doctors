import { Router } from "express"
export const blogsRouter = Router()
import {Request, Response} from 'express'
import { blogsRepository, Blog } from "../repositories/blogs-repositiory"
import { inputValidationMiddleware, blogValidationMiddleware } from "../middlewares/input-valudation-middleware"


export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});

//GET - return all
blogsRouter.get('/', async (req: Request, res: Response) =>{
    let allBlogs = await blogsRepository.returnAllBlogs();
    res.status(200).send(allBlogs);
    return
})
//GET - return by ID
blogsRouter.get('/:id', async(req: Request, res: Response)=>{
    const foundBlog : Promise <Blog | undefined>= blogsRepository.returnBlogById(req.params.id);
    let blog : Blog | undefined = await foundBlog
    if (blog) {
        res.status(200).send(blog);
        return
    } else {
        res.sendStatus(404)
        return
    }
})
//DELETE - delete by ID
blogsRouter.delete('/:id', adminAuth, async(req: Request, res: Response) => {
    let status = await blogsRepository.deleteBlogById(req.params.id);
    if (status){
        res.sendStatus(204);
        return
    } else {
        res.sendStatus(404)
        return
    }
})
//POST - create new
blogsRouter.post('/', adminAuth, blogValidationMiddleware, inputValidationMiddleware, async(req: Request, res: Response)=> {
    const newBlogPromise : Promise<Blog> = blogsRepository.createNewBlog(req.body);
    const newBlog : Blog = await newBlogPromise
    res.status(201).send(newBlog);
    return
})
//PUT - update
blogsRouter.put('/:id', adminAuth, blogValidationMiddleware, inputValidationMiddleware, async(req: Request, res: Response) => {
    const status : boolean = await blogsRepository.updateBlogById(req.body, req.params.id)
    if (status){
        res.sendStatus(204)
    } else {
        res.send(404)
    } 
})



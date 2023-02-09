import { Router } from "express"
export const blogsRouter = Router()
import {Request, Response} from 'express'
import { blogsRepository } from "../repositories/blogs-repositiory"
import { inputValidationMiddleware, blogValidationMiddleware } from "../middlewares/input-valudation-middleware"


//GET - return all
blogsRouter.get('/', (req: Request, res: Response) =>{
    let allBlogs = blogsRepository.returnAllBlogs();
    res.status(200).send(allBlogs);
})
//GET - return by ID
blogsRouter.get('/:id', (req: Request, res: Response)=>{
    let blog = blogsRepository.returnBlogById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
    } else {
        res.send(404)
    }
})
//DELETE - delete by ID
blogsRouter.delete('/:id', (req: Request, res: Response) => {
    let status = blogsRepository.deleteBlogById(req.params.id);
    if (status){
        res.send(204);
    } else {
        res.send(404)
    }
})
//POST - create new
blogsRouter.post('/', blogValidationMiddleware, inputValidationMiddleware, (req: Request, res: Response)=> {
    
    let newVideo = blogsRepository.createNewBlog(req.body);
    res.status(201).send(newVideo);
})
//PUT - update
blogsRouter.put('/:id', blogValidationMiddleware, inputValidationMiddleware, (req: Request, res: Response) => {
    blogsRepository.updateBlogById(req.body, req.params.id)
    res.sendStatus(204)
})



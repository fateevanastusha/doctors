import { Router } from "express"
export const blogsRouter = Router()
import {Request, Response} from 'express'
import { blogsRepository } from "../repositories/blogs-db-repositiory"
import {Blog, Post} from "../types/types";
import {
    inputValidationMiddleware,
    blogValidationMiddleware,
    postValidationMiddleware
} from "../middlewares/input-valudation-middleware"
import {postsRepository} from "../repositories/posts-db-repositiory";


export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});

//GET - return all
blogsRouter.get('/', async (req: Request, res: Response) =>{
    let allBlogs = await blogsRepository.returnAllBlogs();
    res.status(200).send(allBlogs);
    return
});
//GET - return by ID
blogsRouter.get('/:id', async(req: Request, res: Response)=>{
    const foundBlog : Promise <Blog | null>= blogsRepository.returnBlogById(req.params.id);
    let blog : Blog | null = await foundBlog
    if (blog) {
        res.status(200).send(blog);
        return
    } else {
        res.sendStatus(404)
        return
    }
});
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
});
//POST - create new
blogsRouter.post('/', adminAuth, blogValidationMiddleware, inputValidationMiddleware, async(req: Request, res: Response)=> {
    const newBlog : Blog| null = await blogsRepository.createNewBlog(req.body);
    res.status(201).send(newBlog);
    return
});
//PUT - update
blogsRouter.put('/:id', adminAuth, blogValidationMiddleware, inputValidationMiddleware, async(req: Request, res: Response) => {
    const status : boolean = await blogsRepository.updateBlogById(req.body, req.params.id)
    if (status){
        res.sendStatus(204)
    } else {
        res.send(404)
    } 
});
//NEW - POST - create post for blog
blogsRouter.post('/:id/posts', adminAuth, postValidationMiddleware, inputValidationMiddleware,async (req: Request, res: Response) => {
    console.log(req.params)
    const foundBlog : Blog | null = await blogsRepository.returnBlogById(req.params.id);
    if (foundBlog === null) {
        res.sendStatus(404)
    } else {
        const blogId = foundBlog.id;
        const blogName = foundBlog.name;
        const newPost : Post | null = await postsRepository.createNewPost(req.body, blogName, blogId);
        res.status(201).send(newPost)
    }
});
//NEW - GET - get all posts in blog
blogsRouter.get('/:id/posts', async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const foundBlog : Promise <Blog | null>= blogsRepository.returnBlogById(req.params.id);
    let blog : Blog | null = await foundBlog
    if (!blog) {
        res.sendStatus(404)
    }
    const foundPosts : Promise<Post[]> = postsRepository.getAllPostsByBlogId(req.params.id)
    const posts = await foundPosts;
    if (posts) {
        res.status(200).send(posts)
    } else {
        res.send(404)
    }
});



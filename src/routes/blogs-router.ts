import { Router } from "express"
export const blogsRouter = Router()
import {Request, Response} from 'express'
import {Blog, Post} from "../types/types";
import {
    inputValidationMiddleware,
    titleCheck,
    shortDescriptionCheck,
    contentCheck,
    nameCheck,
    descriptionCheck,
    websiteUrlCheck
}
from "../middlewares/input-valudation-middleware"
import {blogsService} from "../domain/blogs-service";
import {postsService} from "../domain/posts-service";
import {param} from "express-validator";


export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});

//GET - return all
blogsRouter.get('/', async (req: Request, res: Response) =>{
    let pageSize : number
    let pageNumber : number
    let sortBy : string
    let sortDirection : number
    let searchNameTerm : string
    if (!req.query.searchNameTerm){
        searchNameTerm = ""
    } else {
        searchNameTerm = req.query.searchNameTerm.toString()
    }
    if (req.query.sortDirection === "asc"){
        sortDirection = 1
    } else {
        sortDirection = -1
    }
    if (!req.query.pageSize){
        pageSize = 10
    } else {
        pageSize = +req.query.pageSize;
    }
    if (!req.query.pageNumber){
        pageNumber = 1
    } else {
        pageNumber = +req.query.pageNumber;
    }
    if (!req.query.sortBy){
        sortBy = "createdAt"
    } else {
        sortBy = req.query.sortBy.toString()
    }
    let allBlogs = await blogsService.returnAllBlogs(pageSize, pageNumber, sortBy, sortDirection, searchNameTerm);
    res.status(200).send(allBlogs);
    return
});
//GET - return by ID
blogsRouter.get('/:id', async(req: Request, res: Response)=>{
    const foundBlog : Blog | null= await blogsService.returnBlogById(req.params.id);
    if (foundBlog) {
        res.status(200).send(foundBlog);
    } else {
        res.sendStatus(404)
    }
});
//DELETE - delete by ID
blogsRouter.delete('/:id', adminAuth, async(req: Request, res: Response) => {
    let status = await blogsService.deleteBlogById(req.params.id);
    if (status){
        res.sendStatus(204);
        return
    } else {
        res.sendStatus(404)
        return
    }
});
//POST - create new
blogsRouter.post('/',
    adminAuth,
    nameCheck,
    descriptionCheck,
    websiteUrlCheck,
    inputValidationMiddleware,
    async(req: Request, res: Response)=> {
    const newBlog : Blog| null = await blogsService.createNewBlog(req.body);
        console.log(newBlog, 'created  a new staff')
    res.status(201).send(newBlog);

});
//PUT - update
blogsRouter.put('/:id',
    adminAuth,
    nameCheck,
    descriptionCheck,
    websiteUrlCheck,
    inputValidationMiddleware,
    async(req: Request, res: Response) => {

    const status : boolean = await blogsService.updateBlogById(req.body, req.params.id)
    if (status){
        res.sendStatus(204)
    } else {
        res.send(404)
    }

});
//NEW - POST - create post for blog
blogsRouter.post('/:id/posts', adminAuth, titleCheck, shortDescriptionCheck, contentCheck, inputValidationMiddleware, async (req: Request, res: Response) => {
    const foundBlog : Blog | null = await blogsService.returnBlogById(req.params.id);
    if (!foundBlog) {
        res.sendStatus(404)
    } else {
        const blogId = foundBlog.id;
        const blogName = foundBlog.name;
        const newPost : Post | null = await postsService.createNewPost(req.body, blogName, blogId);
        res.status(201).send(newPost)
    }
});
//NEW - GET - get all posts in blog
blogsRouter.get('/:id/posts', async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const foundBlog : Blog | null = await blogsService.returnBlogById(blogId);
    if (!foundBlog) {
        res.sendStatus(404)
    }
    const foundPosts : Post[] = await postsService.getAllPostsByBlogId(blogId)
    if (foundPosts) {
        res.status(200).send(foundPosts)
    } else {
        res.sendStatus(404)
    }
});



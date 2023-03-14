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
import {SortDirection} from "mongodb";
import {paginationHelpers} from "../helpers/pagination-helpers";


export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});

//GET - return all
blogsRouter.get('/', async (req: Request, res: Response) =>{
    let pageSize : number = paginationHelpers.pageSize(<string>req.query.pageSize)
    let pageNumber : number = paginationHelpers.pageNumber(<string>req.query.pageNumber)
    let sortBy : string = paginationHelpers.sortBy(<string>req.query.sortBy)
    let sortDirection : SortDirection = paginationHelpers.sortDirection(<string>req.query.sortDirection)
    let searchNameTerm : string = paginationHelpers.searchNameTerm(<string>req.query.searchNameTerm)
    let allBlogs = await blogsService.returnAllBlogs(pageSize, pageNumber, sortBy, sortDirection, searchNameTerm);
    res.status(200).send(allBlogs);
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
    async(req: Request, res: Response) => {
        const newBlog : Blog| null = await blogsService.createNewBlog(req.body);
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
        return
    }
    let pageSize : number = paginationHelpers.pageSize(<string>req.query.pageSize);
    let pageNumber : number = paginationHelpers.pageNumber(<string>req.query.pageNumber);
    let sortBy : string = paginationHelpers.sortBy(<string>req.query.sortBy);
    let sortDirection : SortDirection = paginationHelpers.sortDirection(<string>req.query.sortDirection);
    let allPosts = await postsService.returnAllPostByBlogId(pageSize, pageNumber, sortBy, sortDirection, blogId);
    if (allPosts.items) {
        res.status(200).send(allPosts)
    }
});



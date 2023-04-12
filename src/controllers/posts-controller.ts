import {PostsService} from "../domain/posts-service";
import {Request, Response} from "express";
import {paginationHelpers} from "../helpers/pagination-helpers";
import {SortDirection} from "mongodb";
import {Blog, Post} from "../types/types";
import {PostsRepository} from "../repositories/posts-db-repositiory";
import {jwtService} from "../application/jwt-service";
import {BlogsService} from "../domain/blogs-service";
import {CommentsService} from "../domain/comments-service";

export class PostsController {
    constructor(
        protected postsService : PostsService,
        protected blogsService : BlogsService,
        protected postsRepository : PostsRepository,
        protected commentsService : CommentsService
        ) {
    }
    //GET - return all
    async getAllPosts(req: Request, res: Response){
        let pageSize : number = paginationHelpers.pageSize(<string>req.query.pageSize);
        let pageNumber : number = paginationHelpers.pageNumber(<string>req.query.pageNumber)
        let sortBy : string = paginationHelpers.sortBy(<string>req.query.sortBy);
        let sortDirection : SortDirection = paginationHelpers.sortDirection(<string>req.query.sortDirection);
        let allPosts = await this.postsService.returnAllPost(pageSize, pageNumber, sortBy, sortDirection);
        res.status(200).send(allPosts)
    }
    //GET - return by ID

    async getPostsById(req: Request, res: Response){
        const foundPost : Post | null = await this.postsService.returnPostById(req.params.id)
        if (foundPost){
            res.status(200).send(foundPost)

        } else {
            res.sendStatus(404)

        }
    }

    //DELETE - delete by ID

    async deletePostById(req: Request, res: Response){
        let status = await this.postsService.deletePostById(req.params.id)
        if (status){
            res.sendStatus(204)
            return
        } else{
            res.sendStatus(404)
            return
        }
    }

    //POST - create new

    async createPost(req: Request, res: Response){
        const foundBlog : Blog | null = await this.blogsService.returnBlogById(req.body.blogId);
        if (foundBlog === null) {
            res.sendStatus(404)
        } else {
            const blogId = foundBlog.id
            const blogName = foundBlog.name
            const newPost : Post | null = await this.postsService.createNewPost(req.body, blogName, blogId);
            console.log(newPost)
            res.status(201).send(newPost)
        }
    }

    //PUT - update

    async updatePost(req: Request, res: Response){
        const status : boolean = await this.postsService.updatePostById(req.body, req.params.id);
        if (status){
            res.sendStatus(204)
        }
        else {
            res.sendStatus(404)
        }
    }

    //CREATE COMMENT BY POST ID

    async createComment(req: Request, res: Response){
        const foundPost : Post | null = await this.postsRepository.returnPostById(req.params.id)
        if (foundPost === null) {
            res.sendStatus(404)
        } else {
            const postId = req.params.id
            let userId = await jwtService.getUserByIdToken(req.headers.authorization!.split(" ")[1])
            const createdComment = await this.commentsService.createComment(postId, userId, req.body.content)
            if (createdComment) {
                res.status(201).send(createdComment)
            } else {
                res.sendStatus(401)
            }
        }
    }

    //GET COMMENTS

    async getCommentsByPost(req: Request, res: Response){
        const foundPost = await this.postsService.returnPostById(req.params.id)
        if (foundPost === null) {
            res.sendStatus(404)
        } else {
            let pageSize : number = paginationHelpers.pageSize(<string>req.query.pageSize);
            let pageNumber : number = paginationHelpers.pageNumber(<string>req.query.pageNumber)
            let sortBy : string = paginationHelpers.sortBy(<string>req.query.sortBy);
            let sortDirection : SortDirection = paginationHelpers.sortDirection(<string>req.query.sortDirection);
            const foundComments = await this.commentsService.getAllCommentsByPostId(pageSize, pageNumber, sortBy, sortDirection, req.params.id)
            res.status(200).send(foundComments)
        }
    }

}
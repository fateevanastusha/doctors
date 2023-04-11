import { Router } from "express"
export const postsRouter = Router()
import {
    blogIdCheck, commentContentCheck,
    contentCheck,
    inputValidationMiddleware,
    shortDescriptionCheck,
    titleCheck
} from "../middlewares/input-valudation-middleware"
import {authMiddlewares} from "../middlewares/auth-middlewares";
import {PostsController} from "../controllers/posts-controller";


export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});
const postsController = new PostsController()

//GET - return all
postsRouter.get('/',
    postsController.getAllPosts.bind(postsController)
)
//GET - return by ID
postsRouter.get('/:id',
    postsController.getPostsById.bind(postsController)
)
//DELETE - delete by ID
postsRouter.delete('/:id',
    adminAuth,
    postsController.deletePostById.bind(postsController)
)
//POST - create new 
postsRouter.post('/',
    adminAuth,
    titleCheck,
    shortDescriptionCheck,
    contentCheck,
    blogIdCheck,
    inputValidationMiddleware,
    postsController.createPost.bind(postsController)
)
//PUT - update
postsRouter.put('/:id', adminAuth,
    titleCheck,
    shortDescriptionCheck,
    contentCheck,
    blogIdCheck,
    inputValidationMiddleware,
    postsController.updatePost.bind(postsController)
)
//CREATE COMMENT BY POST ID
postsRouter.post('/:id/comments',
    authMiddlewares,
    commentContentCheck,
    inputValidationMiddleware,
    postsController.createComment.bind(postsController)
)

//GET COMMENTS

postsRouter.get('/:id/comments',
    postsController.getCommentsByPost.bind(postsController)
)
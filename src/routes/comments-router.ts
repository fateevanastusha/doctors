import {Router} from "express";
import {commentContentCheck, inputValidationMiddleware} from "../middlewares/input-valudation-middleware";
import {authMiddlewares, checkForUser} from "../middlewares/auth-middlewares";
import {CommentsController} from "../controllers/comments-controller";

export const commentsRouter = Router()
const commentsController = new CommentsController()

//GET COMMENT BY ID
commentsRouter.get('/:id',
    commentsController.getCommentById.bind(commentsController)
);
//DELETE COMMENT BY ID
commentsRouter.delete('/:id',
    authMiddlewares,
    checkForUser,
    commentsController.deleteCommentById.bind(commentsController)
);
//UPDATE COMMENT BY ID
commentsRouter.put('/:id',
    authMiddlewares,
    checkForUser,
    commentContentCheck,
    inputValidationMiddleware,
    commentsController.updateCommentById.bind(commentsController)
);
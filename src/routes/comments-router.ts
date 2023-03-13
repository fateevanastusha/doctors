import {
    Request,
    Response,
    Router} from "express";
import {commentsService} from "../domain/comments-service";
import {commentContentCheck, inputValidationMiddleware} from "../middlewares/input-valudation-middleware";
import {authMiddlewares, checkForUser} from "../middlewares/auth-middlewares";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";

export const commentsRouter = Router()

//GET COMMENT BY ID
commentsRouter.get('/:id', async (req : Request, res: Response) => {
    const comment = await commentsService.getCommentById(req.params.id);
    if (!comment) {
        res.sendStatus(404)
    } else {
        res.send(comment).status(200)
    }
});
//DELETE COMMENT BY ID
commentsRouter.delete('/:id', authMiddlewares, async (req : Request, res: Response) => {
    const status = await commentsService.deleteCommentById(req.params.id);
    if (status) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

});
//UPDATE COMMENT BY ID
commentsRouter.put('/:id', authMiddlewares, checkForUser, commentContentCheck, inputValidationMiddleware, async (req : Request, res: Response) => {
    const status : boolean = await commentsService.updateCommentById(req.body.content, req.params.id)
    if (status) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
});
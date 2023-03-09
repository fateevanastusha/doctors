import {
    Request,
    Response,
    Router} from "express";
import {commentsService} from "../domain/comments-service";
import {commentContentCheck} from "../middlewares/input-valudation-middleware";
import {authMiddlewares} from "../middlewares/auth-middlewares";

export const commentsRouter = Router()

//GET COMMENT BY ID
commentsRouter.get('/:id', async (req : Request, res: Response) => {
    const comment = commentsService.getCommentById(req.params.id);
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
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }

});
//UPDATE COMMENT BY ID
commentsRouter.put('/:id', authMiddlewares, commentContentCheck, async (req : Request, res: Response) => {
    const status : boolean = await commentsService.updateCommentById(req.body, req.params.id)
    if (status) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
});
import {CommentsService} from "../domain/comments-service";
import {Request, Response} from "express";

export class CommentsController {
    constructor(protected commentsService : CommentsService) {
    }

    //GET COMMENT BY ID

    async getCommentById(req: Request, res: Response){
        const comment = await this.commentsService.getCommentById(req.params.id);
        if (!comment) {
            res.sendStatus(404)
        } else {
            res.send(comment).status(200)
        }
    }

    //DELETE COMMENT BY ID

    async deleteCommentById(req: Request, res: Response){
        const status = await this.commentsService.deleteCommentById(req.params.id);
        if (status) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }

    //UPDATE COMMENT BY ID

    async updateCommentById(req: Request, res: Response){
        const status : boolean = await this.commentsService.updateCommentById(req.body.content, req.params.id)
        if (status) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }

}
import {CommentsService} from "../domain/comments-service";
import {Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {LikesHelpers} from "../helpers/likes-helpers";

export class CommentsController {
    constructor(protected commentsService : CommentsService, protected likesHelpers : LikesHelpers) {
    }

    //GET COMMENT BY ID

    async getCommentById(req: Request, res: Response){
        let userId : string = await jwtService.getUserByIdToken(req.headers.authorization!.split(" ")[1]);
        const comment = await this.commentsService.getCommentById(req.params.id, userId);
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

    //CHANGE LIKE STATUS

    async changeLikeStatus(req: Request, res : Response){
        const requestType : string = req.body.likeStatus
        const commentId : string = req.params.id;
        let userId : string = await jwtService.getUserByIdToken(req.headers.authorization!.split(" ")[1]);
        const status : boolean = await this.commentsService.changeLikeStatus(requestType, commentId, userId)
        if (status){
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }

}
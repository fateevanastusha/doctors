import {Comment} from "../types/types";
import {commentsRepository} from "../repositories/comments-db-repository";

export const commentsService = {

    async getCommentById (id : string) : Promise<Comment | null> {
        return commentsRepository.getCommentById(id)
    },
    async deleteCommentById (id: string) : Promise<boolean> {
        return commentsRepository.deleteCommentById(id)
    },
    async updateCommentById (comment: Comment, id: string) : Promise <boolean> {
        return await commentsRepository.updateCommentById(comment, id)
    }

}
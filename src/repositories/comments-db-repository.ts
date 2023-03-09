import {commentsCollection} from "../db/db";
import {Comment} from "../types/types";

export const commentsRepository = {
    async getCommentById(id: string) : Promise <Comment | null> {
        return await commentsCollection.findOne({id : id}, {projection: {_id: 0}});
    },
    async deleteCommentById(id: string) : Promise <boolean> {
        const result = await commentsCollection.deleteOne({id : id})
        return result.deletedCount === 1
    },
    async updateCommentById(comment : Comment, id : string) : Promise <boolean> {
        const result = await commentsCollection.updateOne({id : id}, {
            content : comment.content
        })
        return result.matchedCount === 1
    }
}
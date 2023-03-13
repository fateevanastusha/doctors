import {commentsCollection} from "../db/db";
import {Comment} from "../types/types";

export const commentsRepository = {
    async getCommentById(id: string) : Promise <Comment | null> {
        return await commentsCollection.findOne({id : id}, {projection: {_id: 0, postId : 0}});
    },
    async deleteCommentById(id: string) : Promise <boolean> {
        const result = await commentsCollection.deleteOne({id : id})
        return result.deletedCount === 1
    },
    async updateCommentById(content : string, id : string) : Promise <boolean> {
        console.log("db repository " + content)
        const result = await commentsCollection.updateOne({id : id}, { $set : {
            content : content
            }
        })
        return result.matchedCount === 1
    },
    async createNewComment(comment: Comment) : Promise <Comment | null> {
        await commentsCollection.insertOne(comment)
        const createdComment = await this.getCommentById(comment.id)
        if (createdComment) {
            console.log('hello there')
            return createdComment
        } else {
            return null
        }
    },
    async getAllCommentsByPostId(postId: string) : Promise <Comment[] | null> {
        return commentsCollection
            .find({postId : postId}, {projection: {_id: 0, postId: 0}})
            .toArray()
    },
    async commentsCount() : Promise<number> {
        return commentsCollection
            .find()
            .count()
    }
}
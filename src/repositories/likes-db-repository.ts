import {LikeModelClass} from "../types/models";
import {Like} from "../types/types";


export class LikesRepository {
    async createNewStatus(status : Like) : Promise<boolean> {
        await LikeModelClass.insertMany(status)
        const createdStatus = await this.findStatus(status.postOrCommentId, status.userId)
        if (createdStatus){
            return true
        } else {
            return false
        }
    }
    async findStatus(commentId : string, userId : string) : Promise<Like | null> {
        return await LikeModelClass.findOne({postOrCommentId : commentId, userId : userId}).lean()
    }
    async deleteStatus(commentId : string, userId : string) : Promise<boolean> {
        const result = await LikeModelClass.deleteOne({postOrCommentId : commentId, userId : userId})
        return result.deletedCount === 1
    }
    async updateStatus(status : Like) : Promise<boolean> {
        const result = await LikeModelClass.updateOne({postOrCommentId : status.postOrCommentId, userId : status.userId}, {
            $set: {
                status
            }
        })
        return result.matchedCount === 1
    }
    async findLikes(commentId: string) : Promise<number>{
        return await LikeModelClass.countDocuments({postOrCommentId : commentId, status : "Like"})
    }
    async findDislikes(commentId: string) : Promise<number>{
        return await LikeModelClass.countDocuments({postOrCommentId : commentId, status : "Dislike"})
    }
    async deleteAllData(){
        return await LikeModelClass.deleteMany({})
    }
    async getAllLikes() : Promise <Like[]>{
        return await LikeModelClass.find({}).lean()
    }
}
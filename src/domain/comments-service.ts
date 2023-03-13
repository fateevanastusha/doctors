import {Comment, Paginator, User} from "../types/types";
import {commentsRepository} from "../repositories/comments-db-repository";
import {usersService} from "./users-service";
import {SortDirection} from "mongodb";
import {postsRepository} from "../repositories/posts-db-repositiory";
import {QueryRepository} from "../queryRepo";

export const commentsService = {

    async getCommentById (id : string) : Promise<Comment | null> {
        return commentsRepository.getCommentById(id)
    },
    async deleteCommentById (id: string) : Promise<boolean> {
        return commentsRepository.deleteCommentById(id)
    },
    async updateCommentById (content: string, id: string) : Promise <boolean> {
        console.log("service " + content)
        return await commentsRepository.updateCommentById(content, id)
    },
    async createComment(postId : string, userId: string, content : string) : Promise <Comment | null> {
        const user : User | null = await usersService.getUserById(userId)
        const comment : Comment = {
            id : (+new Date()).toString(),
            content : content,
            commentatorInfo : {
                userId: userId,
                userLogin: user!.login
            },
            createdAt: new Date().toISOString(),
            postId : postId
        }
        return commentsRepository.createNewComment(comment);
    },
    async getAllCommentsByPostId(PageSize: number, Page: number, sortBy : string, sortDirection: SortDirection, postId: string) : Promise<Paginator> {
        let total : number | null |  Comment []= await commentsRepository.getAllCommentsByPostId(postId)
        if (total === null) {
            total = 0
        } else {
            total = total.length
        }
        const PageCount = Math.ceil( total / PageSize)
        const Items = await QueryRepository.PaginatorForCommentsByBlogId(PageCount, PageSize, Page, sortBy, sortDirection, postId);
        return QueryRepository.PaginationForm(PageCount, PageSize, Page, total, Items)
    }

}
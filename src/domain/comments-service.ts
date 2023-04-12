import {Comment, Paginator, User, SortDirection} from "../types/types";
import {CommentsRepository} from "../repositories/comments-db-repository";
import {UsersService} from "./users-service";
import {queryRepository} from "../queryRepo";

export class CommentsService {
    constructor(protected usersService : UsersService, protected commentsRepository : CommentsRepository) {
    }

    async getCommentById (id : string) : Promise<Comment | null> {
        return this.commentsRepository.getCommentById(id)
    }
    async deleteCommentById (id: string) : Promise<boolean> {
        return this.commentsRepository.deleteCommentById(id)
    }
    async updateCommentById (content: string, id: string) : Promise <boolean> {
        return await this.commentsRepository.updateCommentById(content, id)
    }
    async createComment(postId : string, userId: string, content : string) : Promise <Comment | null> {
        const user : User | null = await this.usersService.getUserById(userId)
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
        return this.commentsRepository.createNewComment(comment);
    }
    async getAllCommentsByPostId(PageSize: number, Page: number, sortBy : string, sortDirection: SortDirection, postId: string) : Promise<Paginator> {
        let total : number | null |  Comment []= await this.commentsRepository.getAllCommentsByPostId(postId)
        if (total === null) {
            total = 0
        } else {
            total = total.length
        }
        const PageCount = Math.ceil( total / PageSize)
        const Items = await queryRepository.PaginatorForCommentsByBlogId(PageCount, PageSize, Page, sortBy, sortDirection, postId);
        return queryRepository.PaginationForm(PageCount, PageSize, Page, total, Items)
    }

}

import {Blog, Paginator, Post, User, Comment} from "./types/types";
import {BlogModelClass, CommentModel, PostModel, UserModel} from "./types/models";

export class QueryRepository {
    async PaginatorForBlogs(PageCount: number, PageSize: number, Page: number, sortBy: string, sortDirection: 1 | -1, searchNameTerm: string): Promise<Blog[]> {
        const skipSize: number = PageSize * (Page - 1)
        return BlogModelClass
            .find({name: {$regex: searchNameTerm, $options: 'i'}}, {_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .lean()
    }
    async PaginatorForPosts(PageCount: number, PageSize: number, Page: number, sortBy: string, sortDirection: 1 | -1): Promise<Post[]> {
        const skipSize: number = PageSize * (Page - 1)
        return PostModel
            .find({},{_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .lean()
    }
    async PaginatorForCommentsByBlogId(PageCount: number, PageSize: number, Page: number, sortBy: string, sortDirection: 1 | -1, postId : string): Promise<Comment[]> {
        const skipSize: number = PageSize * (Page - 1)
        return CommentModel
            .find({postId : postId}, {_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .lean()
    }
    async PaginatorForPostsByBlogId(PageCount: number, PageSize: number, Page: number, sortBy: string, sortDirection: 1 | -1, blogId: string): Promise<Post[]> {
        const skipSize: number = PageSize * (Page - 1)
        return PostModel
            .find({blogId: blogId}, {_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .lean()
    }
    async PaginatorForUsers(PageCount: number, PageSize: number, Page: number, sortBy: string, sortDirection: 1 | -1, searchLoginTerm: string, searchEmailTerm: string): Promise<User[]> {
        const skipSize: number = PageSize * (Page - 1)
        return UserModel
            .find({
                    $or: [
                        {login: {$regex: searchLoginTerm, $options: 'i'}},
                        {email: {$regex: searchEmailTerm, $options: 'i'}}
                    ]
            }, {_id: 0, __v: 0, password : 0, confirmedCode : 0})
            .sort({[sortBy]: sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .lean()
    }
    async PaginationForm(PageCount: number, PageSize: number, Page: number, total: number, Items: Post[] | Blog [] | User[] | Comment[]): Promise<Paginator> {
        return  {
            pagesCount: PageCount,
            page: Page,
            pageSize: PageSize,
            totalCount: total,
            items: Items
        }

    }
}

export const queryRepository = new QueryRepository()
import {Blog, Paginator, Post, User, Comment} from "./types/types";
import {SortDirection} from "mongodb";
import {BlogModel, CommentModel, PostModel, UserModel} from "./types/models";

export const QueryRepository = {
    async PaginatorForBlogs(PageCount: number, PageSize: number, Page: number, sortBy: string, sortDirection: SortDirection, searchNameTerm: string): Promise<Blog[]> {
        const skipSize: number = PageSize * (Page - 1)
        return BlogModel
            .find({name: {$regex: searchNameTerm, $options: 'i'}}, {projection: {_id: 0}})
            .sort({[sortBy]: sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .lean()
    },
    async PaginatorForPosts(PageCount: number, PageSize: number, Page: number, sortBy: string, sortDirection: SortDirection): Promise<Post[]> {
        const skipSize: number = PageSize * (Page - 1)
        return PostModel
            .find({}, {projection: {_id: 0}})
            .sort({[sortBy]: sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .lean()
    },
    async PaginatorForCommentsByBlogId(PageCount: number, PageSize: number, Page: number, sortBy: string, sortDirection: SortDirection, postId : string): Promise<Comment[]> {
        const skipSize: number = PageSize * (Page - 1)
        return CommentModel
            .find({postId : postId}, {projection: {_id: 0, postId : 0}})
            .sort({[sortBy]: sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .lean()
    },
    async PaginatorForPostsByBlogId(PageCount: number, PageSize: number, Page: number, sortBy: string, sortDirection: SortDirection, blogId: string): Promise<Post[]> {
        const skipSize: number = PageSize * (Page - 1)
        return PostModel
            .find({blogId: blogId}, {projection: {_id: 0}})
            .sort({[sortBy]: sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .lean()
    },
    async PaginatorForUsers(PageCount: number, PageSize: number, Page: number, sortBy: string, sortDirection: SortDirection, searchLoginTerm: string, searchEmailTerm: string): Promise<User[]> {
        const skipSize: number = PageSize * (Page - 1)
        return UserModel
            .find({
                    $or: [
                        {login: {$regex: searchLoginTerm, $options: 'i'}},
                        {email: {$regex: searchEmailTerm, $options: 'i'}}
                    ]
            }, {projection: {_id: 0, password: 0}})
            .sort({[sortBy]: sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .lean()
    },
    async PaginationForm(PageCount: number, PageSize: number, Page: number, total: number, Items: Post[] | Blog [] | User[] | Comment[]): Promise<Paginator> {
        return  {
            pagesCount: PageCount,
            page: Page,
            pageSize: PageSize,
            totalCount: total,
            items: Items
        }

    },

};
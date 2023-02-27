import {Blog, Paginator, Post} from "./types/types";
import {blogsCollection, postsCollection} from "./db/db";

export const QueryRepository = {
    async PaginatorForBlogs (PageCount: number, PageSize: number, Page: number, sortBy : string, sortDirection: 1 | -1) : Promise <Blog[]> {
        const skipSize: number = PageSize * (Page - 1)
        return blogsCollection
            .find({}, {projection: {_id: 0}})
            .sort({[sortBy] : sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .toArray()
    },
    async PaginatorForPosts (PageCount: number, PageSize: number, Page: number, sortBy : string, sortDirection: 1 | -1) : Promise <Post[]> {
        const skipSize: number = PageSize * (Page - 1)
        return postsCollection
            .find({}, {projection: {_id: 0}})
            .sort({[sortBy] : sortDirection})
            .skip(skipSize)
            .limit(PageSize)
            .toArray()
    },
    async PaginationForm (PageCount: number, PageSize: number, Page: number, Items: Post[] | Blog []) : Promise <Paginator> {
        const paginator : Paginator = {
            pagesCount: PageCount,
            page: Page,
            pageSize: PageSize,
            totalCount: Items.length,
            items : Items
        }
        return paginator;
    },

};
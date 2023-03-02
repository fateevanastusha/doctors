import {blogsRepository} from "../repositories/blogs-db-repositiory";
import {Blog, Paginator, Post} from "../types/types";
import {QueryRepository} from "../queryRepo";
import {SortDirection} from "mongodb";

export const blogsService = {
    //GET - return all
    async returnAllBlogs(
        PageSize: number,
        Page: number,
        sortBy : string,
        sortDirection: SortDirection,
        searchNameTerm : string)
        : Promise<Paginator>{

        const total = await blogsRepository.returnBlogsCount(searchNameTerm)
        const PageCount = Math.ceil( total / PageSize)
        const Items = await QueryRepository.PaginatorForBlogs(
            PageCount,
            PageSize,
            Page,
            sortBy,
            sortDirection,
            searchNameTerm
        );
        return QueryRepository.PaginationForm(
            PageCount,
            PageSize,
            Page,
            total,
            Items
        )
    },
    //GET - return by ID
    async returnBlogById(id: string) : Promise<Blog | null>{
        const blogById = await blogsRepository.returnBlogById(id)
        return blogById
    },
    //DELETE - delete by ID
    async deleteBlogById(id: string) : Promise<boolean>{
        return await blogsRepository.deleteBlogById(id)
    },
    //delete all data
    async deleteAllData(){
        await blogsRepository.deleteAllData()
    },
    //POST - create new
    async createNewBlog(blog: Blog) : Promise<Blog | null>{
        const newBlog = {
            id: '' + (+(new Date())),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const createdBlog = await blogsRepository.createNewBlog(newBlog);
        return createdBlog;
    },
    //PUT - update
    async updateBlogById(blog : Blog, id: string) : Promise <boolean>{
        return await blogsRepository.updateBlogById(blog, id)
    }
}
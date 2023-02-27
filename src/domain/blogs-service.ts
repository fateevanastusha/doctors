import {blogsRepository} from "../repositories/blogs-db-repositiory";
import {Blog, Paginator, Post} from "../types/types";
import {QueryRepository} from "../queryRepo";
import it from "node:test";

export const blogsService = {
    //GET - return all
    async returnAllBlogs(PageSize: number, Page: number, sortBy : string, sortDirection: 1 | -1) : Promise<Paginator>{
        const total = (await blogsRepository.returnAllBlogs()).length
        const PageCount = Math.ceil( total / PageSize)
        const Items = await QueryRepository.PaginatorForBlogs(PageCount, PageSize, Page, sortBy, sortDirection);
        return QueryRepository.PaginationForm(PageCount, PageSize, Page, total, Items)
    },
    //GET - return by ID
    async returnBlogById(id: string) : Promise<Blog | null>{
        return blogsRepository.returnBlogById(id)
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
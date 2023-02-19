import {blogsRepository} from "../repositories/blogs-db-repositiory";
import {Blog,Post} from "../types/types";

export const blogsService = {
    //GET - return all
    async returnAllBlogs() : Promise<Blog []>{
        return blogsRepository.returnAllBlogs()
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
import {Blog} from "../types/types";
import {BlogModel} from "../types/models";


export const blogsRepository = {
    //GET - return all
    async returnAllBlogs() : Promise<Blog[]>{
        return BlogModel
            .find({projection: {_id: 0}})
            .lean()
    },
    async returnBlogsCount(searchNameTerm : string) : Promise<number>{
        return BlogModel
            .find({name: {$regex: searchNameTerm, $options : 'i'}})
            .count()
    },
    //GET - return by ID
    async returnBlogById(id: string) : Promise<Blog | null>{
        const blog : Blog | null = await BlogModel.findOne({id: id}, {projection: {_id: 0}})
        return blog
    },
    //DELETE - delete by ID
    async deleteBlogById(id: string) : Promise<boolean>{
        const result = await BlogModel.deleteOne({id: id})
        return result.deletedCount === 1
    },
    //delete all data
    async deleteAllData(){
        const result = await BlogModel.deleteMany({})
        return []
    },
    //POST - create new 
    async createNewBlog(newBlog: Blog) : Promise<Blog | null>{
        await BlogModel.insertMany(newBlog)
        const createdBlog = await this.returnBlogById(newBlog.id)
        if(createdBlog) {
            return createdBlog
        }
        return null
    },
    //PUT - update
    async updateBlogById(blog : Blog, id: string) : Promise <boolean>{
        const result = await BlogModel.updateOne({id: id}, { $set: blog})
        return result.matchedCount === 1
    }, 
};


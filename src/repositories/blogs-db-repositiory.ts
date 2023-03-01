import {Blog} from "../types/types";
import {blogsCollection} from "../db/db";


export const blogsRepository = {
    //GET - return all
    async returnAllBlogs() : Promise<Blog[]>{
        return blogsCollection
            .find({projection: {_id: 0}})
            .toArray()


    },
    async returnBlogsCount(searchNameTerm : string) : Promise<number>{
        return blogsCollection
            .find({name: {$regex: searchNameTerm, $options : 'i'}})
            .count()

    },
    //GET - return by ID
    async returnBlogById(id: string) : Promise<Blog | null>{
        const blog : Blog | null = await blogsCollection.findOne({id: id}, {projection: {_id: 0}})
        return blog
    },
    //DELETE - delete by ID
    async deleteBlogById(id: string) : Promise<boolean>{
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    //delete all data
    async deleteAllData(){
        const result = await blogsCollection.deleteMany({})
        return []
    },
    //POST - create new 
    async createNewBlog(newBlog: Blog) : Promise<Blog | null>{
        await blogsCollection.insertOne(newBlog)
        const updatedBlog = await this.returnBlogById(newBlog.id)
        if(updatedBlog) {
            return updatedBlog
        }
        return null
    },
    //PUT - update
    async updateBlogById(blog : Blog, id: string) : Promise <boolean>{
        const result = await blogsCollection.updateOne({id: id}, { $set:
                {
                name : blog.name,
                description : blog.description,
                websiteUrl : blog.websiteUrl,
                }
        })
        return result.matchedCount === 1
    }, 
};


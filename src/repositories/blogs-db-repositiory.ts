import {Blog} from "../types/types";
import {BlogModel} from "../types/models";


export const blogsRepository = {

    async returnBlogsCount(searchNameTerm : string) : Promise<number>{
        return BlogModel
            .countDocuments({name: {$regex: searchNameTerm, $options : 'i'}})
    },
    //GET - return by ID
    async returnBlogById(id: string) : Promise<Blog | null>{
        const blog : Blog | null = await BlogModel.findOne({id: id}, {_id: 0, __v: 0})
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
        console.log(createdBlog + "created blog")
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


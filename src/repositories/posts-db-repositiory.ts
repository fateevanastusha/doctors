import {Post} from "../types/types";
import {PostModel} from "../types/models";

export const postsRepository = {
  //return all posts
  async returnAllPost() : Promise<Post[]>{
    return PostModel
        .find({}, {_id: 0, __v: 0})
        .lean()
  },
  //return post by Id
  async returnPostById(id: string) : Promise<Post | null>{
    return PostModel.findOne({id : id}, {_id: 0, __v: 0});
  },
  //delete post by Id
  async deletePostById(id:string) : Promise<boolean>{
    const result = await PostModel.deleteOne({id: id});
    return result.deletedCount === 1;
  },
  //delete all data
  async deleteAllData() {
    await PostModel.deleteMany({});
    return [];
  },
  //create new post
  async createNewPost(newPost: Post) : Promise <Post | null>{
    await PostModel.insertMany(newPost)
    return this.returnPostById(newPost.id)
  },
  //update post by id
  async updatePostById(post : Post, id : string) : Promise <boolean>{
    const result = await PostModel.updateOne({id: id}, {$set : post
    })
    return result.matchedCount === 1

  },
  //return all posts by blogId
  async getAllPostsByBlogId(blogId : string) : Promise<Post[]>{
    return PostModel.find({blogId}, {projection: {_id: 0}}).lean()
  }
};
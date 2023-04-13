import {Post} from "../types/types";
import {PostModelClass} from "../types/models";

export class PostsRepository {
  //return all posts
  async returnAllPost() : Promise<Post[]>{
    return PostModelClass
        .find({}, {_id: 0, __v: 0})
        .lean()
  }
  //return post by Id
  async returnPostById(id: string) : Promise<Post | null>{
    return PostModelClass.findOne({id : id}, {_id: 0, __v: 0});
  }
  //delete post by Id
  async deletePostById(id:string) : Promise<boolean>{
    const result = await PostModelClass.deleteOne({id: id});
    return result.deletedCount === 1;
  }
  //delete all data
  async deleteAllData() {
    await PostModelClass.deleteMany({});
    return [];
  }
  //create new post
  async createNewPost(newPost: Post) : Promise <Post | null>{
    await PostModelClass.insertMany(newPost)
    return this.returnPostById(newPost.id)
  }
  //update post by id
  async updatePostById(post : Post, id : string) : Promise <boolean>{
    const result = await PostModelClass.updateOne({id: id}, {$set : post
    })
    return result.matchedCount === 1

  }
  //return all posts by blogId
  async getAllPostsByBlogId(blogId : string) : Promise<Post[]>{
    return PostModelClass.find({blogId}, {projection: {_id: 0}}).lean()
  }
};

export const postsRepository = new PostsRepository()
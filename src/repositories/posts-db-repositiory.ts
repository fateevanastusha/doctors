import {blogsCollection, postsCollection} from "../db/db";
import {Post} from "../types/types";

export const postsRepository = {
  //return all posts
  async returnAllPost() : Promise<Post[]>{
    return postsCollection
        .find({}, {projection: {_id: 0}})
        .toArray()
  },
  //return post by Id
  async returnPostById(id: string) : Promise<Post | null>{
    return postsCollection.findOne({id : id}, {projection: {_id: 0}});
  },
  //delete post by Id
  async deletePostById(id:string) : Promise<boolean>{
    const result = await postsCollection.deleteOne({id: id});
    return result.deletedCount === 1;
  },
  //delete all data
  async deleteAllData() {
    await postsCollection.deleteMany({});
    return [];
  },
  //create new post
  async createNewPost(newPost: Post) : Promise <Post | null>{
    await postsCollection.insertOne(newPost)
    console.log(newPost)
    return this.returnPostById(newPost.id)
  },
  //update post by id
  async updatePostById(post : Post, id : string) : Promise <boolean>{
    const result = await postsCollection.updateOne({id: id}, {$set :
      {
      title : post.title,
      shortDescription : post.shortDescription,
      content : post.content,
      blogId : post.blogId
      }
    })
    return result.matchedCount === 1

  },
  //return all posts by blogId
  async getAllPostsByBlogId(blogId : string) : Promise<Post[]>{
    return postsCollection.find({blogId}, {projection: {_id: 0}}).toArray()
  }
};
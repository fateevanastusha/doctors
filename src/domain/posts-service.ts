import {postsRepository} from "../repositories/posts-db-repositiory";
import {Blog, Post} from "../types/types";

export const postsService = {
    //return all posts
    async returnAllPost() : Promise<Post[]>{
        return postsRepository.returnAllPost();
    },
    //return post by id
    async returnPostById(id: string) : Promise<Post | null>{
        return postsRepository.returnPostById(id);
    },
    //delete post by id
    async deletePostById(id:string) : Promise<boolean>{
        return postsRepository.deletePostById(id);
    },
    //delete all data
    async deleteAllData() {
        postsRepository.deleteAllData();
    },
    //create new post
    async createNewPost(post: Post, blogName: string, blogId : string) : Promise <Post | null>{
        const newPost = {
            id: '' + (+(new Date())),
            title : post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: blogId,
            blogName: blogName,
            createdAt : new Date().toISOString()
        };
        const createdPost = await postsRepository.createNewPost(newPost);
        return createdPost;
    },
    //update post by id
    async updatePostById(post : Post, id : string) : Promise <boolean>{
        return await postsRepository.updatePostById(post,id)
    },
    //return all posts by blogId
    async getAllPostsByBlogId(blogId : string) : Promise<Post[]>{
        return postsRepository.getAllPostsByBlogId(blogId)
    }
}
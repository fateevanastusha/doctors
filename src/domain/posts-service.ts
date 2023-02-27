import {postsRepository} from "../repositories/posts-db-repositiory";
import {Blog, Post} from "../types/types";
import {blogsRepository} from "../repositories/blogs-db-repositiory";
import {QueryRepository} from "../queryRepo";

export const postsService = {
    //return all posts
    async returnAllPost(PageSize: number, Page: number, sortBy : string, sortDirection: 1 | -1) : Promise<Post[]>{
        const PageCount = Math.ceil((await postsRepository.returnAllPost()).length / PageSize)
        const Items = await QueryRepository.PaginatorForPosts(PageCount, PageSize, Page, sortBy, sortDirection);
        return QueryRepository.PaginationForm(PageCount, PageSize, Page, Items)
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
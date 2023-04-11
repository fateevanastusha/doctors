import {PostsRepository} from "../repositories/posts-db-repositiory";
import {Paginator, Post, SortDirection} from "../types/types";
import {QueryRepository} from "../queryRepo";

export class PostsService {
    postsRepository : PostsRepository
    constructor() {
        this.postsRepository = new PostsRepository()
    }
    //return all posts
    async returnAllPost(PageSize: number, Page: number, sortBy : string, sortDirection: SortDirection) : Promise<Paginator>{
        const total = (await this.postsRepository.returnAllPost()).length
        const PageCount = Math.ceil( total / PageSize)
        const Items = await QueryRepository.PaginatorForPosts(PageCount, PageSize, Page, sortBy, sortDirection );
        return QueryRepository.PaginationForm(PageCount, PageSize, Page, total, Items)
    }
    async returnAllPostByBlogId (PageSize: number, Page: number, sortBy : string, sortDirection: SortDirection, blogId: string) : Promise<Paginator>{
        let total = (await this.postsRepository.getAllPostsByBlogId(blogId))
        let totalNumber
        if (total === null) {
            totalNumber = 0
        } else {
            totalNumber = total.length
        }
        const PageCount = Math.ceil( totalNumber / PageSize)
        const Items = await QueryRepository.PaginatorForPostsByBlogId(PageCount, PageSize, Page, sortBy, sortDirection, blogId);
        return QueryRepository.PaginationForm(PageCount, PageSize, Page, totalNumber, Items)
    }
    //return post by id
    async returnPostById(id: string) : Promise<Post | null>{
        return this.postsRepository.returnPostById(id);
    }
    //delete post by id
    async deletePostById(id:string) : Promise<boolean>{
        return this.postsRepository.deletePostById(id);
    }
    //delete all data
    async deleteAllData() {
        await this.postsRepository.deleteAllData();
    }
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
        const createdPost = await this.postsRepository.createNewPost(newPost);
        return createdPost;
    }
    //update post by id
    async updatePostById(post : Post, id : string) : Promise <boolean>{
        return await this.postsRepository.updatePostById(post,id)
    }
}
import {blogs,blogsRepository} from '../repositories/blogs-repositiory'
export type Post = {
  id: string,
  title: string,
  shortDescription: string, 
  content: string,
  blogId: string,
  blogName: string,
  createdAt: string
}
export const posts = [
    {
    id: "string",
    title: "string",
    shortDescription: "string",
    content: "string",
    blogId: "string",
    blogName : "string",
    createdAt: "string"
  }
];
export const postsRepository = {
  //return all posts
  async returnAllPost() : Promise<Post[]>{
    return posts
  },
  //return post by Id
  async returnPostById(id: string) : Promise<Post | undefined>{
    let post : Post | undefined = await posts.find(p => p.id === id);
    return post
  },
  //delete post by Id
  async deletePostById(id:string) : Promise<boolean>{
    let index = posts.findIndex(p => p.id === id);
    if (index > -1){
      posts.splice(index, 1)
      return true
    } else {
      return false
    }
  },
  //delete all data
  async deleteAllData() {
    posts.splice(0, posts.length)
    //return posts
  },
  //create new post
  async createNewPost(post: Post, blogName: string) : Promise <Post>{
    const newPost = {
      id: '' + (+(new Date())),
      title : post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: blogName,
      createdAt : "" + new Date()
    }
    posts.push(newPost);
    return newPost;
  },
  //update post by id
  async updatePostById(post : Post, id : string) : Promise <boolean>{
    const oldPost = posts.find(p => p.id === id);
    if (oldPost){
      oldPost.title = post.title;
      oldPost.shortDescription = post.shortDescription;
      oldPost.content = post.content;
      oldPost.blogId = post.blogId;
      return true;
    } else {
      return false;
    }
  }
};
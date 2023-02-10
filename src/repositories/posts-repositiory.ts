import {blogs,blogsRepository} from '../repositories/blogs-repositiory'
export type Post = {
  id: string,
  title: string,
  shortDescription: string, 
  content: string,
  blogId: string,
  blogName: string
}
export const posts = [
    {
    id: "string",
    title: "string",
    shortDescription: "string",
    content: "string",
    blogId: "string",
    blogName : "string"
  }
];
export const postsRepository = {
  //return all posts
  returnAllPost(){
    return posts
  },
  //return post by Id
  returnPostById(id: string){
    let post = posts.find(p => p.id === id);
    return post
  },
  //delete post by Id
  deletePostById(id:string){
    let index = posts.findIndex(p => p.id === id);
    if (index > -1){
      posts.splice(index, 1)
      return true
    } else {
      return false
    }
  },
  //delete all data
  deleteAllData(){
    posts.splice(0, posts.length)
    return posts
  },
  //create new post
  createNewPost(post: Post, blogName: string){
    const newPost = {
      id: '' + (+(new Date())),
      title : post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: blogName 
    }
    posts.push(newPost);
    return newPost;
  },
  //update post by id
  updatePostById(post : Post, id : string){
    const oldPost = posts.find(p => p.id === id);
    if (oldPost){
      oldPost.title = post.title;
      oldPost.shortDescription = post.shortDescription;
      oldPost.content = post.content
      oldPost.blogId = post.blogId
      return true;
    } else {
      return false;
    }
  }
};
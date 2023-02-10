"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = exports.posts = void 0;
exports.posts = [
    {
        id: "string",
        title: "string",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string"
    }
];
exports.postsRepository = {
    //return all posts
    returnAllPost() {
        return exports.posts;
    },
    //return post by Id
    returnPostById(id) {
        let post = exports.posts.find(p => p.id === id);
        return post;
    },
    //delete post by Id
    deletePostById(id) {
        let index = exports.posts.findIndex(p => p.id === id);
        if (index > -1) {
            exports.posts.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    },
    //delete all data
    deleteAllData() {
        exports.posts.splice(0, exports.posts.length);
        return exports.posts;
    },
    //create new post
    createNewPost(post, blogName) {
        const newPost = {
            id: '' + (+(new Date())),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blogName
        };
        exports.posts.push(newPost);
        return newPost;
    },
    //update post by id
    updatePostById(post, id) {
        const oldPost = exports.posts.find(p => p.id === id);
        if (oldPost) {
            oldPost.title = post.title;
            oldPost.shortDescription = post.shortDescription;
            oldPost.content = post.content;
            oldPost.blogId = post.blogId;
            return true;
        }
        else {
            return false;
        }
    }
};

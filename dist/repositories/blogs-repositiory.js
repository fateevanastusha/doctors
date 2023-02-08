"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const blogs = [
    {
        "id": "string",
        "name": "string",
        "description": "string",
        "websiteUrl": "string"
    }
];
exports.blogsRepository = {
    //GET - return all
    returnAllBlogs() {
        return blogs;
    },
    //GET - return by ID
    returnBlogById(id) {
        let blog = blogs.find(p => p.id === id);
        return blog;
    },
    //DELETE - delete by ID
    deleteBlogById(id) {
        let index = blogs.findIndex(p => p.id === id);
        if (index > -1) {
            blogs.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    },
    //POST - create new 
    createNewBlog(blog) {
        const newBlog = {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        };
        blogs.push(newBlog);
        return newBlog;
    },
    //PUT - update
    updateBlogById() {
    },
};

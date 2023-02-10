"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = exports.blogs = void 0;
exports.blogs = [
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
        return exports.blogs;
    },
    //GET - return by ID
    returnBlogById(id) {
        let blog = exports.blogs.find(p => p.id === id);
        return blog;
    },
    //DELETE - delete by ID
    deleteBlogById(id) {
        let index = exports.blogs.findIndex(p => p.id === id);
        if (index > -1) {
            exports.blogs.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    },
    //delete all data
    deleteAllData() {
        exports.blogs.splice(0, exports.blogs.length);
        return exports.blogs;
    },
    //POST - create new 
    createNewBlog(blog) {
        const newBlog = {
            id: '' + (+(new Date())),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        };
        exports.blogs.push(newBlog);
        return newBlog;
    },
    //PUT - update
    updateBlogById(blog, id) {
        const oldBlog = exports.blogs.find(p => p.id === id);
        if (oldBlog) {
            oldBlog.name = blog.name;
            oldBlog.description = blog.description;
            oldBlog.websiteUrl = blog.websiteUrl;
            return true;
        }
        else {
            return false;
        }
    },
};

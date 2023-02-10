export type Blog = {
    id: string,
    name: string,
    description: string, 
    websiteUrl: string
}

export const blogs = [  
    {
    "id": "string",
    "name": "string",
    "description": "string",
    "websiteUrl": "string"
  }
];
export const blogsRepository = {
    //GET - return all
    returnAllBlogs(){
        return blogs
    },
    //GET - return by ID
    returnBlogById(id: string){
        let blog = blogs.find(p => p.id === id);
        return blog
    },
    //DELETE - delete by ID
    deleteBlogById(id: string){
        let index = blogs.findIndex(p => p.id === id);
        if (index > -1) {
            blogs.splice(index,1);
            return true;
        } else {
            return false;
        }
    },
    //delete all data
    deleteAllData(){
        blogs.splice(0,blogs.length)
        return blogs
    },
    //POST - create new 
    createNewBlog(blog: Blog){
        const newBlog = {
            id: '' + (+(new Date())),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        }
        blogs.push(newBlog);
        return newBlog;
    },
    //PUT - update
    updateBlogById(blog : Blog, id: string){
        const oldBlog = blogs.find(p => p.id === id)
        if (oldBlog){
            oldBlog.name = blog.name;
            oldBlog.description = blog.description;
            oldBlog.websiteUrl = blog.websiteUrl
            return true
        } else {
            return false
        }
    }, 
};


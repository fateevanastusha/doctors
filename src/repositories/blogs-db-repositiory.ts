export type Blog = {
    id: string,
    name: string,
    description: string, 
    websiteUrl: string
    createdAt : string
    isMembership : boolean
}

export const blogs = [  
    {
    "id": "string",
    "name": "string",
    "description": "string",
    "websiteUrl": "string",
    "createdAt" : "string",
    "isMembership" : false
  }
];
export const blogsRepository = {
    //GET - return all
    async returnAllBlogs() : Promise<Blog []>{
        return blogs
    },
    //GET - return by ID
    async returnBlogById(id: string) : Promise<Blog | undefined>{
        let blog : Blog | undefined = blogs.find(p => p.id === id);
        return blog
    },
    //DELETE - delete by ID
    async deleteBlogById(id: string) : Promise<boolean>{
        let index = blogs.findIndex(p => p.id === id);
        if (index > -1) {
            blogs.splice(index,1);
            return true;
        } else {
            return false;
        }
    },
    //delete all data
    async deleteAllData(){
        blogs.splice(0,blogs.length)
        return blogs;
    },
    //POST - create new 
    async createNewBlog(blog: Blog) : Promise<Blog>{
        const newBlog = {
            id: '' + (+(new Date())),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: "" + new Date(),
            isMembership: false
        }
        blogs.push(newBlog);
        return newBlog;
    },
    //PUT - update
    async updateBlogById(blog : Blog, id: string) : Promise <boolean>{
        const oldBlog = blogs.find(p => p.id === id)
        if (oldBlog){
            oldBlog.name = blog.name;
            oldBlog.description = blog.description;
            oldBlog.websiteUrl = blog.websiteUrl
            oldBlog.createdAt  = blog.createdAt
            return true
        } else {
            return false
        }
    }, 
};


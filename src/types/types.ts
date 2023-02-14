export type Blog = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
    createdAt : string
    isMembership : boolean
}
export type Post = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}
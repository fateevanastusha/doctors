import supertest from "supertest";

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
export type User = {
    id: string,
    login : string,
    email : string,
    password: string,
    createdAt: string

}
export type Auth = {
    loginOrEmail : string,
    password : string
}
export type Paginator = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items : Blog[] | Post[] | User[]
}
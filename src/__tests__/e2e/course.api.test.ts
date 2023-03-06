import request from "supertest";
import {app} from "../../app";
import {response} from "express";
import beforeEach from "node:test";
import {Paginator} from "../../types/types";



describe('/blogs', () => {
    //DELETE ALL DATA
    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')

    })

    it ('GET EMPTY BLOG DATA BASE', async  () => {
        const res = await request(app).get('/blogs')
        expect(res.body).toEqual({
            pagesCount: 0,
            page: 1,
            pageSize: 10,
            totalCount: 0,
            items: []
        })
    })


    let createResponse : any = null

    it ('SUCCESSFULLY CREATE NEW BLOG', async () => {
        createResponse = await request(app)
            .post('/blogs')
            .send({
                "name": "Nastya",
                "description": "about me",
                "websiteUrl": "http://www.nastyastar.com"
            })
            .set({Authorization : "Basic YWRtaW46cXdlcnR5"})
            .expect(201)
    })

    it ('GET SUCCESSFULLY CREATED BLOG', async  () => {
        const blog = await request(app)
            .get( "/blogs/" + createResponse.body.id)
        expect(blog.body).toEqual({
            "id": expect.any(String),
            "name": "Nastya",
            "description": "about me",
            "websiteUrl": "http://www.nastyastar.com",
            "createdAt" : expect.any(String),
            "isMembership" : false
        })
    })

    it('SUCCESSFULLY CREATE NEW POST BY BLOG ID', async () => {
        await request(app)
            .post('/blogs/' + createResponse.body.id + '/posts')
            .send({
                "title": "Black Sea",
                "shortDescription": "about sea",
                "content": "black sea is hot"
            })
            .set({Authorization : "Basic YWRtaW46cXdlcnR5"})
            .expect(201)
    })

    it ('GET POSTS BY BLOG ID WITH PAGINATION', async  () => {
       const posts = await request(app)
           .get('/blogs/' + createResponse.body.id + '/posts')
        expect(posts.body).toEqual( {
            pagesCount: 1,
            page: 1,
            pageSize: 10,
            totalCount: 1,
            items: [
                {
                    "title": "Black Sea",
                    "shortDescription": "about sea",
                    "content": "black sea is hot",
                    "createdAt" : expect.any(String),
                    "blogId" : createResponse.body.id,
                    "blogName" : createResponse.body.name,
                    "id" : expect.any(String)
                }
            ]
        })


    })

    //DELETE ALL DATA
    afterAll(async () => {
        await request(app)
            .delete('/testing/all-data')

    })

})
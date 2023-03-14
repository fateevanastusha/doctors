import request from "supertest";
import {app} from "../../app";

describe('test', () => {
    const {blog} = expect.getState()
    //DELETE ALL DATA

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')

    })

    //CHECK FOR EMPTY POST DATA BASE

    it ('GET EMPTY POST DATA BASE', async  () => {
        const res = await request(app).get('/posts')
        expect(res.body).toEqual({
            pagesCount: 0,
            page: 1,
            pageSize: 10,
            totalCount: 0,
            items: []
        })
    })

    let blogId : any = null

    it ('SUCCESSFULLY CREATE NEW BLOG', async () => {
        blogId = await request(app)
            .post('/blogs')
            .send({
                "name": "Nastya",
                "description": "about me",
                "websiteUrl": "http://www.nastyastar.com"
            })
            .set({Authorization: "Basic YWRtaW46cXdlcnR5"})
        expect(blogId.body).toStrictEqual({
            "id": expect.any(String),
            "name": "Nastya",
            "description": "about me",
            "websiteUrl": "http://www.nastyastar.com",
            "createdAt" : expect.any(String),
            "isMembership" : false
        })
    })
    console.log(blogId)

    //UNSUCCESSFULLY CREATE NEW POST WITH NO AUTH

    it ('UNSUCCESSFULLY CREATE NEW POST WITH NO AUTH', async () => {
        await request(app)
            .post('/posts')
            .send({
                "title": "string",
                "shortDescription": "string",
                "content": "string",
                "blogId": ""
            })
            .expect(401)
    })

    //UNSUCCESSFULLY CREATE NEW POST WITH BAD DATA

    it ('UNSUCCESSFULLY CREATE NEW POST WITH BAD DATA', async () => {
       await request(app)
            .post('/posts')
            .send({
                "title": "",
                "shortDescription": "",
                "content": "",
                "blogId": ""
            })
            .set({Authorization : "Basic YWRtaW46cXdlcnR5"})
            .expect(400)
    })

    //SUCCESSFULLY CREATE NEW POST

    let createResponsePost : any = null
    it ('SUCCESSFULLY CREATE NEW POST', async () => {
        createResponsePost = await request(app)
            .post('/posts')
            .send({
                "title": "string",
                "shortDescription": "string",
                "content": "string",
                "blogId": blogId.body.id
            })
            .set({Authorization : "Basic YWRtaW46cXdlcnR5"})
            .expect(201)
    })

    //CHECK FOR CREATED POST

    //SUCCESSFULLY UPDATE CREATED POST

    //GET NOT EXISTING POST

    //UNSUCCESSFULLY DELETE POST WITH NO AUTH

    //SUCCESSFULLY DELETE POST

    //DELETE NOT EXISTING POST

    //DELETE ALL DATA

    afterAll(async () => {
        await request(app)
            .delete('/testing/all-data')

    })

})
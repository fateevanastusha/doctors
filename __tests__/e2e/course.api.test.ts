import request from "supertest";
import {app} from "../../src";
import exp from "constants";
import {Pagination} from "../../src/helpers/pagination";



describe('/course', () => {

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
            .send({Authorization : "Basic YWRtaW46cXdlcnR5"})

    })

    it ('should return 200 and empty array', async  () => {
        await request(app)
            .get('/posts')
            .expect(200 )
    })

    it('should return 404 for not existing blog', async () => {
        await request(app)
            .get('/posts/5454524')
            .expect(404)
    })
    let createdBlog
    it('should create course with correct input data', async () => {
        const createResponse = await request(app)
            .post('/blogs')
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send({
                "name": "lalalla",
                "description": "dassdasda",
                "websiteUrl": "https://www.google.com"
            })
            .expect(201)
        createdBlog = createResponse.body
        expect(createdBlog).toEqual({
            id: expect.any(String),
            "name": "lalalla",
            "description": "dassdasda",
            "websiteUrl": "https://www.google.com",
            createdAt: expect.any(String),
            isMembership: false

        })
    })

})
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const tests_functions_1 = require("../tests-utils/tests-functions");
const test_string_1 = require("../tests-utils/test-string");
describe('posts', () => {
    //DELETE ALL DATA
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/testing/all-data')
            .expect(204);
    }));
    //CHECK FOR EMPTY POST DATA BASE
    it('GET EMPTY POST DATA BASE', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/posts');
        expect(res.body).toEqual({
            pagesCount: 0,
            page: 1,
            pageSize: 10,
            totalCount: 0,
            items: []
        });
    }));
    let blogId = null;
    it('SUCCESSFULLY CREATE NEW BLOG', () => __awaiter(void 0, void 0, void 0, function* () {
        blogId = yield (0, supertest_1.default)(app_1.app)
            .post('/blogs')
            .send({
            "name": "Nastya",
            "description": "about me",
            "websiteUrl": "http://www.nastyastar.com"
        })
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" });
        expect(blogId.body).toStrictEqual({
            "id": expect.any(String),
            "name": "Nastya",
            "description": "about me",
            "websiteUrl": "http://www.nastyastar.com",
            "createdAt": expect.any(String),
            "isMembership": false
        });
    }));
    //UNSUCCESSFULLY CREATE NEW POST WITH NO AUTH
    it('UNSUCCESSFULLY CREATE NEW POST WITH NO AUTH', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/posts')
            .send({
            "title": "string",
            "shortDescription": "string",
            "content": "string",
            "blogId": blogId.body.id
        })
            .expect(401);
    }));
    //UNSUCCESSFULLY CREATE NEW POST WITH BAD DATA
    it('UNSUCCESSFULLY CREATE NEW POST WITH BAD DATA', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/posts')
            .send({
            "title": "",
            "shortDescription": "",
            "content": "",
            "blogId": ""
        })
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(400);
    }));
    //UNSUCCESSFULLY CREATE NEW POST WITH WRONG DATA
    it('UNSUCCESSFULLY CREATE NEW POST WITH WRONG DATA', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/posts')
            .send({
            "title": "",
            "shortDescription": "",
            "content": "string",
            "blogId": blogId.body.id
        })
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(400);
    }));
    //SUCCESSFULLY CREATE NEW POST
    let createResponsePost = null;
    it('SUCCESSFULLY CREATE NEW POST', () => __awaiter(void 0, void 0, void 0, function* () {
        createResponsePost = yield (0, supertest_1.default)(app_1.app)
            .post('/posts')
            .send({
            "title": "string",
            "shortDescription": "string",
            "content": "string",
            "blogId": blogId.body.id
        })
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(201);
    }));
    //CHECK FOR CREATED POST
    it('SUCCESSFULLY GET CREATED POST', () => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield (0, supertest_1.default)(app_1.app)
            .get('/posts/' + createResponsePost.body.id);
        expect(post).toEqual({
            "title": "string",
            "shortDescription": "string",
            "content": "string",
            "blogId": blogId.body.id,
            "blogName": blogId.body.name,
            "createdAt": expect.any(String)
        });
    }));
    //SUCCESSFULLY UPDATE CREATED POST
    it('SUCCESSFULLY UPDATE CREATED POST', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put('/posts/' + createResponsePost.body.id)
            .send({
            "title": "updated string",
            "shortDescription": "updated string",
            "content": "updated string"
        })
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(204);
    }));
    //CHECK FOR UPDATED POST
    it('SUCCESSFULLY GET UPDATED POST', () => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield (0, supertest_1.default)(app_1.app)
            .get('/posts/' + createResponsePost.body.id);
        expect(post).toEqual({
            "id": expect.any(String),
            "title": "updated string",
            "shortDescription": "updated string",
            "content": "updated string",
            "blogId": blogId.body.id,
            "blogName": blogId.body.name,
            "createdAt": expect.any(String)
        });
    }));
    //GET NOT EXISTING POST
    it('UNSUCCESSFULLY GET NOT EXISTING POST', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get('/posts/notexistingid')
            .expect(404);
    }));
    //UNSUCCESSFULLY DELETE POST WITH NO AUTH
    it('UNSUCCESSFULLY DELETE POST WITH NO AUTH', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/posts/' + createResponsePost.body.id)
            .expect(401);
    }));
    //SUCCESSFULLY DELETE POST
    it('SUCCESSFULLY DELETE POST', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/posts/' + createResponsePost.body.id)
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(204);
    }));
    //DELETE NOT EXISTING POST
    it('UNSUCCESSFULLY DELETE NOT EXISTING POST', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/posts/notexistingid')
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(404);
    }));
    //SUCCESSFULLY CREATE 5 POSTS
    it("SUCCESSFULLY CREATE 5 POSTS", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, tests_functions_1.postCreator)(undefined, blogId.body.id, test_string_1.postFilterString01);
        yield (0, tests_functions_1.postCreator)(undefined, blogId.body.id, test_string_1.postFilterString02);
        yield (0, tests_functions_1.postCreator)(undefined, blogId.body.id, test_string_1.postFilterString03);
        yield (0, tests_functions_1.postCreator)(undefined, blogId.body.id, test_string_1.postFilterString04);
        const lastPostResponse = yield (0, tests_functions_1.blogCreator)(undefined, blogId.body.id, test_string_1.postFilterString05);
        expect(lastPostResponse.status).toBe(201);
    }));
    //CHECK FOR 5 CREATED POSTS WITH PAGINATION AND SORT BY TITLE
    it("CHECK POSTS FOR PAGINATION WITH SORT BY NAME", () => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield (0, supertest_1.default)(app_1.app)
            .get("/posts?sortBy=title&sortDirection=asc&pageSize=3&pageNumber=1");
        expect(post.body).toStrictEqual({
            pagesCount: 2,
            page: 1,
            pageSize: 3,
            totalCount: 5,
            items: [
                {
                    "id": expect.any(String),
                    "title": "Anastasia",
                    "shortDescription": "Test description",
                    "content": "Test content",
                    "blogId": blogId.body.id,
                    "blogName": blogId.body.name,
                    "createdAt": expect.any(String)
                },
                {
                    "id": expect.any(String),
                    "title": "Banastasia",
                    "shortDescription": "Test description",
                    "content": "Test content",
                    "blogId": blogId.body.id,
                    "blogName": blogId.body.name,
                    "createdAt": expect.any(String)
                },
                {
                    "id": expect.any(String),
                    "title": "Cbanastasia",
                    "shortDescription": "Test description",
                    "content": "Test content",
                    "blogId": blogId.body.id,
                    "blogName": blogId.body.name,
                    "createdAt": expect.any(String)
                },
            ]
        });
    }));
    //DELETE ALL DATA
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/testing/all-data')
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(204);
    }));
});

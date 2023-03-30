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
const app_1 = require("../../app");
const tests_functions_1 = require("../../tests-utils/tests-functions");
const test_string_1 = require("../../tests-utils/test-string");
const db_1 = require("../../db/db");
//TEST BLOGS
describe('blogs', () => {
    //DELETE ALL DATA
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("deleting");
        yield (0, db_1.runDb)();
        yield (0, supertest_1.default)(app_1.app)
            .delete('/testing/all-data');
        console.log("deleting");
    }));
    //CHECK FOR EMPTY BLOG DATA BASE
    it('GET EMPTY BLOG DATA BASE', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/blogs');
        expect(res.body).toStrictEqual({
            pagesCount: 0,
            page: 1,
            pageSize: 10,
            totalCount: 0,
            items: []
        });
    }));
    let createResponseBlog = null;
    //CREATE NEW BLOG
    it('SUCCESSFULLY CREATE NEW BLOG', () => __awaiter(void 0, void 0, void 0, function* () {
        createResponseBlog = yield (0, supertest_1.default)(app_1.app)
            .post('/blogs')
            .send({
            "name": "Nastya",
            "description": "about me",
            "websiteUrl": "http://www.nastyastar.com"
        })
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(201);
    }));
    //GET CREATED BLOG
    it('GET SUCCESSFULLY CREATED BLOG', () => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield (0, supertest_1.default)(app_1.app)
            .get("/blogs/" + createResponseBlog.body.id);
        expect(blog.body).toStrictEqual({
            "id": expect.any(String),
            "name": "Nastya",
            "description": "about me",
            "websiteUrl": "http://www.nastyastar.com",
            "createdAt": expect.any(String),
            "isMembership": false
        });
    }));
    //PUT CREATED BLOG
    it('SUCCESSFULLY UPDATE CREATED BLOG', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (0, supertest_1.default)(app_1.app)
            .put("/blogs/" + createResponseBlog.body.id)
            .send({
            name: "Not Nastya",
            description: "Not about me",
            websiteUrl: "http://www.nastyakoshka.com",
        })
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" });
        expect(res).toBe(0);
    }));
    //CHECK FOR UPDATED BLOG
    it('SUCCESSFULLY UPDATED BLOG', () => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield (0, supertest_1.default)(app_1.app)
            .get("/blogs/" + createResponseBlog.body.id);
        expect(blog.body).toStrictEqual({
            "id": expect.any(String),
            "name": "Not Nastya",
            "description": "Not about me",
            "websiteUrl": "http://www.nastyakoshka.com",
            "createdAt": expect.any(String),
            "isMembership": false
        });
    }));
    //CREATE NEW POST
    it('SUCCESSFULLY CREATE NEW POST BY BLOG ID', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/blogs/' + createResponseBlog.body.id + '/posts')
            .send({
            "title": "Black Sea",
            "shortDescription": "about sea",
            "content": "black sea is hot"
        })
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(201);
    }));
    //GET POSTS WITH PAGINATION
    it('GET POSTS BY BLOG ID WITH PAGINATION', () => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield (0, supertest_1.default)(app_1.app)
            .get('/blogs/' + createResponseBlog.body.id + '/posts');
        expect(posts.body).toStrictEqual({
            pagesCount: 1,
            page: 1,
            pageSize: 10,
            totalCount: 1,
            items: [
                {
                    "title": "Black Sea",
                    "shortDescription": "about sea",
                    "content": "black sea is hot",
                    "createdAt": expect.any(String),
                    "blogId": createResponseBlog.body.id,
                    "blogName": "Not Nastya",
                    "id": expect.any(String)
                }
            ]
        });
    }));
    //DELETE CREATED BLOG WITH NO AUTH
    it('UNSUCCESSFULLY DELETE CREATED BLOG', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete("/blogs/" + createResponseBlog.body.id)
            .expect(401);
    }));
    //DELETE NOT EXISTING BLOG
    it('UNSUCCESSFULLY DELETE NOT EXISTING BLOG', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete("/blogs/gslgl1323gd")
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(404);
    }));
    //SUCCESSFULLY DELETE CREATED BLOG
    it('SUCCESSFULLY DELETE CREATED BLOG', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete("/blogs/" + createResponseBlog.body.id)
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(204);
    }));
    //CREATE 5 NEW BLOGS
    it("SUCCESSFULLY CREATE 5 BLOGS", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, tests_functions_1.blogCreator)(undefined, test_string_1.blogFilterString01);
        yield (0, tests_functions_1.blogCreator)(undefined, test_string_1.blogFilterString02);
        yield (0, tests_functions_1.blogCreator)(undefined, test_string_1.blogFilterString03);
        yield (0, tests_functions_1.blogCreator)(undefined, test_string_1.blogFilterString04);
        const lastBlogResponse = yield (0, tests_functions_1.blogCreator)(undefined, test_string_1.blogFilterString05);
        expect(lastBlogResponse.status).toBe(201);
    }));
    //CHECK BLOGS WITH SEARCH NAME TERM
    it("CHECK BLOGS FOR PAGINATION WITH SEARCH NAME TERM", () => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield (0, supertest_1.default)(app_1.app)
            .get("/blogs?searchNameTerm=Citronner");
        expect(blog.body.items[0].name).toEqual("Citronner");
    }));
    //CHECK BLOGS WITH SORT BY NAME
    it("CHECK BLOGS FOR PAGINATION WITH SORT BY NAME", () => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield (0, supertest_1.default)(app_1.app)
            .get("/blogs?sortBy=name&sortDirection=asc&pageSize=5&searchNameTerm=ana");
        expect(blog.body).toStrictEqual({
            pagesCount: 1,
            page: 1,
            pageSize: 5,
            totalCount: 3,
            items: [
                {
                    "id": expect.any(String),
                    "name": "Ananas",
                    "description": expect.any(String),
                    "websiteUrl": expect.any(String),
                    "createdAt": expect.any(String),
                    "isMembership": false
                },
                {
                    "id": expect.any(String),
                    "name": "Banana",
                    "description": expect.any(String),
                    "websiteUrl": expect.any(String),
                    "createdAt": expect.any(String),
                    "isMembership": false
                },
                {
                    "id": expect.any(String),
                    "name": "Danam",
                    "description": expect.any(String),
                    "websiteUrl": expect.any(String),
                    "createdAt": expect.any(String),
                    "isMembership": false
                }
            ]
        });
    }));
});

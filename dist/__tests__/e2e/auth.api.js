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
const imap_service_1 = require("./imap.service");
const nodemailerMock = require('nodemailer-mock');
const MailParser = require('mailparser').MailParser;
describe('auth', () => {
    //DELETE ALL DATA
    jest.setTimeout(3 * 60 * 1000);
    const imapService = new imap_service_1.MailBoxImap();
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/testing/all-data')
            .expect(204);
        yield imapService.connectToMail();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield imapService.disconnect();
    }));
    //SUCCESSFULLY CREATE USER
    let createResponseUser = null;
    it('SUCCESSFULLY CREATE NEW USER', () => __awaiter(void 0, void 0, void 0, function* () {
        createResponseUser = yield (0, supertest_1.default)(app_1.app)
            .post('/users')
            .send({
            login: "nastya",
            password: "qwerty",
            email: "anastasiafateeva2406@gmail.com"
        })
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(201);
    }));
    //CHECK FOR CREATED USER
    it('SUCCESSFULLY CHECK FOR CREATED NEW USER WITH PAGINATION', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield (0, supertest_1.default)(app_1.app)
            .get('/users')
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" });
        expect(users.body).toStrictEqual({
            pagesCount: 1,
            page: 1,
            pageSize: 10,
            totalCount: 1,
            items: [
                {
                    id: createResponseUser.body.id,
                    login: "nastya",
                    email: "anastasiafateeva2406@gmail.com",
                    createdAt: expect.any(String),
                    isConfirmed: true,
                    confirmedCode: null
                }
            ]
        });
    }));
    //UNSUCCESSFULLY AUTH WITH WRONG PASSWORD
    it('UNSUCCESSFULLY AUTH WITH WRONG PASSWORD', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/auth')
            .send({
            loginOrEmail: "nastya",
            password: "WRONG PASSWORD"
        })
            .expect(404);
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
    let createResponsePost = null;
    it('SUCCESSFULLY CREATE NEW POST', () => __awaiter(void 0, void 0, void 0, function* () {
        createResponsePost = yield (0, supertest_1.default)(app_1.app)
            .post('/posts')
            .send({
            "title": "string",
            "shortDescription": "string",
            "content": "string",
            "blogId": createResponseBlog.body.id
        })
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(201);
    }));
    //CHECK FOR CREATED POST
    it('SUCCESSFULLY GET CREATED POST', () => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield (0, supertest_1.default)(app_1.app)
            .get('/posts/' + createResponsePost.body.id);
        expect(post.body).toStrictEqual({
            "id": createResponsePost.body.id,
            "title": "string",
            "shortDescription": "string",
            "content": "string",
            "blogId": createResponseBlog.body.id,
            "blogName": createResponseBlog.body.name,
            "createdAt": expect.any(String)
        });
    }));
    //SUCCESSFULLY AUTH
    let token = null;
    it('SUCCESSFULLY AUTH', () => __awaiter(void 0, void 0, void 0, function* () {
        token = yield (0, supertest_1.default)(app_1.app)
            .post('/auth/login')
            .send({
            loginOrEmail: "nastya",
            password: "qwerty"
        })
            .expect(200);
    }));
    //GET INFO ABOUT USER
    it('SUCCESSFULLY GET USER INFO WITH JWT TOKEN', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get('/auth/me')
            .send(token.body);
        expect(res.body).toStrictEqual({
            login: "nastya",
            email: "anastasiafateeva2406@gmail.com",
            id: createResponseUser.body.id,
            createdAt: expect.any(String),
        });
    }));
    //UNSUCCESSFULLY CREATE NEW COMMENT WITH WRONG TOKEN
    it('UNSUCCESSFULLY CREATE NEW COMMENT WITH WRONG TOKEN', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/posts' + createResponsePost.body.id + '/comment')
            .send({
            content: 'too little'
        });
    }));
    //SUCCESSFULLY REGISTRATION
    //MOCK FUNCTION JEST
    it('TEST EMAIL SENDING', () => __awaiter(void 0, void 0, void 0, function* () {
        //MAKE REQUEST REGISTRATION
        const resp = yield (0, supertest_1.default)(app_1.app)
            .post('/auth/registration')
            .send({
            login: "nastya1",
            email: "fateevanastushatest@yandex.ru",
            password: "qwerty1"
        });
        //UNSUCCESSFULLY EMAIL RESENDING
        yield (0, supertest_1.default)(app_1.app)
            .post('/auth/registration-email-resending')
            .send({
            email: "notexisting@gmail.com"
        })
            .expect(400);
        //SUCCESSFULLY EMAIL RESENDING
        yield (0, supertest_1.default)(app_1.app)
            .post('/auth/registration-email-resending')
            .send({
            email: "fateevanastushatest@yandex.ru"
        })
            .expect(204);
        const sentMessage = yield imapService.waitNewMessage(1);
        const html = yield imapService.getMessageHtml(sentMessage);
        expect(html).toBeDefined();
        const code = html.split("?code=")[1].split("'")[0];
        //NOT EXISTING CODE - EXPECT 400
        yield (0, supertest_1.default)(app_1.app)
            .post('/auth/registration-confirmation')
            .send({
            "code": "not existing code"
        })
            .expect(400);
        //CORRECT CODE - EXPECT 204 AND CONFIRMED ACCOUNT
        yield (0, supertest_1.default)(app_1.app)
            .post('/auth/registration-confirmation')
            .send({
            "code": code
        })
            .expect(204);
    }));
    //TESTING LOGIN
    it('TEST LOGIN IN SYSTEM', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('auth/login')
            .send({
            loginOrEmail: 'fateevanastushatest@yandex.ru',
            password: 'WRONG PASSWORD'
        })
            .expect(401);
        yield (0, supertest_1.default)(app_1.app)
            .post('auth/login')
            .send({
            loginOrEmail: 'fateevanastushatest@yandex.ru',
            password: 'WRONG PASSWORD'
        })
            .expect(200);
    }));
    //UNSUCCESSFULLY CREATE NEW COMMENT WITHOUT TOKEN
    //UNSUCCESSFULLY CREATE NEW COMMENT WITH WRONG DATA
    //SUCCESSFULLY CREATE NEW COMMENT
    //DELETE ALL DATA
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/testing/all-data')
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(204);
    }));
});

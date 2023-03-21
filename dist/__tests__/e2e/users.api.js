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
describe('users', () => {
    //DELETE ALL DATA
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/testing/all-data');
    }));
    //CHECK FOR EMPTY USERS DATA BASE
    it('GET EMPTY USERS DATA BASE', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/users');
        expect(res.body).toStrictEqual({
            pagesCount: 0,
            page: 1,
            pageSize: 10,
            totalCount: 0,
            items: []
        });
    }));
    //UNSUCCESSFULLY CREATE NEW USER WITH NO AUTH
    it('UNSUCCESSFULLY CREATE NEW USER WITH NO AUTH', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/users')
            .send({
            login: "nastya",
            password: "qwerty",
            email: "anastasiafateeva2406@gmail.com"
        })
            .expect(401);
    }));
    //UNSUCCESSFULLY CREATE NEW USER WITH WRONG DATA
    it('UNSUCCESSFULLY CREATE NEW USER WITH WRONG DATA', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post('/users')
            .send({
            login: "",
            password: "qwerty",
            email: "anastasiafateeva2406@gmail.com"
        })
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(400);
    }));
    //SUCCESSFULLY CREATE NEW USER
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
    //SUCCESSFULLY CHECK FOR CREATED NEW USER WITH PAGINATION
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
                    createdAt: expect.any(String)
                }
            ]
        });
    }));
    //UNSUCCESSFULLY DELETE USER WITH NO AUTH
    it('UNSUCCESSFULLY DELETE USER WITH NO AUTH', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/users/' + createResponseUser.body.id)
            .expect(401);
    }));
    //UNSUCCESSFULLY DELETE NOT EXISTING USER
    it('UNSUCCESSFULLY DELETE NOT EXISTING USER', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/users/notexistingid')
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(404);
    }));
    //SUCCESSFULLY DELETE CREATED USER
    it('SUCCESSFULLY DELETE CREATED USER', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/users/' + createResponseUser.body.id)
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(204);
    }));
    //SUCCESSFULLY CREATE 5 NEW USERS
    it('SUCCESSFULLY CREATE 5 POSTS', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, tests_functions_1.userCreator)(undefined, test_string_1.userFilterString01);
        yield (0, tests_functions_1.userCreator)(undefined, test_string_1.userFilterString02);
        yield (0, tests_functions_1.userCreator)(undefined, test_string_1.userFilterString03);
        yield (0, tests_functions_1.userCreator)(undefined, test_string_1.userFilterString04);
        const lastPostResponse = yield (0, tests_functions_1.userCreator)(undefined, test_string_1.userFilterString05);
        console.log(lastPostResponse.body);
        expect(lastPostResponse.status).toEqual(201);
    }));
    //CHECK CREATED 5 USERS WITH PAGINATION AND SORT BY TITLE
    it('SUCCESSFULLY GET CREATED USERS WITH PAGINATION', () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    //DELETE ALL DATA
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete('/testing/all-data')
            .set({ Authorization: "Basic YWRtaW46cXdlcnR5" })
            .expect(204);
    }));
});

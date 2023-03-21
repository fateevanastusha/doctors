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
exports.userCreator = exports.postCreator = exports.blogCreator = void 0;
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const test_string_1 = require("./test-string");
// Create new blog
const blogCreator = (uri = test_string_1.blogsURI, name = test_string_1.blogNameString, description = test_string_1.blogDescriptionString, websiteUrl = test_string_1.blogWebsiteUrlString, authValue = "Basic YWRtaW46cXdlcnR5") => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
        .post(uri)
        .send({
        uri,
        name,
        description,
        websiteUrl,
    })
        .set({ Authorization: authValue });
});
exports.blogCreator = blogCreator;
const postCreator = (uri = test_string_1.postsURI, blogId, title = test_string_1.postTitleString, shortDescription = test_string_1.postDescriptionString, content = test_string_1.postContentString, authValue = "Basic YWRtaW46cXdlcnR5") => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
        .post(uri)
        .send({
        uri,
        title,
        shortDescription,
        content,
        blogId
    })
        .set({ Authorization: authValue });
});
exports.postCreator = postCreator;
const userCreator = (uri = test_string_1.usersURI, login = test_string_1.userLoginString, email = test_string_1.userEmailString, password = test_string_1.userPasswordString, authValue = "Basic YWRtaW46cXdlcnR5") => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
        .post(uri)
        .send({
        login,
        email,
        password
    })
        .set({ Authorization: authValue });
});
exports.userCreator = userCreator;

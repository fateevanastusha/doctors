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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const users_router_1 = require("./routes/users-router");
const auth_router_1 = require("./routes/auth-router");
const email_router_1 = require("./routes/email-router");
const security_router_1 = require("./routes/security-router");
const posts_db_repositiory_1 = require("./repositories/posts-db-repositiory");
const blogs_db_repositiory_1 = require("./repositories/blogs-db-repositiory");
const users_db_repository_1 = require("./repositories/users-db-repository");
const comments_router_1 = require("./routes/comments-router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const security_db_repository_1 = require("./repositories/security-db-repository");
exports.app = (0, express_1.default)();
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 10000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 429
});
exports.app.use(limiter);
exports.app.use('/blogs', blogs_router_1.blogsRouter);
exports.app.use('/posts', posts_router_1.postsRouter);
exports.app.use('/users', users_router_1.usersRouter);
exports.app.use('/auth', auth_router_1.authRouter);
exports.app.use('/comments', comments_router_1.commentsRouter);
exports.app.use('/email', email_router_1.emailRouter);
exports.app.use('/security', security_router_1.securityRouter);
//TESTING - DELETE ALL DATA
exports.app.delete('/testing/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield posts_db_repositiory_1.postsRepository.deleteAllData();
    yield blogs_db_repositiory_1.blogsRepository.deleteAllData();
    yield users_db_repository_1.usersRepository.deleteAllData();
    yield security_db_repository_1.securityRepository.deleteAllData();
    res.sendStatus(204);
}));

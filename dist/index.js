"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const posts_repositiory_1 = require("./repositories/posts-repositiory");
const blogs_repositiory_1 = require("./repositories/blogs-repositiory");
const app = (0, express_1.default)();
const port = 652;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.use('/blogs', blogs_router_1.blogsRouter);
app.use('/posts', posts_router_1.postsRouter);
//DELETE ALL DATA
app.delete('/testing/all-data', (req, res) => {
    posts_repositiory_1.postsRepository.deleteAllData();
    blogs_repositiory_1.blogsRepository.deleteAllData();
    res.send(204);
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

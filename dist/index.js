"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const posts_db_repositiory_1 = require("./repositories/posts-db-repositiory");
const blogs_db_repositiory_1 = require("./repositories/blogs-db-repositiory");
exports.app = (0, express_1.default)();
const port = 222;
exports.app.use(express_1.default.json());
exports.app.use('/blogs', blogs_router_1.blogsRouter);
exports.app.use('/posts', posts_router_1.postsRouter);
//TESTING - DELETE ALL DATA
exports.app.delete('/testing/all-data', (req, res) => {
    posts_db_repositiory_1.postsRepository.deleteAllData();
    blogs_db_repositiory_1.blogsRepository.deleteAllData();
    res.sendStatus(204);
});
exports.app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

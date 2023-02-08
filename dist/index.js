"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 652;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

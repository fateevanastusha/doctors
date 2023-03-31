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
exports.start = void 0;
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db/db");
const port = 5000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.runDb)();
        app_1.default.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.start = start;
(0, exports.start)();
exports.default = app_1.default;

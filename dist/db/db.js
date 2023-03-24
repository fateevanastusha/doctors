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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDb = exports.refreshTokensCollection = exports.tokenBlackListCollection = exports.commentsCollection = exports.usersCollection = exports.postsCollection = exports.blogsCollection = exports.client = void 0;
const mongodb_1 = require("mongodb");
const mongoUri = process.env.mongoURI || "mongodb+srv://admin:2S50j20AC3UhzPFC@cluster0.leufa1s.mongodb.net/?retryWrites=true&w=majority";
exports.client = new mongodb_1.MongoClient(mongoUri);
const db = exports.client.db("blogs-platform");
exports.blogsCollection = db.collection("blogs");
exports.postsCollection = db.collection("posts");
exports.usersCollection = db.collection("users");
exports.commentsCollection = db.collection("comments");
exports.tokenBlackListCollection = db.collection("refresh-token");
exports.refreshTokensCollection = db.collection("refresh-tokens-meta");
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            yield exports.client.db("blogs-platform").command({ ping: 1 });
            console.log("Connected successfully to mongo server");
        }
        catch (_a) {
            yield exports.client.close();
        }
    });
}
exports.runDb = runDb;

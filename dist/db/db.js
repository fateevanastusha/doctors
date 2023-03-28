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
exports.runDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb://127.0.0.1:27017/test');
    });
}
const mongoUri = process.env.mongoURI || "mongodb+srv://admin:2S50j20AC3UhzPFC@cluster0.leufa1s.mongodb.net/?retryWrites=true&w=majority";
//export const client = new MongoClient(mongoUri);
//const db = client.db ("blogs-platform")
//export const blogsCollection = db.collection<Blog>("blogs");
//export const postsCollection = db.collection<Post>("posts");
//export const usersCollection = db.collection<User>("users");
//export const commentsCollection = db.collection<Comment>("comments");
//export const tokenBlackListCollection = db.collection<RefreshToken>("refresh-token");
//export const refreshTokensCollection = db.collection<RefreshTokensMeta>("refresh-tokens-meta")
//export const attemptsCollection = db.collection<Attempts>("attempts")
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(mongoUri + '/' + "blogs-platform");
            console.log("Connected successfully to mongo server");
        }
        catch (_a) {
            yield mongoose_1.default.disconnect();
        }
    });
}
exports.runDb = runDb;

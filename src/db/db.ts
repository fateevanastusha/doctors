import {MongoClient} from "mongodb";
import {Blog, Post, User, Comment, RefreshToken, RefreshTokensMeta, Attempts} from "../types/types";

import mongoose from "mongoose";

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
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

export async function runDb() {
    try {
        await mongoose.connect(mongoUri + '/' + "blogs-platform");
        console.log("Connected successfully to mongo server");
    } catch {
        await mongoose.disconnect();
    }
}

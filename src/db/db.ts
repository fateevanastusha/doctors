import {MongoClient} from "mongodb";

import {Blog,Post} from "../types/types";


const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoUri);
const db = client.db ("shop")
export const blogsCollection = db.collection<Blog>("blogs");
export const postsCollection = db.collection<Post>("posts");

export async function runDb() {
    try{
        await client.connect();
        await client.db("products").command({ping: 1});
        console.log("Connected succefully to mongo server");
    } catch {
        await client.close()
    }
}

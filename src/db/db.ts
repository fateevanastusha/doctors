import {MongoClient} from "mongodb";

import {Blog,Post} from "../types/types";


const mongoUri = process.env.mongoURI || "mongodb+srv://admin:2S50j20AC3UhzPFC@cluster0.leufa1s.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(mongoUri);
const db = client.db ("blogs-platform")
export const blogsCollection = db.collection<Blog>("blogs");
export const postsCollection = db.collection<Post>("posts");

export async function runDb() {
    try{
        await client.connect();
        await client.db("blogs-platform").command({ping: 1});
        console.log("Connected succefully to mongo server");
    } catch {
        await client.close()
    }
}

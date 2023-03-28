import mongoose from "mongoose";
import {
    Attempts,
    Blog,
    Comment,
    Post,
    RefreshToken,
    RefreshTokensMeta,
    User
} from "./types";

export const blogSchema = new mongoose.Schema<Blog>({
    id: String,
    name: String,
    description: String,
    websiteUrl: String,
    createdAt : String,
    isMembership : Boolean
})
export const postSchema = new mongoose.Schema<Post>({
    id: String,
    title: String,
    shortDescription: String,
    content: String,
    blogId: String,
    blogName: String,
    createdAt: String
})
export const commentSchema = new mongoose.Schema<Comment>({
    id : String,
    content : String,
    commentatorInfo : {
        userId: String,
        userLogin: String
    },
    createdAt: String,
    postId : String
})
export const refreshTokenSchema = new mongoose.Schema<RefreshToken>({
    refreshToken : String
})

export const refreshTokensMetaSchema  = new mongoose.Schema<RefreshTokensMeta>({
    userId : String,
    ip: String,
    title: String,
    lastActiveDate: String,
    deviceId: String
})
export const attemptsSchema = new mongoose.Schema<Attempts>({
    userIP: String,
    url: String,
    time: Date
})
export const userSchema = new mongoose.Schema<User>( {
    id: {type : String, required : true},
    login : String,
    email : String,
    password: String,
    createdAt: String,
    isConfirmed: Boolean,
    confirmedCode : {type : String }
});


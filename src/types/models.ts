import mongoose from "mongoose";
import {
    attemptsSchema,
    blogSchema,
    commentSchema,
    postSchema,
    refreshTokenSchema,
    refreshTokensMetaSchema,
    userSchema
} from "./schemas";


export const BlogModel = mongoose.model('blogs', blogSchema)
export const PostModel = mongoose.model('posts', postSchema)
export const UserModel = mongoose.model('users', userSchema)
export const CommentModel = mongoose.model('comments', commentSchema)
export const RefreshTokenBlackListModel = mongoose.model('refresh token black list', refreshTokenSchema)
export const RefreshTokensMetaModel = mongoose.model('refresh token meta', refreshTokensMetaSchema)
export const AttemptsModel = mongoose.model('attempts', attemptsSchema)

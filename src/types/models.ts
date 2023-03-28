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


export const BlogModel = mongoose.model('users', blogSchema)
export const PostModel = mongoose.model('users', postSchema)
export const UserModel = mongoose.model('users', userSchema)
export const CommentModel = mongoose.model('users', commentSchema)
export const RefreshTokenBlackListModel = mongoose.model('users', refreshTokenSchema)
export const RefreshTokensMetaModel = mongoose.model('users', refreshTokensMetaSchema)
export const AttemptsModel = mongoose.model('users', attemptsSchema)

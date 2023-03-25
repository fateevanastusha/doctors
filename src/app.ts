import express, {Request, Response, NextFunction} from 'express'
import { blogsRouter } from './routes/blogs-router';
import { postsRouter } from './routes/posts-router';
import { usersRouter } from "./routes/users-router";
import { authRouter } from "./routes/auth-router";
import { emailRouter } from "./routes/email-router";
import {securityRouter} from "./routes/security-router";
import { postsRepository } from './repositories/posts-db-repositiory';
import { blogsRepository } from './repositories/blogs-db-repositiory';
import { usersRepository } from "./repositories/users-db-repository";
import {commentsRouter} from "./routes/comments-router";
import cookieParser from "cookie-parser"
import {securityRepository} from "./repositories/security-db-repository";
export const app = express();

app.use(express.json())
app.use(cookieParser())

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/comments', commentsRouter)
app.use('/email', emailRouter)
app.use('/security', securityRouter)

//TESTING - DELETE ALL DATA

app.delete('/testing/all-data', async (req: Request,res: Response) => {
    await postsRepository.deleteAllData();
    await blogsRepository.deleteAllData();
    await usersRepository.deleteAllData();
    await securityRepository.deleteAllData();
    res.sendStatus(204)
});
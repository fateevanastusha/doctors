import express, {Request, Response, NextFunction} from 'express'
import { blogsRouter } from './routes/blogs-router';
import { postsRouter } from './routes/posts-router';
import { usersRouter } from "./routes/users-router";
import { authRouter } from "./routes/auth-router";
import {emailRouter} from "./routes/email-router";
import { postsRepository } from './repositories/posts-db-repositiory';
import { blogsRepository } from './repositories/blogs-db-repositiory';
import { usersRepository } from "./repositories/users-db-repository";
import {commentsRouter} from "./routes/comments-router";

export const app = express();

app.use(express.json())

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/comments', commentsRouter)
app.use('/email', emailRouter)

//TESTING - DELETE ALL DATA
app.delete('/testing/all-data', async (req: Request,res: Response) => {
    await postsRepository.deleteAllData();
    await blogsRepository.deleteAllData();
    await usersRepository.deleteAllData();
    res.sendStatus(204)
});
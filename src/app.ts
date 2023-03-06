import express, {Request, Response, NextFunction} from 'express'
import { blogsRouter } from './routes/blogs-router';
import { postsRouter } from './routes/posts-router';
import { usersRouter } from "./routes/users-router";
import { authRouter } from "./routes/auth-router";
import { postsRepository } from './repositories/posts-db-repositiory';
import { blogsRepository } from './repositories/blogs-db-repositiory';
import { usersRepository } from "./repositories/users-db-repository";

export const app = express();

app.use(express.json())

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

//TESTING - DELETE ALL DATA
app.delete('/testing/all-data', (req: Request,res: Response) => {
    postsRepository.deleteAllData();
    blogsRepository.deleteAllData();
    usersRepository.deleteAllData();
    res.sendStatus(204)
});
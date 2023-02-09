import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';
import { blogsRouter } from './routes/blogs-router';
import { postsRouter } from './routes/posts-router';
import { postsRepository } from './repositories/posts-repositiory';
import { blogsRepository } from './repositories/blogs-repositiory';

const app = express();
const port = 652;
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

//DELETE ALL DATA
app.delete('/testing/all-data', (req: Request,res: Response) => {
    postsRepository.deleteAllData();
    blogsRepository.deleteAllData();
    res.send(204)
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})


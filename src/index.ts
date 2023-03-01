import express, {Request, Response, NextFunction} from 'express'
import { blogsRouter } from './routes/blogs-router';
import { postsRouter } from './routes/posts-router';
import { postsRepository } from './repositories/posts-db-repositiory';
import { blogsRepository } from './repositories/blogs-db-repositiory';

export const app = express();
const port = 222;



app.use(express.json())

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

//TESTING - DELETE ALL DATA
app.delete('/testing/all-data', (req: Request,res: Response) => {
    postsRepository.deleteAllData();
    blogsRepository.deleteAllData();
    res.sendStatus(204)
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
 
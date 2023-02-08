import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';

const app = express();
const port = 652;
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
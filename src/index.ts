import {app} from "./app";
import {runDb} from "./db/db";

const port = 218;

app.listen(port, () => {
    runDb()
    console.log(`App listening on port ${port}`)
})

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./db/db");
const port = 218;
app_1.app.listen(port, () => {
    (0, db_1.runDb)();
    console.log(`App listening on port ${port}`);
});

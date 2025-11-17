import sqlite3 from "sqlite3";
import fs from "fs";

if (!fs.existsSync("./backend/db.sqlite")) {
    fs.writeFileSync("./backend/db.sqlite", "");
}

const db = new sqlite3.Database("./backend/db.sqlite");

export default db;

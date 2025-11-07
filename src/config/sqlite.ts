import sqlite3 from "sqlite3";

// Connect to database

const db = new sqlite3.Database(process.env.DB_NAME || "my_database.db", (err) => {
    if (err) {
        console.error("Could not connect to database", err);
    }
    else {
        console.log("Connected to SQLite database");
    }
});

export default db;
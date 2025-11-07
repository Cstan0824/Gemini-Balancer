import db from "./sqlite";


// Test connection
function test() {

}


// Create a snapshot from current database state
function snapshot() {
    const sql = ``;
}


// Init Database
function up() {
    const sql = `
    CREATE TABLE IF NOT EXISTS  (
    `;
    db.exec(sql, (err) => {
        if (err) {
            console.error("Error initializing database:", err);
        } else {
            console.log("Database initialized successfully");
        }
    });
}

function down() {
    const sql = ``;

    db.exec(sql, (err) => {
        if (err) {
            console.error("Error rolling back database:", err);
        } else {
            console.log("Database rolled back successfully");
        }
    });
}
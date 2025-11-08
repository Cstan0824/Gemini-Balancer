import db from "./sqlite";


// Test connection
function test() {
    db.get("SELECT 1", (err) => {
        if (err) {
            console.error("Database connection test failed:", err);
        } else {
            console.log("Database connection test succeeded");
        }
    });
}


// Create a snapshot from current database state
function snapshot() {
    //Copy db file to a new file with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const snapshotFile = `snapshot-${timestamp}.db`;
    const sql = `ATTACH DATABASE '${snapshotFile}' AS snapshot; SELECT sql FROM sqlite_master WHERE type='table';`;
    db.exec(sql, (err) => {
        if (err) {
            console.error("Error creating snapshot:", err);
        } else {
            console.log("Snapshot created successfully:", snapshotFile);
        }
    });
}


// Init Database
function up() {
    const sql = `
    CREATE TABLE IF NOT EXISTS  Project (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        secretKey TEXT NOT NULL,
        keyGroupId CHAR(36) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Logging (
        id CHAR(36) PRIMARY KEY,
        status CHAR(10) NOT NULL, -- e.g., 'SUCCESS', 'FAILURE'
        message TEXT,
        keyId CHAR(36),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (keyId) REFERENCES Key(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Key (
        id CHAR(36) PRIMARY KEY,
        keyName VARCHAR(255),
        apiKey TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS KeyGroup (
        id CHAR(36),
        keyId CHAR(36) NOT NULL,
        PRIMARY KEY (id, keyId),
        FOREIGN KEY (keyId) REFERENCES Key(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Function (
        id CHAR(36) PRIMARY KEY,
        functionName VARCHAR(255) NOT NULL,
        description TEXT,
        inputSchema JSON,
        outputSchema JSON,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS ProjectFunctions (
        projectId CHAR(36),
        functionId CHAR(36),
        PRIMARY KEY (projectId, functionId),
        FOREIGN KEY (projectId) REFERENCES Project(id) ON DELETE CASCADE,
        FOREIGN KEY (functionId) REFERENCES Function(id) ON DELETE CASCADE
    );
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
    const sql = `
    DROP TABLE IF EXISTS ProjectFunctions;
    DROP TABLE IF EXISTS Function;
    DROP TABLE IF EXISTS KeyGroup;
    DROP TABLE IF EXISTS Key;
    DROP TABLE IF EXISTS Logging;
    DROP TABLE IF EXISTS Project;
    `;

    // Create a snapshot from current database state before rolling back
    snapshot();

    db.exec(sql, (err) => {
        if (err) {
            console.error("Error rolling back database:", err);
        } else {
            console.log("Database rolled back successfully");
        }
    });
}
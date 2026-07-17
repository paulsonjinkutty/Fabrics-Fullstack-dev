console.log("database.js loaded");

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

pool.on("error", (err) => {
    console.error("Unexpected PostgreSQL pool error:", err);
});

(async () => {
    try {
        await pool.query("SELECT 1");
        console.log("✅ PostgreSQL Connected");
    } catch (err) {
        console.error("❌ Database Connection Failed:", err);
    }
})();

module.exports = pool;
console.log("database.js loaded");

require("dotenv").config();

console.log("DATABASE_URL:");
console.log(process.env.DATABASE_URL);

const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect()
    .then(() => console.log("✅ PostgreSQL Connected"))
    .catch(err => console.error("❌ Database Connection Failed:", err));

module.exports = pool;
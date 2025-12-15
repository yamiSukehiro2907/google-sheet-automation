const {Client} = require('pg');
require('dotenv').config();

const client = new Client({
    host: '127.0.0.1',
    port: 5433,
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'titanic'
});

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to Postgres Database!');
    } catch (err) {
        console.log("Database connection failed: " + err);
    }
}

module.exports = connectDB;
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {connectDB, client} = require("../db/postgresDb.js")

async function runTask5() {
    try {
        await connectDB();
        console.log("🚀 Running Task 5 SQL Reports...\n");

        const viewSql = fs.readFileSync(path.join(__dirname, './views.sql'), 'utf8');
        await client.query(viewSql);
        console.log("✅ View 'v_passenger_manifest' created.\n");


        const querySql = fs.readFileSync(path.join(__dirname, './queries.sql'), 'utf8');
        const queries = querySql.split(';').filter(q => q.trim().length > 0);

        console.log("--- REPORT 1: Survival by Class ---");
        const res1 = await client.query(queries[0]);
        console.table(res1.rows);

        console.log("\n--- REPORT 2: Boarding Cities (JOIN) ---");
        const res2 = await client.query(queries[1]);
        console.table(res2.rows);

        console.log("\n--- REPORT 3: Large Groups (Duplicate Tickets) ---");
        const res3 = await client.query(queries[2]);
        console.table(res3.rows);

    } catch (err) {
        console.error("❌ Error:", err);
    } finally {
        await client.end();
    }
}

runTask5();
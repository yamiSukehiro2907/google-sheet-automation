require('dotenv').config();
const {connectDB, client} = require("../db/postgresDb.js")


async function measurePerformance() {
    try {
        await connectDB();
        console.log("🏎️  PERFORMANCE TEST: Finding 'Braund, Mr. Owen Harris'\n");

        const query = "SELECT * FROM passengers WHERE name = 'Braund, Mr. Owen Harris'";

        await client.query("DROP INDEX IF EXISTS idx_passengers_name");

        // 2. Measure WITHOUT Index
        console.log("🔴 Query WITHOUT Index:");
        const start1 = performance.now();
        // Run 100 times to get noticeable difference on small data
        for (let i = 0; i < 100; i++) await client.query(query);
        const end1 = performance.now();
        const time1 = (end1 - start1).toFixed(2);
        console.log(`   ⏱️  Total Time (100 runs): ${time1} ms`);

        // Show the Plan
        const plan1 = await client.query(`EXPLAIN ANALYZE ${query}`);
        console.log(`   Strategy: ${plan1.rows[0]['QUERY PLAN']}\n`);


        // 3. CREATE INDEX
        console.log("🛠️  Creating Index...");
        await client.query("CREATE INDEX idx_passengers_name ON passengers(name)");

        // 4. Measure WITH Index
        console.log("🟢 Query WITH Index:");
        const start2 = performance.now();
        for (let i = 0; i < 100; i++) await client.query(query);
        const end2 = performance.now();
        const time2 = (end2 - start2).toFixed(2);
        console.log(`   ⏱️  Total Time (100 runs): ${time2} ms`);

        const plan2 = await client.query(`EXPLAIN ANALYZE ${query}`);
        console.log(`   Strategy: ${plan2.rows[0]['QUERY PLAN']}\n`);

        console.log(`🚀 IMPACT: ${(time1 / time2).toFixed(1)}x Faster!`);

    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

measurePerformance();
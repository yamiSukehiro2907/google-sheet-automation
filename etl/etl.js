require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const {connectDB, client} = require('../db/postgresDb');

const CSV_FILE = './titanic.csv';
const BATCH_SIZE = 100;


async function runETL() {
    console.log("Starting ETL Pipeline...");
    try {
        await connectDB();
        console.log("🔌 Connected to Database");

        const rows = [];
        let processed = 0;
        let errors = 0;

        const stream = fs.createReadStream(CSV_FILE).pipe(csv());

        for await (const row of stream) {
            processed++;
            try {
                const passenger = {
                    id: parseInt(row['passengerid']),
                    name: row['name'],
                    sex: row['sex'],
                    // Handle "22.0" string as float, or null if empty
                    age: row['age'] ? parseFloat(row['age']) : null,
                    hometown: row['hometown'],
                    destination: row['destination']
                };

                const ticket = {
                    pclass: parseInt(row['pclass']),
                    fare: row['fare'] ? parseFloat(row['fare']) : null,
                    cabin: row['cabin'],
                    embarked: row['embarked'], // Code like 'S'
                    boarded: row['boarded'],   // City like 'Southampton'
                    ticket_num: row['ticket'],
                    // Handle Survived (0, 1, or null for test data)
                    survived: (row['survived'] !== '' && row['survived'] !== undefined) ? parseInt(row['survived']) : null,
                    lifeboat: row['lifeboat'],
                    body: row['body']
                };

                if (!passenger.id || !passenger.name) {
                    throw new Error(`Missing ID or Name for row ${processed}`);
                }

                await client.query('BEGIN');
                if (ticket.embarked && ticket.boarded) {
                    await client.query(
                        `INSERT INTO ports (code, city_name)
                         VALUES ($1, $2) ON CONFLICT (code) DO NOTHING`,
                        [ticket.embarked, ticket.boarded]
                    );
                }

                await client.query(
                    `INSERT INTO passengers (passenger_id, name, sex, age, hometown, destination)
                     VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (passenger_id) DO
                    UPDATE
                        SET hometown = EXCLUDED.hometown, destination = EXCLUDED.destination`,
                    [passenger.id, passenger.name, passenger.sex, passenger.age, passenger.hometown, passenger.destination]
                );
                await client.query(
                    `INSERT INTO tickets
                     (passenger_id, pclass, fare, cabin, embarked_code, ticket_number, survived, lifeboat, body_number)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                    [passenger.id, ticket.pclass, ticket.fare, ticket.cabin, ticket.embarked, ticket.ticket_num, ticket.survived, ticket.lifeboat, ticket.body]
                );

                await client.query('COMMIT');

            } catch (err) {
                await client.query('ROLLBACK');
                console.log("Error encountered : " + err);
                errors++;
            }

            if (processed % BATCH_SIZE === 0) {
                process.stdout.write(`Processed ${processed} rows...\r`);
            }
        }

        console.log(`\n✅ ETL Complete!`);
        console.log(`📊 Total Rows: ${processed}`);
        console.log(`❌ Errors: ${errors}`);

    } catch (err) {
        console.error("🔥 Fatal Pipeline Error:", err);
    } finally {
        await client.end();
    }
}

runETL();
const {client} = require("../db/postgresDb.js")

async function addRow(req, res) {
    console.log("📨 Payload:", req.body);
    const {passenger_id, name, sex, age, pclass, ticket, fare, embarked, survived} = req.body;

    const cleanInt = (val) => (val === '' || val === undefined || val === null) ? null : parseInt(val);
    const cleanFloat = (val) => (val === '' || val === undefined || val === null) ? null : parseFloat(val);

    const safeSurvived = cleanInt(survived);
    const safeAge = cleanFloat(age);
    const safeFare = cleanFloat(fare);
    const safeClass = cleanInt(pclass);

    if (!passenger_id || !name) {
        return res.status(400).json({status: "error", message: "Missing ID/Name"});
    }

    try {
        await client.query('BEGIN');

        if (embarked) {
            await client.query(
                `INSERT INTO ports (code, city_name) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
                [embarked, 'Unknown Port']
            );
        }

        await client.query(
            `INSERT INTO passengers (passenger_id, name, sex, age)
             VALUES ($1, $2, $3, $4)
                 ON CONFLICT (passenger_id) DO UPDATE SET age = EXCLUDED.age`,
            [passenger_id, name, sex, safeAge]
        );

        await client.query(
            `INSERT INTO tickets (passenger_id, pclass, ticket_number, fare, embarked_code, survived)
             VALUES ($1, $2, $3, $4, $5, $6)
                 ON CONFLICT (ticket_id) DO NOTHING`,
            [passenger_id, safeClass, ticket || 'NEW', safeFare || 0, embarked, safeSurvived]
        );

        await client.query('COMMIT');
        console.log(`✅ Synced: ${name}`);
        res.json({ status: "success", message: "Registered" });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error("❌ Error:", err.message);
        res.status(500).json({ status: "error", message: err.message });
    }
}

module.exports = addRow
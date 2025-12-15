const fs = require('fs');
const csv = require('csv-parser');

let totalRows = 0;
const missingValues = {};
const uniqueValues = {
    'sex': new Set(),
    'pclass': new Set(),
    'embarked': new Set()
};
const sampleData = [];

console.log("🕵️‍♀️ Starting Data Audit on 'titanic.csv'...\n");

fs.createReadStream('titanic.csv')
    .pipe(csv())
    .on('headers', (headers) => {
        headers.forEach(header => {
            missingValues[header] = 0;
        });
        console.log(`✅ Found Columns: ${headers.join(', ')}\n`);
    })
    .on('data', (row) => {
        totalRows++;

        if (totalRows <= 3) {
            sampleData.push(row);
        }

        Object.keys(row).forEach(col => {
            const value = row[col];

            if (!value || value.trim() === '') {
                missingValues[col]++;
            } else {
                if (uniqueValues[col]) {
                    uniqueValues[col].add(value);
                }
            }
        });
    })
    .on('end', () => {
        console.log("📊 DATA AUDIT REPORT");
        console.log("====================");
        console.log(`Total Rows: ${totalRows}`);
        console.log("====================\n");

        console.log("⚠️  MISSING VALUES:");
        console.table(
            Object.entries(missingValues)
                .filter(([key, count]) => count > 0)
                .reduce((acc, [key, count]) => {
                    acc[key] = {
                        'Missing Count': count,
                        'Percent': ((count / totalRows) * 100).toFixed(1) + '%'
                    };
                    return acc;
                }, {})
        );

        console.log("\n🔍 UNIQUE VALUES (Categorical):");
        Object.keys(uniqueValues).forEach(key => {
            console.log(` - ${key}: [${Array.from(uniqueValues[key]).join(', ')}]`);
        });

        console.log("\n📝 SAMPLE DATA (First 3 Rows):");
        console.log(sampleData);

        console.log("\n✅ Audit Complete.");
    });
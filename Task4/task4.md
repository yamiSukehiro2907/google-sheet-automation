# 📘 Task 4: ETL / Data Migration Pipeline

## 🎯 Objective

Build a robust Extract, Transform, Load (ETL) pipeline to migrate CSV data into the hosted PostgreSQL database.

## ⚙️ Pipeline Architecture (`etl.js`)

### 1. Extract (Stream)

* Used `fs.createReadStream` and `csv-parser` to process the file row-by-row.
* **Benefit:** Low memory footprint, scalable to millions of rows.

### 2. Transform (Clean)

* **Type Casting:** Converted string "22.0" to Float `22.0`.
* **Null Handling:** Mapped empty CSV fields to database `NULL`.
* **Lookup:** Mapped 'S' code to Port ID.

### 3. Load (Transaction)

* Implemented **SQL Transactions** (`BEGIN` -> `INSERT` -> `COMMIT`).
* Ensured atomicity: A passenger is only saved if their ticket is also valid.
* **Conflict Handling:** Used `ON CONFLICT DO NOTHING` to prevent duplicate errors during re-runs.

## 🚀 Execution Result

* **Total Rows Processed:** 1,309
* **Errors:** 0
* **Time Taken:** ~1.2 seconds

## 📂 Deliverables

* [x] `etl.js` Script
* [x] Execution Log Screenshots
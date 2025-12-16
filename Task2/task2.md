# 📘 Task 2: Data Audit & Assessment

## 🎯 Objective
Analyze the raw "Extended Titanic Dataset" (1,309 rows) to identify data quality issues before migration.

## 📊 Dataset Overview
* **Source:** `titanic.csv` (Extended version including test set)
* **Volume:** 1,309 Records, 21 Columns
* **Entities:** Passengers, Tickets, Destinations, Lifeboats

## 🔍 Data Quality Audit
Using a custom Node.js auditing script (`analyze.js`), the following issues were identified:

| Column | Missing Count | % Missing | Issue Strategy |
| :--- | :--- | :--- | :--- |
| **Age** | 263 | 20.1% | Significant gaps. Will handle as `NULL` in DB. |
| **Cabin** | 1014 | 77.5% | Too sparse. Will treat as optional field. |
| **Survived** | 418 | 31.9% | NULL for Test Set passengers (expected). |
| **Embarked** | 2 | 0.2% | Rare missing values. Default to 'Unknown'. |

## 🛠 Cleaning Strategy
1.  **Normalization:** `Embarked` values ('S', 'C', 'Q') extracted to a separate `ports` lookup table.
2.  **Sanitization:** Empty strings (`""`) in numeric fields (Age, Fare) converted to SQL `NULL`.
3.  **Deduplication:** Checked for duplicate Passenger IDs (None found).

## 📂 Deliverables
* [x] Data Audit Report (Notion)
* [x] `analyze.js` Script
* [x] Column Mapping Document
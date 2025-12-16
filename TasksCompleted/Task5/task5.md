# 📘 Task 5: SQL Development & Optimization

## 🎯 Objective
Develop complex analytical queries and optimize database performance using indexes.

## 📊 SQL Reports Developed
1.  **Survival Analysis:** Calculated survival rates grouped by Passenger Class (1st Class had highest survival).
2.  **Boarding Manifest:** `JOIN` query connecting Passengers, Tickets, and Ports.
3.  **Group Detection:** Identified families by grouping tickets with count > 2.

## ⚡ Performance Optimization
* **Scenario:** High-frequency API lookup by `name`.
* **Baseline:** Sequential Scan cost ~39.34.
* **Optimization:** Created B-Tree Index:
    ```sql
    CREATE INDEX idx_passengers_name ON passengers(name);
    ```
* **Result:** Index Scan cost ~8.29.
* **Impact:** Query is **~5x more efficient**.

## 📂 Deliverables
* [x] `queries.sql`
* [x] `optimize.js` Benchmark Script
* [x] `EXPLAIN ANALYZE` Screenshots
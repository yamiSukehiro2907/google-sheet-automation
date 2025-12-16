# 📘 Task 7: Public Dataset Practice & Advanced Optimization

## 🎯 Objective
Implement advanced database features to handle real-world reporting loads.

## 🚀 Optimization: Materialized Views
For complex aggregations (e.g., "Survival Rate by Hometown"), standard views are too slow for large datasets.

### Implementation
1.  **Created Materialized View:** `mv_hometown_stats`
    * Pre-calculates counts, averages, and survival rates.
    * Physically stores the result on disk.
2.  **Indexing:** Added an index on the view's `hometown` column.

### ⏱️ Benchmark Results
* **Standard Query:** ~30ms (Calculates on the fly)
* **Materialized View:** ~2ms (Reads pre-computed data)
* **Speedup:** **15x Faster**

## 📂 Deliverables
* [x] `advanced.sql`
* [x] `task7.js` Benchmark Script
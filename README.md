### 🚢 Titanic Data Engineering Pipeline

**Deployment:** Google Cloud Platform (GCE) + Docker

---

#### 📖 Project Overview

This project is an end-to-end **Data Engineering solution** that migrates a legacy CSV/Google Sheets
workflow into a modern, high-performance cloud infrastructure.

It solves the challenge of **"messy, static data"** by implementing:

1. **Robust ETL Pipelines** to ingest and clean data automatically.
2. **Normalized Database Architecture (3NF)** for data integrity.
3. **Real-Time Automation** using Google Apps Script & Webhooks.
4. **Advanced Optimization** using Materialized Views and Indexing.

### 🏗 Architecture
**Workflow:** `Google Sheets (User Entry)` ➔ `Apps Script (Validation)` ➔ `Node.js API (Middleware)` ➔
`PostgreSQL (Data Warehouse)`

---

## 🛠 Tech Stack* 
**Cloud Infrastructure:** Google Compute Engine (e2-micro, Ubuntu 22.04)

* **Database:** PostgreSQL 15 (Containerized via Docker)
* **Backend API:** Node.js (Express.js)
* **ETL Engine:** Node.js Streams (csv-parser)
* **Frontend Automation:** Google Apps Script
* **DevOps:** Docker Compose

---

## 🚀 Quick Start (Local Development)
### Prerequisites
* Docker & Docker Compose installed.

* Node.js (v18+) installed.

###
1. Clone & Setup
```bash
git clone https://github.com/yamiSukehiro2907/titanic-data-engineering.git
cd titanic-data-engineering
npm install

```

### 2. Launch Database (Docker)
```bash
# Spins up PostgreSQL on port 5432
docker-compose up -d

```

###
3. Initialize Schema & Seed Data
```bash

# Creates Tables (Passengers, Tickets, Ports) and Seeds Static Data
node etl/setup_db.js

```

###
Run ETL Pipeline
```bash
# Migrates 1,309 rows from CSV to DB
node etl/etl.js

```

###5. Start Webhook Server
```bash
node server.js

```

---

## 📂 Project Structure
```text
/titanic-data-engineering
├── 📂 sql
│   ├── schema.sql         # Database DDL (3NF Design)
│   ├── seed.sql           # Static Reference Data
│   ├── queries.sql        # Analytical Queries
│   └── advanced.sql       # Materialized Views
├── 📂 etl
│   └── etl.js             # Main ETL Pipeline Script
├── 📂 docs                # Task-specific Documentation
├── analyze.js             # Data Audit Tool
├── optimize.js            # Index Performance Benchmark
├── server.js              # Webhook API Server
├── docker-compose.yml     # Infrastructure Config
└── Code.gs                # Google Apps Script Source

```

---

## 📘 Module Breakdown
### 🔹 Module 1: 
Database Design (Task 3)
We moved away from a flat CSV structure to a 
**Normalized (3NF)** schema to reduce redundancy.

* **`passengers`**: Stores identity (Name, Age, Hometown).
* **`tickets`**: Stores voyage data (Class, Fare, Survival).
* **`ports`**: Lookup table for Embarkation codes (S, C, Q).

###🔹 Module 2: ETL Pipeline (Tasks 2 & 4)* **Audit:** Identified 20% missing Age values and 77% missing Cabin values.

* **Transformation:**  Sanitized empty strings to `NULL`.
* Mapped text-based "Embakred" codes to Foreign Keys.


* **Performance:** Loads 1,300+ records in <1.5 seconds using streams.

### 🔹 Module 3: Automation & Webhooks (Task 6)
Integrates Google Sheets with the Database.

* **Trigger:** Users enter data in Sheets -> Click "Sync New Rows".
* **Validation:** Apps Script checks for missing IDs before sending.
* **Feedback:** Rows turn **Green (Success)** or **Red (Failed)** based on the API response.

### 🔹 Module 4: Optimization(Tasks 5 & 7) 
Proving performance at scale.

1. **Indexing:** Created B-Tree index on `name`. Reduced query cost by **5x**.
2. **Materialized Views:** Created `mv_hometown_stats` for complex aggregation.

* *Raw Query Time:* ~30ms
* *View Query Time:* ~2ms (**15x Speedup**)

---

## ☁️ Cloud Deployment (Google Cloud)This project is deployed on a **Google Compute Engine** instance.

1. **VM Setup:** Ubuntu 22.04 LTS instance created.
2. **Networking:** Static External IP assigned. Firewall rules opened for ports `3000` (API) and `5432` (DB).
3. **Deployment:** Code pulled via Git and orchestrated via `docker-compose`.

**Production Endpoints:**

* **API Webhook:** `http://<GCP_STATIC_IP>:3000/webhook`
* **Database:** `jdbc:postgresql://<GCP_STATIC_IP>:5432/titanic`


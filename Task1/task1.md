# 📘 Task 1: Environment Setup & Cloud Deployment

## 🎯 Objective
Establish a robust, cloud-hosted environment using Google Cloud Platform (GCP) to host the PostgreSQL database and Node.js API, ensuring 24/7 availability for Google Apps Script automation.

## 🏗 Architecture
* **Cloud Provider:** Google Cloud Platform (GCP)
* **Service:** Google Compute Engine (GCE)
* **Instance Type:** e2-micro (Ubuntu 22.04 LTS)
* **Containerization:** Docker & Docker Compose
* **Database:** PostgreSQL 15 (Containerized)
* **API:** Node.js Express Server (Containerized)

## 🛠 Setup Steps

### 1. Google Cloud Project
1.  Created a new GCP Project: `titanic-data-engineering`.
2.  Enabled **Compute Engine API**.
3.  Created a Firewall Rule to allow traffic on port `3000` (API) and `5432` (DB) for testing.

### 2. VM Provisioning
* Spun up an **e2-micro** instance.
* Assigned a **Static External IP Address** to ensure the webhook URL never changes.
* SSH-ed into the VM and installed Docker:
    ```bash
    sudo apt update
    sudo apt install docker.io docker-compose -y
    ```

### 3. Deployment
* Cloned the GitHub repository to the VM.
* Configured `.env` with production credentials.
* Launched services:
    ```bash
    docker-compose up -d --build
    ```

## ✅ Verification
* **Database:** Accessible via `jdbc:postgresql://<GCP_PUBLIC_IP>:5432/titanic`
* **API:** Health check passed at `http://<GCP_PUBLIC_IP>:3000/`

## 📂 Deliverables
* [x] GCP Project Screenshot
* [x] Terminal Output: `Status: Running`
* [x] Connection Success Log
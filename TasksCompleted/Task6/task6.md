# 📘 Task 6: Automation (Apps Script + Cloud Webhook)

## 🎯 Objective
Create a real-time sync between Google Sheets and the Cloud Database.

## 🔄 Workflow Architecture
**Google Sheets** ➔ **Apps Script** ➔ **Cloud VM (Node.js)** ➔ **PostgreSQL**

### 1. The Trigger (Google Sheets)
* User enters new passenger data.
* Custom Menu: "Titanic Systems" -> "Sync New Rows".

### 2. The Validator (Apps Script)
* Checks if `PassengerID` and `Name` are present.
* Sends a **POST** request to the Cloud API: `http://<GCP_STATIC_IP>:3000/webhook`.
* Updates row color based on response:
    * 🟢 **Green:** Success ("REGISTERED")
    * 🔴 **Red:** Failure ("FAILED: Error Msg")

### 3. The Receiver (Node.js on GCP)
* Express.js endpoint `/webhook`.
* Sanitizes input and executes an `INSERT` transaction.

## 📂 Deliverables
* [x] `Code.gs` (Apps Script)
* [x] `server.js` (API)
* [x] Screenshot of Color-Coded Sheet
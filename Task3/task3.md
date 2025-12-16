# 📘 Task 3: Database Design & ER Diagram

## 🎯 Objective
Design a Normalized (3NF) Database Schema to efficiently store Titanic passenger data.

## 📐 Schema Design
The data was split into three related entities to minimize redundancy and improve integrity.

### 1. Passengers Table (`passengers`)
*Stores identity information.*
* `passenger_id` (PK, INT): Unique ID.
* `name` (VARCHAR): Full name.
* `sex` (VARCHAR): 'male' or 'female'.
* `age` (FLOAT): Nullable age.
* `hometown` (VARCHAR): Origin city.

### 2. Tickets Table (`tickets`)
*Stores voyage and survival details.*
* `ticket_id` (PK, SERIAL): Internal ID.
* `passenger_id` (FK): Links to `passengers`.
* `pclass` (INT): 1, 2, or 3.
* `fare` (FLOAT): Ticket price.
* `survived` (INT): 0 (No), 1 (Yes), NULL (Unknown).

### 3. Ports Table (`ports`)
*Lookup table for embarkation points.*
* `code` (PK, VARCHAR): 'S', 'C', 'Q'.
* `city_name` (VARCHAR): 'Southampton', etc.

## 🔗 Relationships
* **1:1** between `passengers` and `tickets` (in this dataset context).
* **1:N** between `ports` and `tickets` (One port has many passengers).

## 📂 Deliverables
* [x] Entity Relationship Diagram (ERD) Image
* [x] `schema.sql` (DDL)
* [x] `seed.sql` (Static Data)
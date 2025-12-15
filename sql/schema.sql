CREATE TABLE IF NOT EXISTS ports (
    port_id SERIAL PRIMARY KEY,
    code VARCHAR(5) UNIQUE NOT NULL, -- 'S', 'C', 'Q'
    city_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS passengers (
    passenger_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sex VARCHAR(10) CHECK (sex IN ('male', 'female')),
    age FLOAT,
    hometown VARCHAR(255),
    destination VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id SERIAL PRIMARY KEY,
    passenger_id INT REFERENCES passengers(passenger_id) ON DELETE CASCADE,
    pclass INT CHECK (pclass IN (1, 2, 3)),
    fare FLOAT,
    cabin VARCHAR(50),
    embarked_code VARCHAR(5) REFERENCES ports(code),
    ticket_number VARCHAR(50),
    survived INT CHECK (survived IN (0, 1)),         -- 0=Died, 1=Survived
    lifeboat VARCHAR(20),
    body_number VARCHAR(20)
);

CREATE INDEX IF NOT EXISTS idx_passengers_name ON passengers(name);
CREATE INDEX IF NOT EXISTS idx_tickets_pclass ON tickets(pclass);
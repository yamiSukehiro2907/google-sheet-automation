-- Procedure: register_passenger
-- Adds a passenger AND their ticket in one go. If one fails, both fail.
CREATE OR REPLACE PROCEDURE register_passenger(
    p_id INT,
    p_name VARCHAR,
    p_sex VARCHAR,
    p_class INT,
    p_fare FLOAT,
    p_port_code VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- 1. Insert Passenger
INSERT INTO passengers (passenger_id, name, sex)
VALUES (p_id, p_name, p_sex);

-- 2. Insert Ticket
INSERT INTO tickets (passenger_id, pclass, fare, embarked_code)
VALUES (p_id, p_class, p_fare, p_port_code);

COMMIT;
END;
$$;
-- View: v_passenger_manifest
-- Combines identity, voyage info, and readable port names into one virtual table.
CREATE OR REPLACE VIEW v_passenger_manifest AS
SELECT
    p.passenger_id,
    p.name,
    p.sex,
    t.pclass,
    CASE
        WHEN t.survived = 1 THEN 'Survived'
        WHEN t.survived = 0 THEN 'Deceased'
        ELSE 'Unknown'
        END as status,
    po.city_name as embarked_city
FROM passengers p
         JOIN tickets t ON p.passenger_id = t.passenger_id
         LEFT JOIN ports po ON t.embarked_code = po.code;
-- 1. AGGREGATION: Survival Rate & Avg Age by Class
-- "Who survived the most? First class or Third class?"
SELECT
    pclass,
    COUNT(*) as total_passengers,
    ROUND(AVG(survived) * 100, 1) as survival_rate_percent,
    ROUND(AVG(age)::numeric, 1) as avg_age
FROM tickets t
         JOIN passengers p ON t.passenger_id = p.passenger_id
WHERE survived IS NOT NULL -- Exclude test set
GROUP BY pclass
ORDER BY pclass;

-- 2. JOIN REPORT: Boarding List (Passenger + Port City)
-- "Show me the first 5 people and the actual city they boarded from."
SELECT
    p.name,
    p.sex,
    t.fare,
    po.city_name as boarded_from
FROM passengers p
         JOIN tickets t ON p.passenger_id = t.passenger_id
         JOIN ports po ON t.embarked_code = po.code
    LIMIT 5;

-- 3. DATA QUALITY: Find Shared Tickets (Families/Groups)
-- "Find tickets used by 3 or more people."
SELECT
    ticket_number,
    COUNT(passenger_id) as group_size
FROM tickets
GROUP BY ticket_number
HAVING COUNT(passenger_id) >= 3
ORDER BY group_size DESC
    LIMIT 5;
INSERT INTO ports (code, city_name) VALUES
      ('S', 'Southampton'),
      ('C', 'Cherbourg'),
      ('Q', 'Queenstown')
ON CONFLICT (code) DO NOTHING;
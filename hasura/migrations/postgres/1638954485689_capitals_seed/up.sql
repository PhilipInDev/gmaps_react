INSERT INTO capitals (capital, location)
VALUES ('Kiev', ST_SetSRID(ST_MakePoint(30.5233, 50.4500), 4326)),
('Warsaw', ST_SetSRID(ST_MakePoint(21.0175, 52.2370), 4326)),
('Prague', ST_SetSRID(ST_MakePoint(14.4185, 50.0736), 4326)),
('Paris', ST_SetSRID(ST_MakePoint(2.3490, 48.8647), 4326)),
('Berlin', ST_SetSRID(ST_MakePoint(13.4049, 52.5200), 4326)),
('London', ST_SetSRID(ST_MakePoint(-0.1180, 51.5098), 4326)),
('Madrid', ST_SetSRID(ST_MakePoint(-3.7037, 40.4167), 4326)),
('Rome', ST_SetSRID(ST_MakePoint(12.4963, 41.9027), 4326)),
('Washington', ST_SetSRID(ST_MakePoint(-77.0506, 38.8892), 4326)),
('Canberra', ST_SetSRID(ST_MakePoint(149.1289, -35.2820), 4326));

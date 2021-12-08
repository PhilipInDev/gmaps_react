CREATE EXTENSION IF NOT EXISTS postgis;
CREATE TABLE capitals (
  id SERIAL PRIMARY KEY,
  capital TEXT,
  location GEOGRAPHY(Point)
);

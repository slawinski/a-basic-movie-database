DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

\c movies_db;

CREATE TABLE movies (
  ID SERIAL PRIMARY KEY,
  Title VARCHAR,
  Year INTEGER,
  Director VARCHAR,
  Country VARCHAR
);

INSERT INTO movies (Title, Year, Director, Country)
  VALUES ('Ja-nusz w wodzie', 2018, 'Andrzej Pajda', 'Bolzga');
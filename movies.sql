DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

\c movies_db;

CREATE TABLE movies (
  ID SERIAL PRIMARY KEY,
  Title VARCHAR,
  Genre VARCHAR,
  Year VARCHAR,
  Director VARCHAR,
  Country VARCHAR,
  Actors VARCHAR
);

--INSERT INTO movies (Title, Year, Director, Country)
--  VALUES ('Ja-nusz w wodzie', 2018, 'Andrzej Pajda', 'Bolzga');
exports.up = function(knex, Promise) {
  const createQuery = `CREATE TABLE movies (
    ID SERIAL PRIMARY KEY,
    Title VARCHAR,
    Genre VARCHAR,
    Year VARCHAR,
    Director VARCHAR,
    Country VARCHAR,
    Actors VARCHAR
  );
  CREATE TABLE comments (
    ID SERIAL PRIMARY KEY,
    movie_id INTEGER,
    comment VARCHAR,
    published_date timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(ID) ON DELETE CASCADE
  );`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  const dropQuery = `DROP DATABASE IF EXISTS movies_db`;
  return knex.raw(dropQuery);
};

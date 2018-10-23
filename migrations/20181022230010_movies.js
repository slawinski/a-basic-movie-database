exports.up = function(knex, Promise) {
  const createQuery = `CREATE TABLE movies (
    ID SERIAL PRIMARY KEY,
    Title VARCHAR,
    Genre VARCHAR,
    Year VARCHAR,
    Director VARCHAR,
    Country VARCHAR,
    Actors VARCHAR
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  const dropQuery = `DROP TABLE movies`;
  return knex.raw(dropQuery);
};

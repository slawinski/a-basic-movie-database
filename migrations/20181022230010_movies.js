exports.up = (knex, Promise) => {
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

exports.down = (knex, Promise) => {
  const dropQuery = `DROP TABLE movies`;
  return knex.raw(dropQuery);
};

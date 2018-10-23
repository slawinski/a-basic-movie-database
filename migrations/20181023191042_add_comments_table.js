exports.up = (knex, Promise) => {
  const createQuery = `CREATE TABLE comments (
    ID SERIAL PRIMARY KEY,
    movie_id INTEGER,
    comment VARCHAR,
    published_date timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(ID) ON DELETE CASCADE
  );`;
  return knex.raw(createQuery);
};

exports.down = (knex, Promise) => {
  const dropQuery = `DROP TABLE comments`;
  return knex.raw(dropQuery);
};

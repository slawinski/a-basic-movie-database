exports.up = (knex, Promise) =>
  knex.schema.createTable("movies", table => {
    table.increments();
    table.text("Title").notNullable();
    table.integer("Year");
    table.text("Rated");
    table.text("Released");
    table.text("Runtime");
    table.text("Genre");
    table.text("Director");
    table.text("Writer");
    table.text("Actors");
    table.text("Plot");
    table.text("Language");
    table.text("Country");
    table.text("Awards");
    table.text("Poster");
    table.json("Ratings");
    table.text("Metascore");
    table.text("imdbRating");
    table.text("imdbVotes");
    table.text("imdbID");
    table.text("Type");
    table.text("DVD");
    table.text("BoxOffice");
    table.text("Production");
    table.text("Website");
    table.boolean("Response");
  });
// const createQuery = `CREATE TABLE movies (
//   ID SERIAL PRIMARY KEY,
//   Title VARCHAR,
//   Genre VARCHAR,
//   Year VARCHAR,
//   Director VARCHAR,
//   Country VARCHAR,
//   Actors VARCHAR
// )`;
// return knex.raw(createQuery);
exports.down = (knex, Promise) => {
  const dropQuery = `DROP TABLE movies`;
  return knex.raw(dropQuery);
};

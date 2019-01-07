exports.up = function(knex, Promise) {
  return knex.schema.createTable("movies", function(table) { // eslint-disable-line
    table.increments("id");
    table.text("Title").notNullable();
    table.text("Year");
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
    table.timestamps(false, true);
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable("movies");
};

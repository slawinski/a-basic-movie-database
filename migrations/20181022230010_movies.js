exports.up = (knex, Promise) =>
  knex.schema.createTable("movies", table => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("year");
    table.text("rated");
    table.text("released");
    table.text("runtime");
    table.text("genre");
    table.text("director");
    table.text("writer");
    table.text("actors");
    table.text("plot");
    table.text("language");
    table.text("country");
    table.text("awards");
    table.text("poster");
    table.json("ratings");
    table.text("metascore");
    table.text("imdbRating");
    table.text("imdbVotes");
    table.text("imdbID");
    table.text("type");
    table.text("DVD");
    table.text("boxOffice");
    table.text("production");
    table.text("website");
    table.boolean("response");
    table.timestamps(false, true);
  });
exports.down = (knex, Promise) => {
  knex.schema.dropTable("movies");
};

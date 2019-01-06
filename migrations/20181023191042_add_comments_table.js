exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", function(table) { //eslint-disable-line
    table.increments("id");
    table
      .integer("movie_id")
      .references("id")
      .inTable("movies");
    table.text("comment");
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};

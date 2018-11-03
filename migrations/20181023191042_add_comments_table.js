exports.up = (knex, Promise) =>
  knex.schema.createTable("comments", table => {
    table.increments("id");
    table
      .integer("movie_id")
      .references("id")
      .inTable("movies");
    table.text("comment");
    table.timestamps(false, true);
  });

exports.down = (knex, Promise) => {
  const dropQuery = `DROP TABLE comments`;
  return knex.raw(dropQuery);
};

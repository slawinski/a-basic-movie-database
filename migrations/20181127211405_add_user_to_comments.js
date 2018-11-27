exports.up = (knex, Promise) =>
  knex.schema.table("comments", table => {
    table.text("user");
  });

exports.down = (knex, Promise) =>
  knex.schema.table("comments", table => {
    table.dropColumn("user");
  });

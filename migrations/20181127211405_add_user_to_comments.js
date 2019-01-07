exports.up = function(knex, Promise) {
  return knex.schema.table("comments", function(table) { // eslint-disable-line
    table.text("user");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("comments", function(table) { // eslint-disable-line
    table.dropColumn("user");
  });
};

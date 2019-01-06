exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table) { // eslint-disable-line
    table.increments("id");
    table
      .string("username")
      .unique()
      .notNullable();
    table
      .boolean("admin")
      .notNullable()
      .defaultTo(false);
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};

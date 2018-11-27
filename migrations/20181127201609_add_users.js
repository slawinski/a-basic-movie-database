exports.up = (knex, Promise) =>
  knex.schema.createTable("users", table => {
    table.increments("id");
    table
      .string("username")
      .unique()
      .notNullable();
    table.string("password").notNullable();
    table
      .boolean("admin")
      .notNullable()
      .defaultTo(false);
    table.timestamps(false, true);
  });

exports.down = (knex, Promise) => {
  knex.schema.dropTable("users");
};

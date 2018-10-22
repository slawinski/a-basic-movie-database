// Update with your config settings.

module.exports = {
  development: {
    client: "postgres",
    connection: {
      database: "movie_db",
      user: "postgres",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};

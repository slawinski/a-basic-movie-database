// Update with your config settings.

module.exports = {
  development: {
    client: "postgres",
    connection: "postgres://postgres:password@db:5432/movies_db" //for migration has to be localhost, for routes db
  }
};

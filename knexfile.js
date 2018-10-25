// Update with your config settings.

module.exports = {
  development: {
    client: "postgres",
    connection: "postgres://postgres:password@db/movies_db"
  },
  production: {
    client: "postgres",
    connection: process.env.DATABASE_URL
  }
};

module.exports = {
  development: {
    client: "postgres",
    connection: "postgres://postgres:password@db:5432/movies_db"
  },
  production: {
    client: "postgres",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations",
      tableName: "migrations"
    },
    ssl: true
  }
};

module.exports = {
  development: {
    client: "postgres",
    connection: "postgres://postgres:password@db:5432/movies_db",
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/development"
    }
  },
  test: {
    client: "postgres",
    connection: "postgres://postgres:password@db:5432/movies_db_test",
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/test"
    }
  },
  production: {
    client: "postgres",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./db/migrations"
    },
    ssl: true
  }
};

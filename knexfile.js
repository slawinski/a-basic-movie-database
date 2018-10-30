module.exports = {
  development: {
    client: "postgres",
    connection: {
      host: "db",
      user: "postgres",
      password: "password",
      database: "movies_db"
    }
  },
  production: {
    client: "postgres",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "password",
      database: "movies_db"
    }
  }
};

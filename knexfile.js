const path = require("path");

require("dotenv").config();
console.log("Connected to PlanetScale!");

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.HOSTNAME_DB,
      user: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_DB,
      ssl: {
        rejectUnauthorized: true,
      },
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations",
      ),
    },
    useNullAsDefault: true,
  },
};

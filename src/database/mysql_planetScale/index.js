const mysql = require("mysql");
const dotenv = require("dotenv");

// Carrega as variáveis de ambiente a partir do arquivo .env
dotenv.config();

async function mysqlConnection() {
  const database = await mysql.createConnection({
    host: process.env.HOSTNAME_DB,
    user: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    ssl: {
      rejectUnauthorized: true,
    },
  });

  return database;
}

module.exports = mysqlConnection;

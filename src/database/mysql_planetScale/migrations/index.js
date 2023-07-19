const mysqlConnection = require("../index");
const createUsers = require("./createUser");

async function migrationsRun() {
  const connection = await mysqlConnection();

  // Execute as migrations
  await connection.query(createUsers);

  // Feche a conexão

  console.log("Migrations completed successfully.");
  connection.end();
}

migrationsRun().catch((error) => console.error(error));

module.exports = migrationsRun;

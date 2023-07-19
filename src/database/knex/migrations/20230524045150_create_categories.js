exports.up = function (knex) {
  return knex.schema
    .createTable("categories", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable().unique();
    })
    .then(function () {
      return knex.raw(`
      INSERT INTO categories (name)
      VALUES
        ("Refeicao"),
        ("Sobremesa"),
        ("Doces"),
        ("Bebidas")
    `);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("categories");
};

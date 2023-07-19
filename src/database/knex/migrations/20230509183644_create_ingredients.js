exports.up = function (knex) {
  return knex.schema
    .createTable("ingredients", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable().unique();
    })
    .then(function () {
      return knex("ingredients").insert([
        { name: "Pão" },
        { name: "Cheddar" },
        { name: "Alho" },
        { name: "Cebola" },
        { name: "Sal" },
        { name: "Tomate" },
        { name: "Maionese" },
        { name: "Pepino" },
        { name: "Carne moida" },
        { name: "Queijo" },
        { name: "Picanha" },
      ]);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("ingredients");
};

//  DESATIVADO POR ENQUANTO INUTIL

exports.up = (knex) =>
  knex.schema.createTable("shopping_cart", (table) => {
    table.increments("id").primary();
    table.integer("plate_id").unsigned().references("id").inTable("plates");
    table.float("value").notNullable();
    table.float("total_value").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    console.log("Criada tabela de carrinho");
  });

exports.down = (knex) => knex.schema.dropTableIfExists("shopping_cart");

exports.up = function (knex) {
  return knex.schema.createTable("favorite_plates", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.integer("plate_id").unsigned().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("favorite_plates");
};

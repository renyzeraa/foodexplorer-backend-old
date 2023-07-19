exports.up = (knex) =>
  knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.string("status");
    table.string("code").notNullable();
    table.string("details");
    table.integer("orders_id").unsigned();
    table.integer("users_id").unsigned();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("orders");

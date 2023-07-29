exports.up = function (knex) {
  return knex.schema
    .createTable("ingredients", function (table) {
      table.increments("id").primary();
      table.text("name").notNullable().unique();
    })
    .then(function () {
      return knex.raw(`
      INSERT INTO ingredients (name)
      VALUES
        ("pão"),
        ("cheddar"),
        ("alho"),
        ("cebola"),
        ("sal"),
        ("tomate"),
        ("maionese"),
        ("pepino"),
        ("carne moida"),
        ("queijo"),
        ("picanha"),
        ("molho de tomate"),
        ("muçarela"),
        ("presunto"),
        ("calabresa"),
        ("azeitona"),
        ("orégano"),
        ("azeite de oliva"),
        ("manjericão"),
        ("requeijão"),
        ("mussarela de búfala"),
        ("tomate seco"),
        ("atum"),
        ("milho"),
        ("catupiry"),
        ("pimentão"),
        ("linguiça"),
        ("ovo"),
        ("brócolis"),
        ("palmito"),
        ("ervilha"),
        ("pimenta calabresa"),
        ("queijo gorgonzola"),
        ("azeitona preta"),
        ("rúcula"),
        ("frango"),
        ("abacaxi"),
        ("camarão"),
        ("margarita"),
        ("queijo parmesão"),
        ("cebola roxa"),
        ("alcaparras"),
        ("cebola caramelizada"),
        ("azeitona verde"),
        ("manjericão fresco"),
        ("molho barbecue"),
        ("mussarela de búfala com tomate-cereja"),
        ("gorgonzola com nozes"),
        ("palmito com champignon"),
        ("pesto de manjericão"),
        ("frango com catupiry"),
        ("calabresa com cebola"),
        ("quatro queijos"),
        ("portuguesa"),
        ("margherita"),
        ("frango com milho"),
        ("bacon"),
        ("atum com cebola"),
        ("mussarela com calabresa"),
        ("strogonoff de carne"),
        ("vegetariana"),
        ("pepperoni"),
        ("banana com canela"),
        ("chocolate com morango"),
        ("abobrinha com ricota")
    `);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("ingredients");
};

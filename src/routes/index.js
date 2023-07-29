const { Router } = require("express");

const usersRoutes = require("./users.routes");
const platesRoutes = require("./plates.routes");
const favoriteRoutes = require("./favorite.routes");
const sessionsRoutes = require("./sessions.routes");
const ingredientsRoutes = require("./ingredients.routes");
const ordersRoutes = require("./orders.routes");
const shoppingRoutes = require("./shopping.routes");
const a_clientesRoutes = require("./asaas.routes/a_clientes.routes");
const a_invoicesRoutes = require("./asaas.routes/a_invoices.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/plates", platesRoutes);
routes.use("/favorites", favoriteRoutes);
routes.use("/ingredients", ingredientsRoutes);
routes.use("/orders", ordersRoutes);
routes.use("/shopping", shoppingRoutes);

// Rotas do Asaas para pagamentos
routes.use("/a_clientes", a_clientesRoutes);
routes.use("/a_invoices", a_invoicesRoutes);

module.exports = routes;

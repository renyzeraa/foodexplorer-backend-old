const { Router } = require("express");

const usersRoutes = require("./users.routes");
const platesRoutes = require("./plates.routes");
const favoriteRoutes = require("./favorite.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/plates", platesRoutes);
routes.use("/favorites", favoriteRoutes);

module.exports = routes;

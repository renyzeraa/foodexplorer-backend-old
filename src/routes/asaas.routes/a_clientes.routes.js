const { Router } = require("express");
const ensureAuthenticated = require("../../middleware/ensureAuthenticated");
const A_ClientesController = require("../../controllers/assas.controller/A_ClientesController");

const a_clientesRoutes = Router();
const a_ClientesController = new A_ClientesController();

a_clientesRoutes.post("/", ensureAuthenticated, a_ClientesController.create);
a_clientesRoutes.get("/", ensureAuthenticated, a_ClientesController.show);
a_clientesRoutes.post("/:id", ensureAuthenticated, a_ClientesController.update);

module.exports = a_clientesRoutes;

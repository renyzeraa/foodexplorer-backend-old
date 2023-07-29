const { Router } = require("express");
const ensureAuthenticated = require("../../middleware/ensureAuthenticated");
const A_InvoicesController = require("../../controllers/assas.controller/A_InvoicesController");

const a_invoicesRoutes = Router();
const a_InvoicesController = new A_InvoicesController();

a_invoicesRoutes.post("/", ensureAuthenticated, a_InvoicesController.create);
a_invoicesRoutes.post(
  "/cd",
  ensureAuthenticated,
  a_InvoicesController.createCreditCard,
);
a_invoicesRoutes.get("/", ensureAuthenticated, a_InvoicesController.show);
a_invoicesRoutes.get("/:id", ensureAuthenticated, a_InvoicesController.showUniques);
a_invoicesRoutes.post("/:id", ensureAuthenticated, a_InvoicesController.update);

module.exports = a_invoicesRoutes;

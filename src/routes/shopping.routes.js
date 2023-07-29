const { Router } = require("express");
const ShoppingCartControllerController = require("../controllers/ShoppingCartController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const shoppingRoutes = Router();
const shoppingCartController = new ShoppingCartControllerController();

// Rota de query do banco de dados para mostrar os pedidos no carrinho, antes de finalizar a compra
shoppingRoutes.get("/:id", ensureAuthenticated, shoppingCartController.show);

module.exports = shoppingRoutes;

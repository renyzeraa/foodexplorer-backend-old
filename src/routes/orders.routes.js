const { Router } = require("express");
const OrdersController = require("../controllers/OrdersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const ordersRoutes = Router();
const ordersController = new OrdersController();

// Rota para criar um novo pedido
ordersRoutes.post("/", ensureAuthenticated, ordersController.create);

// Rota para listar todos os pedidos
ordersRoutes.get("/", ensureAuthenticated, ordersController.index);

// Rota para exibir detalhes de um pedido específico
ordersRoutes.get("/:id", ensureAuthenticated, ordersController.show);

// Rota para atualizar um pedido
ordersRoutes.put("/:id", ensureAuthenticated, ordersController.update);

// Rota para excluir um pedido
ordersRoutes.delete("/:id", ensureAuthenticated, ordersController.delete);

module.exports = ordersRoutes;

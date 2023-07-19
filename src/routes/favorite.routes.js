const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const favoriteRoutes = Router();

const favoritesController = new FavoritesController();

favoriteRoutes.post(
  "/favorite_plates",
  ensureAuthenticated,
  favoritesController.create,
);

favoriteRoutes.get("/favorite_plates", favoritesController.show);

favoriteRoutes.delete(
  "/favorite_plates",
  ensureAuthenticated,
  favoritesController.delete,
);

module.exports = favoriteRoutes;

const express = require('express');
const recipesRoutes = express.Router();
const recipesController = require('../controllers/recipe.controller');

recipesRoutes.get('/', recipesController.getRecipes);
recipesRoutes.post('/', recipesController.createRecipes);
recipesRoutes.patch('/:id', recipesController.updateRecipes);
recipesRoutes.delete('/:id', recipesController.deleteRecipes);

recipesRoutes.get('/user', recipesController.getRecipesByUser);

module.exports = recipesRoutes;

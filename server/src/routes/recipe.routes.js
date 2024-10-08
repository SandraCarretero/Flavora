const express = require('express');
const recipesRoutes = express.Router();
const recipesController = require('../controllers/recipe.controller');

recipesRoutes.get('/', recipesController.getRecipes);
recipesRoutes.post('/', recipesController.createRecipes);
recipesRoutes.patch('/:id', recipesController.updateRecipes);
recipesRoutes.delete('/:id', recipesController.deleteRecipes);

recipesRoutes.get('/user', recipesController.getRecipesByUser);
recipesRoutes.get('/random', recipesController.getRandomRecipes);
recipesRoutes.get('/:id', recipesController.getRecipeById);

recipesRoutes.post('/like', recipesController.likeRecipe);
recipesRoutes.post('/unlike', recipesController.unlikeRecipe);

recipesRoutes.get('/recipes/liked', recipesController.getLikedRecipes);

module.exports = recipesRoutes;

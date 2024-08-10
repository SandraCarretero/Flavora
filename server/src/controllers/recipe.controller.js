// controllers/recipe.controller.js

const Recipe = require('../models/recipe.model');

const recipesController = {};

// Obtener todas las recetas
recipesController.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener las recetas', error: error.message });
  }
};

// Crear una nueva receta
recipesController.createRecipes = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error al crear la receta', error: error.message });
  }
};

// Actualizar una receta existente
recipesController.updateRecipes = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error al actualizar la receta', error: error.message });
  }
};

// Eliminar una receta
recipesController.deleteRecipes = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.status(200).json({ message: 'Receta eliminada' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al eliminar la receta', error: error.message });
  }
};

// recipe.controller.js
recipesController.getRecipesByUser = async (req, res) => {
  const { userId } = req.query;

  try {
    const recipes = await Recipe.find({ userId }); // Filtra recetas por userId
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener las recetas', error: error.message });
  }
};

module.exports = recipesController;

// controllers/recipe.controller.js

const Recipe = require('../models/recipe.model');

const recipesController = {};

// Obtener todas las recetas
recipesController.getRecipes = async (req, res) => {
  const { userId } = req.query;

  try {
    // Buscar recetas por userId
    const recipes = await Recipe.find({ userId });
    res.json(recipes); // Asegúrate de que se envíe JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva receta
recipesController.createRecipes = async (req, res) => {
  const {
    name,
    slice,
    difficulty,
    time,
    specialties,
    course,
    mealType,
    ingredients,
    steps,
    image,
    userId
  } = req.body;

  try {
    if (!name || !difficulty || !course || !mealType || !userId) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    // Crea un nuevo documento de receta en MongoDB
    const newRecipe = new Recipe({
      name,
      slice,
      difficulty,
      time,
      specialties,
      course,
      mealType,
      ingredients,
      steps,
      image,
      userId
    });

    // Guarda la receta en la base de datos
    const savedRecipe = await newRecipe.save();

    // Devuelve la receta guardada como respuesta
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error al guardar la receta:', error);
    res.status(500).json({ message: 'Error al guardar la receta' });
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

// Obtener recetas por usuario
recipesController.getRecipesByUser = async (req, res) => {
  const { userId } = req.query;

  try {
    // Buscar recetas por userId
    const recipes = await Recipe.find({ userId });
    res.json(recipes); // Asegúrate de que se envíe JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

recipesController.getRandomRecipes = async (req, res) => {
  const limit = parseInt(req.query.limit) || 4; // Por defecto 4 recetas

  try {
    const recipes = await Recipe.aggregate([{ $sample: { size: limit } }]);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener una receta por ID
recipesController.getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la receta' });
  }
};

module.exports = recipesController;

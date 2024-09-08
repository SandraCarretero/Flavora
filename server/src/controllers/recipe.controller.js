const Recipe = require('../models/recipe.model');

const recipesController = {};

// Obtener todas las recetas
recipesController.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
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

    const savedRecipe = await newRecipe.save();

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
    const recipes = await Recipe.find({ userId });
    res.json(recipes); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

recipesController.getRandomRecipes = async (req, res) => {
  const limit = parseInt(req.query.limit) || 4; 

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

// Agregar un like a una receta
recipesController.likeRecipe = async (req, res) => {
  const { recipeId, userId } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    if (recipe.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: 'Ya has dado like a esta receta' });
    }

    recipe.likedBy.push(userId);
    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un like de una receta
recipesController.unlikeRecipe = async (req, res) => {
  const { recipeId, userId } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    if (!recipe.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: 'No has dado like a esta receta' });
    }

    recipe.likedBy = recipe.likedBy.filter(id => id.toString() !== userId);
    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener recetas que el usuario ha dado like
recipesController.getLikedRecipes = async (req, res) => {
  const { userId } = req.query;

  try {
    const recipes = await Recipe.find({ likedBy: userId });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = recipesController;

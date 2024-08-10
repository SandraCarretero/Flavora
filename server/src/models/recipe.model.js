const mongoose = require('mongoose');
const recipeSchema = require('../schemes/recipe.scheme');

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  time: { type: String, required: true },
  specialties: [String],
  course: { type: String, required: true },
  mealType: { type: String, required: true },
  steps: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = recipeSchema;

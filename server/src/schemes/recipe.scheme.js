const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  time: {
    hours: { type: Number, required: true },
    minutes: { type: Number, required: true }
  },
  specialties: [String],
  course: { type: String, required: true },
  mealType: { type: String, required: true },
  ingredients: [
    {
      amount: { type: String, required: true },
      unit: { type: String, required: true },
      ingredient: { type: String, required: true }
    }
  ],
  steps: [
    {
      id: { type: String, required: true },
      text: { type: String, required: true }
    }
  ],
  userId: { type: String, required: true }
});

module.exports = recipeSchema;

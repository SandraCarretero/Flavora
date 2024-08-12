const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  time: { type: String, required: true },
  specialties: [String],
  course: { type: String, required: true },
  mealType: { type: String, required: true }, 
  steps: { type: String, required: true },
  rating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  userId: { type: String, required: true },
});

recipeSchema.methods.updateRating = function (newRating) {
  this.totalRating += newRating;
  this.ratingsCount += 1;
  this.rating = this.totalRating / this.ratingsCount;
  return this.save();
};

module.exports = recipeSchema;

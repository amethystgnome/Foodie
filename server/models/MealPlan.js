const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meals: [
    {
      date: { type: Date, required: true },
      mealType: { type: String, required: true },
      recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true }, 
      // Reference to Recipe
    },
  ],
});

module.exports = mongoose.model('MealPlan', MealPlanSchema);



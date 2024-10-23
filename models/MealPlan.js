const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Link to the User who created the meal plan
    weekStartDate: { type: Date, required: true },  // Date for the start of the week
    meals: [
        {
            day: { type: String, required: true },  // e.g., "Monday", "Tuesday"
            mealType: { type: String, required: true },  // e.g., "Breakfast", "Lunch", "Dinner"
            recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }  // Link to the Recipe model
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MealPlan', MealPlanSchema);

const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  recipe_name: { type: String, required: true },
  img_src: { type: String, required: true },
  ingredients: { type: String, required: true },
  directions: { type: String, required: true },
});

module.exports = mongoose.model('Recipe', RecipeSchema);


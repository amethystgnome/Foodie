// Updated mealPlanRoutes.js (Backend)
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Adjust the path as needed
const MealPlan = require('../models/MealPlan'); // Ensure the correct model is imported

// Add a recipe to the meal plan
router.post('/add', async (req, res) => {
  console.log('POST request received at /add with data:', req.body); // Debugging

  const { userId, date, mealType, recipeId } = req.body; // Ensure this comes first

  if (!userId || !date || !mealType || !recipeId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the recipeId exists
    const recipeExists = await Recipe.findById(recipeId);
    if (!recipeExists) {
      return res.status(400).json({ message: 'Invalid recipeId.' });
    }

    // Ensure a single document per userId
    let mealPlan = await MealPlan.findOne({ userId });
    console.log('Existing Meal Plan:', mealPlan);

    if (!mealPlan) {
      mealPlan = new MealPlan({ userId, meals: [] });
    }

    // Add the new meal to the plan
    mealPlan.meals.push({ date, mealType, recipeId });
    console.log('Updated Meal Plan before saving:', mealPlan);

    // Save to the database
    const savedMealPlan = await mealPlan.save();
    console.log('Meal added successfully:', savedMealPlan);

    res.status(201).json({
      message: 'Meal added to meal plan successfully.',
      meal: savedMealPlan.meals[savedMealPlan.meals.length - 1],
    });
  } catch (error) {
    console.error('Error adding meal to meal plan:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Generate shopping list
router.get('/:userId/shopping-list', async (req, res) => {
  const { userId } = req.params;

  try {
    const mealPlan = await MealPlan.findOne({ userId }).populate('meals.recipeId');
    if (!mealPlan) {
      return res.status(404).json({ message: 'No meal plans found.' });
    }

    const ingredientMap = {};
    mealPlan.meals.forEach((meal) => {
      if (meal.recipeId?.ingredients) {
        const ingredientsList = meal.recipeId.ingredients.split(',').map((item) => item.trim());
        ingredientsList.forEach((ingredient) => {
          if (ingredientMap[ingredient]) {
            ingredientMap[ingredient] += 1;
          } else {
            ingredientMap[ingredient] = 1;
          }
        });
      }
    });

    res.status(200).json({ shoppingList: ingredientMap });
  } catch (error) {
    console.error('Error generating shopping list:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// Save a new meal plan
router.post('/save', async (req, res) => {
  const { userId, meals } = req.body;

  try {
    const newMealPlan = new MealPlan({ userId, meals });
    const savedMealPlan = await newMealPlan.save();
    res.status(201).json({ message: 'Meal plan saved successfully!', mealPlan: savedMealPlan });
  } catch (error) {
    console.error('Error saving meal plan:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Fetch the user's meal plan
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const mealPlan = await MealPlan.findOne({ userId }).populate('meals.recipeId'); // Populate recipeId
    if (!mealPlan) {
      return res.status(404).json({ message: 'No meal plans found.' });
    }

    console.log('Fetched Meal Plan:', mealPlan); // Debugging
    res.status(200).json(mealPlan);
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;





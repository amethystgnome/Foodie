const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Adjust the path to your model

router.get('/all', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const recipes = await Recipe.aggregate([{ $sample: { size: 4 } }]); // Randomly select 4 recipes
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching featured recipes:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id); // Fetch recipe by ID
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id); // Fetch recipe by ID
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;





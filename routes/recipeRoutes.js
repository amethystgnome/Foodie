const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new recipe
router.post('/', async (req, res) => {
    const recipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        imageUrl: req.body.imageUrl,
        category: req.body.category
    });

    try {
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

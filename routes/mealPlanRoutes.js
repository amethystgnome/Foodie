const express = require('express');
const MealPlan = require('../models/MealPlan');
const router = express.Router();

// GET: Get meal plans for a user
router.get('/:userId', async (req, res) => {
    try {
        const mealPlans = await MealPlan.find({ user: req.params.userId });
        res.json(mealPlans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Create a new meal plan
router.post('/', async (req, res) => {
    const { user, weekStartDate, meals } = req.body;
    const mealPlan = new MealPlan({ user, weekStartDate, meals });
    
    try {
        const savedMealPlan = await mealPlan.save();
        res.status(201).json(savedMealPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

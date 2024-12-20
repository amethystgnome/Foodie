const express = require('express');
const ShoppingList = require('../models/ShoppingList');
const router = express.Router();

// GET: Get shopping lists for a user
router.get('/:userId', async (req, res) => {
    try {
        const shoppingLists = await ShoppingList.find({ user: req.params.userId });
        res.json(shoppingLists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Create a new shopping list
router.post('/', async (req, res) => {
    const { user, items } = req.body;
    const shoppingList = new ShoppingList({ user, items });
    
    try {
        const savedShoppingList = await shoppingList.save();
        res.status(201).json(savedShoppingList);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
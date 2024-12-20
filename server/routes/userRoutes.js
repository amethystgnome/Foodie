const express = require('express');
const User = require('../models/User');
const router = express.Router();

// POST: Create a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('Database connection error:', error));

// Route Imports
const userRoutes = require('./routes/userRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

// Route definitions (AFTER middleware)
app.use('/api/users', userRoutes);
app.use('/api/mealplans', mealPlanRoutes);
app.use('/api/shoppinglists', shoppingListRoutes);
app.use('/api/recipes', recipeRoutes); // Recipe routes

// Default route (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the Foodie API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

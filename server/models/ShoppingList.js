const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Link to the User who created the shopping list
    createdAt: { type: Date, default: Date.now },
    items: [
        {
            name: { type: String, required: true },  // Name of the item (ingredient)
            quantity: { type: String },  // Quantity of the item (e.g., "2 lbs", "3 pieces")
            checked: { type: Boolean, default: false }  // Whether the item has been checked off the list
        }
    ]
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);

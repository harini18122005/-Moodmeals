const express = require('express');
const router = express.Router();
const { getSuggestion, saveMood, saveFeedback, searchRecipes, getRecipeDetails } = require('../controllers/foodController');

// GET route for food suggestions based on mood
router.get('/suggestion/:mood', getSuggestion);

// POST route for saving user mood
router.post('/mood', saveMood);

// POST route for saving user feedback
router.post('/feedback', saveFeedback);

// Bonus: GET route for searching recipes by name
router.get('/search', searchRecipes);

// Bonus: GET route for getting recipe details by ID
router.get('/recipe/:id', getRecipeDetails);

module.exports = router;

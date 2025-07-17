const express = require('express');
const router = express.Router();
const { getSuggestion, saveMood, saveFeedback } = require('../controllers/foodController');

// GET route for food suggestions based on mood
router.get('/suggestion/:mood', getSuggestion);

// POST route for saving user mood
router.post('/mood', saveMood);

// POST route for saving user feedback
router.post('/feedback', saveFeedback);

module.exports = router;

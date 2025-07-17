exports.getSuggestion = async (req, res) => {
  try {
    const { mood } = req.params;

    // For now, send dummy data. Later connect to Spoonacular API.
    const suggestions = {
      happy: ['Ice Cream', 'Pizza', 'Burger'],
      sad: ['Soup', 'Chocolate', 'Tea'],
      stressed: ['Green Tea', 'Salad', 'Smoothie'],
      calm: ['Herbal Tea', 'Fruit Bowl'],
      excited: ['Pasta', 'Milkshake'],
      tired: ['Coffee', 'Sandwich']
    };

    const result = suggestions[mood.toLowerCase()] || ['No suggestions found for this mood'];

    res.json({
      mood,
      recommendations: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Additional controller for saving mood (bonus)
exports.saveMood = async (req, res) => {
  try {
    const { mood, userId } = req.body;
    
    // For now, just log the mood. Later save to database.
    console.log(`User ${userId || 'anonymous'} is feeling ${mood}`);
    
    res.json({
      success: true,
      message: 'Mood saved successfully',
      data: { mood, userId, timestamp: new Date() }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Additional controller for feedback (bonus)
exports.saveFeedback = async (req, res) => {
  try {
    const { suggestion, rating, feedback, userId } = req.body;
    
    // For now, just log the feedback. Later save to database.
    console.log(`User ${userId || 'anonymous'} rated ${suggestion} with ${rating} stars: ${feedback}`);
    
    res.json({
      success: true,
      message: 'Feedback saved successfully',
      data: { suggestion, rating, feedback, userId, timestamp: new Date() }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

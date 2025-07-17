// Test JSON examples for MoodMeals API

// 1. Save Happy Mood
const happyMoodData = {
  "mood": "happy",
  "userId": "user123"
};

// 2. Save Sad Mood
const sadMoodData = {
  "mood": "sad",
  "userId": "user456"
};

// 3. Save Stressed Mood
const stressedMoodData = {
  "mood": "stressed",
  "userId": "user789"
};

// 4. Pizza Feedback (Positive)
const pizzaFeedback = {
  "suggestion": "Pizza",
  "rating": 5,
  "feedback": "Amazing! Really boosted my mood",
  "userId": "user123"
};

// 5. Soup Feedback (Neutral)
const soupFeedback = {
  "suggestion": "Soup",
  "rating": 3,
  "feedback": "It was okay, could be better",
  "userId": "user456"
};

// 6. Salad Feedback (Positive)
const saladFeedback = {
  "suggestion": "Salad",
  "rating": 4,
  "feedback": "Fresh and healthy, felt energized!",
  "userId": "user789"
};

// 7. Minimal mood data (userId optional)
const minimalMoodData = {
  "mood": "calm"
};

// 8. Minimal feedback data
const minimalFeedbackData = {
  "suggestion": "Ice Cream",
  "rating": 5,
  "feedback": "Perfect comfort food!"
};

console.log("Use these JSON examples to test your API endpoints!");

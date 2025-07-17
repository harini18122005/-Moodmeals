const axios = require('axios');

// Test function for API endpoints
async function testAPI() {
  console.log('🚀 Testing MoodMeals API...\n');
  
  try {
    // Test GET endpoint for different moods
    console.log('1. Testing GET /api/food/suggestion/happy');
    const happyResponse = await axios.get('http://localhost:5000/api/food/suggestion/happy');
    console.log('Response:', happyResponse.data);
    console.log('✅ Happy mood test passed!\n');
    
    console.log('2. Testing GET /api/food/suggestion/sad');
    const sadResponse = await axios.get('http://localhost:5000/api/food/suggestion/sad');
    console.log('Response:', sadResponse.data);
    console.log('✅ Sad mood test passed!\n');
    
    console.log('3. Testing GET /api/food/suggestion/stressed');
    const stressedResponse = await axios.get('http://localhost:5000/api/food/suggestion/stressed');
    console.log('Response:', stressedResponse.data);
    console.log('✅ Stressed mood test passed!\n');
    
    // Test POST endpoint for saving mood
    console.log('4. Testing POST /api/food/mood');
    const moodData = {
      mood: 'happy',
      userId: 'user123'
    };
    const moodResponse = await axios.post('http://localhost:5000/api/food/mood', moodData);
    console.log('Response:', moodResponse.data);
    console.log('✅ Save mood test passed!\n');
    
    // Test POST endpoint for saving feedback
    console.log('5. Testing POST /api/food/feedback');
    const feedbackData = {
      suggestion: 'Pizza',
      rating: 5,
      feedback: 'Loved it!',
      userId: 'user123'
    };
    const feedbackResponse = await axios.post('http://localhost:5000/api/food/feedback', feedbackData);
    console.log('Response:', feedbackResponse.data);
    console.log('✅ Save feedback test passed!\n');
    
    console.log('🎉 All API tests passed successfully!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  }
}

// Run the tests
testAPI();

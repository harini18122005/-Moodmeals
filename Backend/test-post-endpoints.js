const axios = require('axios');

// Quick test function for POST endpoints
async function testPostEndpoints() {
  console.log('🧪 Testing POST endpoints...\n');
  
  try {
    // Test 1: Save mood
    console.log('1. Testing POST /api/food/mood');
    const moodResponse = await axios.post('http://localhost:5000/api/food/mood', {
      "mood": "excited",
      "userId": "testUser001"
    });
    console.log('✅ Success:', moodResponse.data);
    console.log('');
    
    // Test 2: Save feedback
    console.log('2. Testing POST /api/food/feedback');
    const feedbackResponse = await axios.post('http://localhost:5000/api/food/feedback', {
      "suggestion": "Milkshake",
      "rating": 5,
      "feedback": "Perfect for my excited mood!",
      "userId": "testUser001"
    });
    console.log('✅ Success:', feedbackResponse.data);
    console.log('');
    
    console.log('🎉 All POST tests passed!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Run the test
testPostEndpoints();

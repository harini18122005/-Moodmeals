// Test script to verify frontend-backend connection
const axios = require('axios');

async function testFrontendToBackend() {
  console.log('🔍 Testing Frontend to Backend Connection\n');
  
  try {
    // Test the exact same API call that the frontend should be making
    console.log('1. Testing backend API call...');
    const response = await axios.get('http://localhost:5001/api/food/suggestion/happy');
    
    console.log('✅ Backend Response Status:', response.status);
    console.log('✅ Backend Response Data:');
    console.log('   - Mood:', response.data.mood);
    console.log('   - Fallback:', response.data.fallback);
    console.log('   - Message:', response.data.message);
    console.log('   - Number of Recipes:', response.data.recipes?.length);
    
    if (response.data.recipes && response.data.recipes.length > 0) {
      console.log('\n📋 Sample Recipe Data:');
      const sampleRecipe = response.data.recipes[0];
      console.log('   - ID:', sampleRecipe.id);
      console.log('   - Title:', sampleRecipe.title);
      console.log('   - Image:', sampleRecipe.image);
      console.log('   - Ready In:', sampleRecipe.readyInMinutes, 'minutes');
      console.log('   - Real Data:', sampleRecipe.realData);
    }

    console.log('\n🎯 CONCLUSION:');
    if (response.data.fallback === false && response.data.recipes[0]?.realData === true) {
      console.log('✅ Backend is working perfectly with REAL Spoonacular API data!');
      console.log('✅ You are getting real recipe images and data!');
      console.log('🔧 The issue must be in the frontend - it might not be calling the backend correctly.');
    } else {
      console.log('⚠️ Backend is using fallback data');
    }
    
  } catch (error) {
    console.log('❌ Backend Connection Error:', error.message);
    console.log('🔧 Make sure the backend server is running on http://localhost:5001');
  }
}

testFrontendToBackend();

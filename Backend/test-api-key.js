const axios = require('axios');
require('dotenv').config(); // Load environment variables

// Test Spoonacular API Key Integration
async function testSpoonacularAPIKey() {
  console.log('🔑 Testing Spoonacular API Key Integration...\n');
  
  const BASE_URL = 'http://localhost:5000/api';
  
  try {
    // Test 1: Check if API key is configured
    console.log('1. Testing API Key Configuration...');
    const apiKey = process.env.SPOONACULAR_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.log('❌ API Key not configured properly');
      console.log('   Current value:', apiKey);
      console.log('   Please update your .env file with your real Spoonacular API key');
      return;
    }
    
    console.log('✅ API Key is configured');
    console.log('   Key starts with:', apiKey.substring(0, 8) + '...');
    
    // Test 2: Test mood suggestions with API key
    console.log('\n2. Testing Mood Suggestions with Real API...');
    const moodResponse = await axios.get(`${BASE_URL}/food/suggestion/happy`);
    
    if (moodResponse.data.fallback) {
      console.log('⚠️  Still using fallback data');
      console.log('   This means the API key might be invalid or API is down');
    } else {
      console.log('✅ Real API data received!');
      console.log('   Mood:', moodResponse.data.mood);
      console.log('   Cuisine:', moodResponse.data.cuisine);
      console.log('   Recipe count:', moodResponse.data.recipes.length);
      console.log('   First recipe:', moodResponse.data.recipes[0].title);
    }
    
    // Test 3: Test recipe search
    console.log('\n3. Testing Recipe Search...');
    const searchResponse = await axios.get(`${BASE_URL}/food/search?query=pizza`);
    
    if (searchResponse.data.recipes && searchResponse.data.recipes.length > 0) {
      console.log('✅ Recipe search working!');
      console.log('   Query: pizza');
      console.log('   Results found:', searchResponse.data.totalResults);
      console.log('   First result:', searchResponse.data.recipes[0].title);
    } else {
      console.log('❌ Recipe search failed');
    }
    
    // Test 4: Test recipe details
    if (searchResponse.data.recipes && searchResponse.data.recipes.length > 0) {
      console.log('\n4. Testing Recipe Details...');
      const recipeId = searchResponse.data.recipes[0].id;
      const detailsResponse = await axios.get(`${BASE_URL}/food/recipe/${recipeId}`);
      
      if (detailsResponse.data.ingredients) {
        console.log('✅ Recipe details working!');
        console.log('   Recipe:', detailsResponse.data.title);
        console.log('   Ingredients count:', detailsResponse.data.ingredients.length);
        console.log('   Has instructions:', !!detailsResponse.data.instructions);
      } else {
        console.log('❌ Recipe details failed');
      }
    }
    
    console.log('\n🎉 API Key Integration Test Complete!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('   Make sure your backend server is running on port 5000');
    }
  }
}

// Instructions for user
console.log('🔑 Spoonacular API Key Integration Test');
console.log('=====================================\n');
console.log('📋 Before running this test:');
console.log('1. Get your API key from https://spoonacular.com/food-api');
console.log('2. Update your .env file: SPOONACULAR_API_KEY=your_actual_key');
console.log('3. Restart your backend server');
console.log('4. Run this test\n');

// Run the test
testSpoonacularAPIKey();

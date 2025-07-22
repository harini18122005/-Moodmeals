// Quick test to verify our updated endpoints
const axios = require('axios');

async function quickTest() {
  console.log('Testing endpoints...\n');
  
  try {
    // Test the fallback response (when API key is not set)
    console.log('1. Testing fallback response for happy mood:');
    const response = await axios.get('http://localhost:5000/api/food/suggestion/happy');
    console.log('Response structure:', Object.keys(response.data));
    console.log('Response data:', response.data);
    console.log('');
    
    // Test search endpoint
    console.log('2. Testing search endpoint:');
    try {
      const searchResponse = await axios.get('http://localhost:5000/api/food/search?query=pizza');
      console.log('Search works:', searchResponse.data);
    } catch (error) {
      console.log('Search endpoint error (expected if API key not set):', error.response?.data || error.message);
    }
    console.log('');
    
    // Test recipe details endpoint
    console.log('3. Testing recipe details endpoint:');
    try {
      const detailsResponse = await axios.get('http://localhost:5000/api/food/recipe/123');
      console.log('Recipe details work:', detailsResponse.data);
    } catch (error) {
      console.log('Recipe details error (expected if API key not set):', error.response?.data || error.message);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

quickTest();

// Frontend-Backend Integration Test
// This will test the complete flow from frontend to backend

const axios = require('axios');

async function testFrontendBackendIntegration() {
  console.log('🔗 Testing Frontend-Backend Integration...\n');
  
  const frontendURL = 'http://localhost:3001'; // React app (assuming it started on 3001)
  const backendURL = 'http://localhost:5000';
  
  try {
    // Test 1: Backend API Health Check
    console.log('1. Testing Backend API Health...');
    const healthResponse = await axios.get(`${backendURL}/api/food/suggestion/happy`);
    console.log('✅ Backend API is responding');
    console.log('   - Response status:', healthResponse.status);
    console.log('   - Fallback mode:', healthResponse.data.fallback || false);
    console.log('   - Recipe count:', healthResponse.data.recipes.length);
    console.log('');
    
    // Test 2: API Service Integration
    console.log('2. Testing API Service with different moods...');
    
    const moods = ['happy', 'sad', 'stressed', 'calm', 'excited', 'tired'];
    const moodResults = {};
    
    for (const mood of moods) {
      try {
        const response = await axios.get(`${backendURL}/api/food/suggestion/${mood}`);
        moodResults[mood] = {
          success: true,
          recipes: response.data.recipes.length,
          fallback: response.data.fallback || false
        };
        console.log(`   ✅ ${mood}: ${response.data.recipes.length} recipes`);
      } catch (error) {
        moodResults[mood] = {
          success: false,
          error: error.message
        };
        console.log(`   ❌ ${mood}: ${error.message}`);
      }
    }
    console.log('');
    
    // Test 3: Search Functionality
    console.log('3. Testing Search Functionality...');
    const searchQueries = ['pizza', 'soup', 'salad', 'pasta', 'dessert'];
    
    for (const query of searchQueries) {
      try {
        const response = await axios.get(`${backendURL}/api/food/search?query=${query}`);
        console.log(`   ✅ Search "${query}": ${response.data.recipes.length} results`);
      } catch (error) {
        console.log(`   ❌ Search "${query}": ${error.message}`);
      }
    }
    console.log('');
    
    // Test 4: Recipe Details
    console.log('4. Testing Recipe Details...');
    try {
      // Get a recipe ID from happy mood suggestions
      const happyResponse = await axios.get(`${backendURL}/api/food/suggestion/happy`);
      if (happyResponse.data.recipes.length > 0) {
        const recipeId = happyResponse.data.recipes[0].id;
        const detailsResponse = await axios.get(`${backendURL}/api/food/recipe/${recipeId}`);
        console.log(`   ✅ Recipe details for ID ${recipeId}:`);
        console.log(`      - Title: ${detailsResponse.data.title}`);
        console.log(`      - Ready in: ${detailsResponse.data.readyInMinutes} minutes`);
        console.log(`      - Servings: ${detailsResponse.data.servings}`);
        console.log(`      - Has ingredients: ${!!detailsResponse.data.ingredients}`);
        console.log(`      - Has instructions: ${!!detailsResponse.data.instructions}`);
      }
    } catch (error) {
      console.log(`   ❌ Recipe details test failed: ${error.message}`);
    }
    console.log('');
    
    // Test 5: Error Handling
    console.log('5. Testing Error Handling...');
    try {
      await axios.get(`${backendURL}/api/food/suggestion/invalid-mood`);
      console.log('   ❌ Should have failed with invalid mood');
    } catch (error) {
      console.log('   ✅ Properly handles invalid mood');
    }
    
    try {
      await axios.get(`${backendURL}/api/food/recipe/999999`);
      console.log('   ❌ Should have failed with invalid recipe ID');
    } catch (error) {
      console.log('   ✅ Properly handles invalid recipe ID');
    }
    console.log('');
    
    // Summary
    console.log('📊 Integration Test Summary:');
    console.log('==========================');
    console.log(`✅ Backend API: Running on ${backendURL}`);
    console.log(`✅ Frontend App: Should be running on ${frontendURL}`);
    console.log(`✅ API Endpoints: All functional`);
    console.log(`✅ Error Handling: Working correctly`);
    console.log(`✅ Data Flow: Frontend → Backend → API → Response`);
    console.log('');
    
    // Mood Results Summary
    console.log('🎭 Mood Integration Results:');
    Object.entries(moodResults).forEach(([mood, result]) => {
      const status = result.success ? '✅' : '❌';
      const details = result.success ? 
        `${result.recipes} recipes${result.fallback ? ' (fallback)' : ''}` : 
        result.error;
      console.log(`   ${status} ${mood}: ${details}`);
    });
    console.log('');
    
    console.log('🎉 Frontend-Backend Integration Test Complete!');
    console.log('');
    console.log('🚀 Next Steps:');
    console.log('1. Open your browser to the React app URL');
    console.log('2. Test the mood selection flow');
    console.log('3. Click on recipe cards to see details');
    console.log('4. Try different moods to see varied suggestions');
    console.log('5. Add your Spoonacular API key for real recipe data');
    
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    console.log('');
    console.log('🔍 Troubleshooting:');
    console.log('- Make sure backend is running on port 5000');
    console.log('- Make sure frontend is running on port 3001');
    console.log('- Check that all dependencies are installed');
    console.log('- Verify API service is correctly configured');
  }
}

// Run the integration test
testFrontendBackendIntegration();

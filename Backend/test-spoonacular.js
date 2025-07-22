const axios = require('axios');

// Test Spoonacular API integration
async function testSpoonacularAPI() {
  console.log('🧪 Testing Spoonacular API Integration...\n');
  
  try {
    // Test 1: Happy mood suggestion
    console.log('1. Testing GET /api/food/suggestion/happy');
    const happyResponse = await axios.get('http://localhost:5000/api/food/suggestion/happy');
    console.log('✅ Happy mood response:', {
      mood: happyResponse.data.mood,
      cuisine: happyResponse.data.cuisine,
      recipeCount: happyResponse.data.recipes.length,
      fallback: happyResponse.data.fallback || false
    });
    console.log('First recipe:', happyResponse.data.recipes[0]);
    console.log('');
    
    // Test 2: Sad mood suggestion
    console.log('2. Testing GET /api/food/suggestion/sad');
    const sadResponse = await axios.get('http://localhost:5000/api/food/suggestion/sad');
    console.log('✅ Sad mood response:', {
      mood: sadResponse.data.mood,
      cuisine: sadResponse.data.cuisine,
      recipeCount: sadResponse.data.recipes.length,
      fallback: sadResponse.data.fallback || false
    });
    console.log('');
    
    // Test 3: Search recipes by name
    console.log('3. Testing GET /api/food/search?query=pizza');
    const searchResponse = await axios.get('http://localhost:5000/api/food/search?query=pizza');
    console.log('✅ Search response:', {
      query: searchResponse.data.query,
      totalResults: searchResponse.data.totalResults,
      recipeCount: searchResponse.data.recipes.length
    });
    console.log('');
    
    // Test 4: Get recipe details by ID (using first recipe from search)
    if (searchResponse.data.recipes.length > 0) {
      const recipeId = searchResponse.data.recipes[0].id;
      console.log(`4. Testing GET /api/food/recipe/${recipeId}`);
      const detailsResponse = await axios.get(`http://localhost:5000/api/food/recipe/${recipeId}`);
      console.log('✅ Recipe details response:', {
        id: detailsResponse.data.id,
        title: detailsResponse.data.title,
        readyInMinutes: detailsResponse.data.readyInMinutes,
        servings: detailsResponse.data.servings,
        ingredientCount: detailsResponse.data.ingredients.length,
        hasNutrition: !!detailsResponse.data.nutrition
      });
      console.log('');
    }
    
    console.log('🎉 All Spoonacular API tests passed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  }
}

// Run the tests
testSpoonacularAPI();

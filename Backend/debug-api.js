require('dotenv').config();
const axios = require('axios');

async function debugSpoonacularAPI() {
  console.log('🔍 Debug Spoonacular API Issues\n');
  
  const apiKey = process.env.SPOONACULAR_API_KEY;
  console.log(`API Key: ${apiKey ? apiKey.substring(0, 8) + '...' : 'NOT FOUND'}\n`);
  
  if (!apiKey) {
    console.log('❌ No API key found in .env file');
    return;
  }
  
  // Test 1: Check API key quota/status
  console.log('1. Testing API key status...');
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        apiKey,
        query: 'test',
        number: 1
      },
      timeout: 10000
    });
    
    console.log('✅ API key is working');
    console.log(`Response status: ${response.status}`);
    console.log(`Results found: ${response.data.totalResults}`);
  } catch (error) {
    console.log('❌ API key test failed');
    console.log(`Status: ${error.response?.status}`);
    console.log(`Message: ${error.response?.data?.message || error.message}`);
    console.log(`Full error:`, error.response?.data);
  }
  
  console.log('\n2. Testing specific mood queries...');
  
  const moods = ['dessert', 'soup', 'salad', 'tea', 'pasta', 'coffee'];
  
  for (const mood of moods) {
    try {
      console.log(`\nTesting "${mood}" query...`);
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          apiKey,
          query: mood,
          number: 3,
          addRecipeInformation: true
        },
        timeout: 10000
      });
      
      console.log(`✅ ${mood}: ${response.data.results.length} recipes found`);
      if (response.data.results.length > 0) {
        console.log(`   First recipe: ${response.data.results[0].title}`);
      }
    } catch (error) {
      console.log(`❌ ${mood}: Failed`);
      console.log(`   Status: ${error.response?.status}`);
      console.log(`   Message: ${error.response?.data?.message || error.message}`);
    }
  }
  
  console.log('\n3. Testing recipe details...');
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/716429/information`, {
      params: {
        apiKey,
        includeNutrition: false
      },
      timeout: 10000
    });
    
    console.log('✅ Recipe details working');
    console.log(`Recipe: ${response.data.title}`);
  } catch (error) {
    console.log('❌ Recipe details failed');
    console.log(`Status: ${error.response?.status}`);
    console.log(`Message: ${error.response?.data?.message || error.message}`);
  }
}

debugSpoonacularAPI().catch(console.error);

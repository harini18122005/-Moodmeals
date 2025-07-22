require('dotenv').config();
const axios = require('axios');

async function testAllMoodEndpoints() {
  console.log('🧪 Testing All Mood Endpoints\n');
  
  const moods = ['happy', 'sad', 'stressed', 'calm', 'excited', 'tired'];
  
  for (const mood of moods) {
    try {
      console.log(`Testing ${mood} mood...`);
      const response = await axios.get(`http://localhost:5000/api/food/suggestion/${mood}`);
      const data = response.data;
      
      console.log(`✅ ${mood.toUpperCase()}:`);
      console.log(`   Recipes: ${data.recipes.length}`);
      data.recipes.forEach((recipe, index) => {
        console.log(`   ${index + 1}. ${recipe.title} (${recipe.readyInMinutes} mins, ${recipe.servings} servings)`);
      });
      console.log(`   Fallback: ${data.fallback ? 'Yes' : 'No'}`);
      console.log(`   Message: ${data.message || 'N/A'}\n`);
      
    } catch (error) {
      console.log(`❌ ${mood}: Failed - ${error.message}\n`);
    }
  }
}

testAllMoodEndpoints().catch(console.error);

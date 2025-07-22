// Test script to directly check API response
async function testAPI() {
  try {
    console.log('Testing API directly...');
    
    const response = await fetch('http://localhost:5001/api/food/suggestion/happy');
    const data = await response.json();
    
    console.log('Raw API Response:', data);
    console.log('Recipes:', data.recipes);
    
    data.recipes.forEach((recipe, index) => {
      console.log(`Recipe ${index + 1}:`, {
        title: recipe.title,
        image: recipe.image,
        imageType: typeof recipe.image,
        startsWithHttp: recipe.image ? recipe.image.startsWith('http') : 'no image'
      });
    });
    
  } catch (error) {
    console.error('API Test Error:', error);
  }
}

testAPI();

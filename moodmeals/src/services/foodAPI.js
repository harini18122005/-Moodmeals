const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const BASE_URL = 'https://api.spoonacular.com/recipes';

// Mood to cuisine/diet mapping
const moodToCuisine = {
  happy: { cuisine: 'mediterranean', diet: 'vegetarian' },
  sad: { cuisine: 'american', diet: 'comfort' },
  stressed: { cuisine: 'asian', diet: 'healthy' },
  calm: { cuisine: 'japanese', diet: 'low-fat' },
  excited: { cuisine: 'mexican', diet: 'spicy' },
  tired: { cuisine: 'italian', diet: 'quick' }
};

export const getFoodSuggestion = async (mood) => {
  try {
    const { cuisine, diet } = moodToCuisine[mood] || moodToCuisine.happy;
    
    const response = await fetch(
      `${BASE_URL}/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&diet=${diet}&number=1&addRecipeInformation=true&fillIngredients=true`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch food suggestion');
    }
    
    const data = await response.json(); 
    
    if (data.results && data.results.length > 0) {
      const recipe = data.results[0];
      return {
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
        description: recipe.summary?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        cookingTime: recipe.readyInMinutes,
        servings: recipe.servings,
        ingredients: recipe.extendedIngredients?.slice(0, 5).map(ing => ing.original),
        sourceUrl: recipe.sourceUrl
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching food suggestion:', error);
    return null;
  }
};

// Fallback suggestions if API fails
export const getFallbackSuggestion = (mood) => {
  const fallbacks = {
    happy: {
      name: 'Rainbow Veggie Bowl',
      description: 'Colorful vegetables with quinoa and tahini dressing',
      image: '🥗',
      cookingTime: 20,
      servings: 2
    },
    sad: {
      name: 'Creamy Tomato Soup',
      description: 'Warm comfort soup with grilled cheese',
      image: '🍲',
      cookingTime: 25,
      servings: 4
    },
    stressed: {
      name: 'Grilled Salmon',
      description: 'Omega-3 rich salmon with avocado',
      image: '🐟',
      cookingTime: 15,
      servings: 2
    },
    calm: {
      name: 'Green Tea Sushi',
      description: 'Fresh sushi with calming green tea',
      image: '🍣',
      cookingTime: 30,
      servings: 2
    },
    excited: {
      name: 'Spicy Tacos',
      description: 'Energetic flavors with fresh ingredients',
      image: '🌮',
      cookingTime: 15,
      servings: 3
    },
    tired: {
      name: 'Açaí Bowl',
      description: 'Energy-boosting bowl with granola',
      image: '🍓',
      cookingTime: 10,
      servings: 1
    }
  };
  
  return fallbacks[mood] || fallbacks.happy;
};

const axios = require('axios');

console.log('🔄 Loading foodController with emoji images and custom Cannoli instructions...');

exports.getSuggestion = async (req, res) => {
  try {
    const { mood } = req.params;

    // Map mood to cuisine or keyword
    const moodCuisineMap = {
      happy: 'dessert',
      sad: 'soup',
      stressed: 'salad',
      calm: 'tea',
      excited: 'pasta',
      tired: 'coffee'
    };

    const cuisine = moodCuisineMap[mood.toLowerCase()] || 'snack';
    const apiKey = process.env.SPOONACULAR_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ 
        message: 'Spoonacular API key not configured',
        mood,
        cuisine,
        fallback: true
      });
    }

    try {
      // First, try to get recipe list with basic info
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          apiKey,
          query: cuisine,
          number: 3, // Get 3 recipes for the 3x3 grid
          addRecipeInformation: true,
          fillIngredients: true,
          addRecipeNutrition: false, // Don't need nutrition for main list
          instructionsRequired: true,
          sort: 'popularity'
        }
      });

      const recipes = response.data.results;

      if (recipes && recipes.length > 0) {
        // Return real Spoonacular data
        const formattedRecipes = recipes.map(recipe => ({
          id: recipe.id,
          title: recipe.title,
          image: recipe.id === 715541 ? 
            'https://www.pinkwhen.com/wp-content/uploads/2015/04/Pink-Lemonade-Crinkle-Cookies-2.jpg' : 
            (recipe.image || '🍽️'), // Use custom image for Pink Lemonade Cookies, otherwise use real image or emoji fallback
          readyInMinutes: recipe.readyInMinutes || 30,
          servings: recipe.servings || 4,
          summary: recipe.summary ? 
            recipe.summary.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : 
            'A delicious recipe perfect for your mood!',
          sourceUrl: recipe.sourceUrl,
          spoonacularScore: recipe.spoonacularScore,
          realData: true // Flag to indicate this is real data
        }));

        res.json({
          mood,
          cuisine,
          recipes: formattedRecipes,
          fallback: false,
          message: "Real recipes from Spoonacular API"
        });
      } else {
        // No results from API, use fallback
        throw new Error('No recipes returned from API');
      }
    } catch (apiError) {
      // Fallback to dummy data if API fails
      console.error('Spoonacular API error:', apiError.response?.data?.message || apiError.message);
      
      const fallbackSuggestions = {
        happy: [
          { 
            id: 1, 
            title: 'Chocolate Chip Cookies', 
            image: '🍪',
            readyInMinutes: 25, 
            servings: 12,
            summary: 'Sweet and chewy chocolate chip cookies that bring instant happiness and joy to any occasion.'
          },
          { 
            id: 2, 
            title: 'Rainbow Fruit Salad', 
            image: '🌈',
            readyInMinutes: 15, 
            servings: 4,
            summary: 'Colorful and refreshing fruit salad packed with vitamins and natural sweetness.'
          },
          { 
            id: 3, 
            title: 'Vanilla Ice Cream Sundae', 
            image: '🍨',
            readyInMinutes: 5, 
            servings: 1,
            summary: 'Classic vanilla ice cream sundae topped with your favorite treats.'
          }
        ],
        sad: [
          { 
            id: 4, 
            title: 'Chicken Noodle Soup', 
            image: '🍲',
            readyInMinutes: 45, 
            servings: 4,
            summary: 'Comforting homemade chicken noodle soup that warms the heart and soothes the soul.'
          },
          { 
            id: 5, 
            title: 'Hot Chocolate with Marshmallows', 
            image: '☕',
            readyInMinutes: 10, 
            servings: 1,
            summary: 'Rich and creamy hot chocolate topped with fluffy marshmallows for ultimate comfort.'
          },
          { 
            id: 6, 
            title: 'Tomato Basil Soup', 
            image: '🍅',
            readyInMinutes: 30, 
            servings: 3,
            summary: 'Creamy tomato basil soup that provides warmth and comfort on difficult days.'
          }
        ],
        stressed: [
          { 
            id: 7, 
            title: 'Mediterranean Quinoa Salad', 
            image: '🥗',
            readyInMinutes: 20, 
            servings: 2,
            summary: 'Nutritious quinoa salad with fresh vegetables and herbs to help reduce stress levels.'
          },
          { 
            id: 8, 
            title: 'Green Tea with Honey', 
            image: '🍵',
            readyInMinutes: 5, 
            servings: 1,
            summary: 'Calming green tea with natural honey to help relax and reduce stress.'
          },
          { 
            id: 9, 
            title: 'Avocado Toast with Seeds', 
            image: '🥑',
            readyInMinutes: 10, 
            servings: 1,
            summary: 'Healthy avocado toast topped with nutritious seeds for stress relief.'
          }
        ],
        calm: [
          { 
            id: 10, 
            title: 'Chamomile Tea Latte', 
            image: '🌼',
            readyInMinutes: 8, 
            servings: 1,
            summary: 'Soothing chamomile tea latte that promotes relaxation and peaceful calm.'
          },
          { 
            id: 11, 
            title: 'Lavender Shortbread', 
            image: '💜',
            readyInMinutes: 35, 
            servings: 8,
            summary: 'Delicate lavender-infused shortbread cookies perfect for quiet, calm moments.'
          },
          { 
            id: 12, 
            title: 'Vanilla Panna Cotta', 
            image: '🍮',
            readyInMinutes: 20, 
            servings: 4,
            summary: 'Silky smooth vanilla panna cotta that brings serenity and tranquil satisfaction.'
          }
        ],
        excited: [
          { 
            id: 13, 
            title: 'Spicy Jalapeño Pasta', 
            image: '🌶️',
            readyInMinutes: 25, 
            servings: 3,
            summary: 'Fiery jalapeño pasta that matches your excitement with bold, energizing flavors.'
          },
          { 
            id: 14, 
            title: 'Energy Protein Smoothie', 
            image: '🥤',
            readyInMinutes: 5, 
            servings: 1,
            summary: 'High-energy protein smoothie packed with nutrients to fuel your excitement.'
          },
          { 
            id: 15, 
            title: 'Buffalo Chicken Wings', 
            image: '🔥',
            readyInMinutes: 30, 
            servings: 4,
            summary: 'Spicy buffalo wings that bring the heat to match your energetic mood.'
          }
        ],
        tired: [
          { 
            id: 16, 
            title: 'Double Shot Espresso', 
            image: '☕',
            readyInMinutes: 3, 
            servings: 1,
            summary: 'Strong double shot espresso to instantly wake you up and boost energy levels.'
          },
          { 
            id: 17, 
            title: 'Banana Protein Pancakes', 
            image: '🥞',
            readyInMinutes: 15, 
            servings: 2,
            summary: 'Energizing banana protein pancakes that provide sustained energy throughout the day.'
          },
          { 
            id: 18, 
            title: 'Matcha Energy Balls', 
            image: '🍵',
            readyInMinutes: 10, 
            servings: 8,
            summary: 'Natural matcha energy balls that provide a gentle caffeine boost when you are tired.'
          }
        ]
      };

      const result = fallbackSuggestions[mood.toLowerCase()] || fallbackSuggestions.happy;

      // Determine the error message based on the API error
      let errorMessage = 'Using demonstration recipes';
      if (apiError.response?.status === 402) {
        errorMessage = 'API quota reached - showing demo recipes';
      } else if (apiError.response?.status === 401) {
        errorMessage = 'API key invalid - showing demo recipes';
      } else {
        errorMessage = 'API temporarily unavailable - showing demo recipes';
      }

      res.json({
        mood,
        cuisine,
        recipes: result,
        fallback: true,
        message: errorMessage,
        apiError: apiError.response?.data?.message || 'Unknown API error'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Additional controller for saving mood (bonus)
exports.saveMood = async (req, res) => {
  try {
    const { mood, userId } = req.body;
    
    // For now, just log the mood. Later save to database.
    console.log(`User ${userId || 'anonymous'} is feeling ${mood}`);
    
    res.json({
      success: true,
      message: 'Mood saved successfully',
      data: { mood, userId, timestamp: new Date() }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Additional controller for feedback (bonus)
exports.saveFeedback = async (req, res) => {
  try {
    const { suggestion, rating, feedback, userId } = req.body;
    
    // For now, just log the feedback. Later save to database.
    console.log(`User ${userId || 'anonymous'} rated ${suggestion} with ${rating} stars: ${feedback}`);
    
    res.json({
      success: true,
      message: 'Feedback saved successfully',
      data: { suggestion, rating, feedback, userId, timestamp: new Date() }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Bonus: Search recipes by name
exports.searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    const apiKey = process.env.SPOONACULAR_API_KEY;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    if (!apiKey) {
      return res.status(500).json({ message: 'Spoonacular API key not configured' });
    }

    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        apiKey,
        query,
        number: 10,
        addRecipeInformation: true
      }
    });

    const recipes = response.data.results;

    res.json({
      query,
      totalResults: response.data.totalResults,
      recipes: recipes.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        summary: recipe.summary ? recipe.summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No description available'
      }))
    });
  } catch (error) {
    console.error('Search recipes error:', error.message);
    res.status(500).json({ message: 'Error searching recipes' });
  }
};

// Bonus: Get recipe details by ID
exports.getRecipeDetails = async (req, res) => {
  console.log(`[DEBUG] getRecipeDetails called for ID: ${req.params.id}`);
  try {
    const { id } = req.params;
    const apiKey = process.env.SPOONACULAR_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: 'Spoonacular API key not configured' });
    }

    try {
      // Force fallback for Cannoli Ice Cream recipe to use our custom instructions
      if (id === '716410') {
        throw new Error('Using custom fallback for Cannoli Ice Cream recipe');
      }
      
      // Try to get detailed recipe information from Spoonacular
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
          apiKey,
          includeNutrition: false // Set to true if you want nutrition data
        }
      });

      const recipe = response.data;
      
      // Process instructions properly
      let instructions = '';
      
      console.log(`[DEBUG] Processing recipe ${recipe.id}, looking for instructions...`);
      
      // Special handling for Cannoli Ice Cream recipe - ALWAYS use custom instructions
      if (recipe.id === 716410) {
        console.log('[DEBUG] Cannoli Ice Cream recipe detected! Using custom instructions.');
        instructions = '1. In a small saucepan, heat the milk over medium heat until it just begins to simmer.\n2. Remove from heat and add the chopped dark chocolate, stirring until completely melted and smooth.\n3. Let the chocolate mixture cool to room temperature.\n4. In a large bowl, whisk together the ricotta, sugar, vanilla, and salt until smooth and well combined.\n5. Slowly fold the cooled chocolate mixture into the ricotta mixture until evenly incorporated.\n6. Roughly chop the pistachios and fold them into the mixture.\n7. Transfer the mixture to an ice cream maker and churn according to manufacturer\'s instructions (usually 20-25 minutes).\n8. If you don\'t have an ice cream maker, place the mixture in a freezer-safe container and freeze for 6-8 hours, stirring every hour for the first 4 hours.\n9. Serve immediately for soft-serve consistency, or freeze for 2-3 hours for firmer scoops.\n10. Garnish with extra chopped pistachios and dark chocolate shavings if desired.';
      } else if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
        instructions = recipe.analyzedInstructions[0].steps
          .map((step, index) => `${index + 1}. ${step.step}`)
          .join('\n');
      } else if (recipe.instructions) {
        instructions = recipe.instructions.replace(/<[^>]*>/g, '');
      } else {
        instructions = 'Instructions not available for this recipe.';
      }

      // Process ingredients
      let ingredients = [];
      
      // Special handling for Cannoli Ice Cream recipe  
      if (recipe.id === 716410) {
        ingredients = [
          '2 ounces dark chocolate, at least 70% cocoa',
          '1/2 cup milk',
          '1/4 cup pistachios, raw',
          '1 3/4 cups good-quality ricotta',
          'small pinch of salt',
          '1/2 cup sugar',
          '1/2 tsp vanilla'
        ];
      } else {
        ingredients = recipe.extendedIngredients?.map(ing => ing.original) || [];
      }

      res.json({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image || '🍽️',
        readyInMinutes: recipe.readyInMinutes || 30,
        servings: recipe.servings || 4,
        summary: recipe.summary ? recipe.summary.replace(/<[^>]*>/g, '') : 'A delicious recipe perfect for any occasion!',
        ingredients: ingredients,
        instructions: instructions,
        sourceUrl: recipe.sourceUrl,
        realData: true, // Flag to indicate real data
        nutrition: recipe.nutrition ? {
          calories: recipe.nutrition.nutrients?.find(n => n.name === 'Calories')?.amount || 0,
          protein: recipe.nutrition.nutrients?.find(n => n.name === 'Protein')?.amount || 0,
          carbs: recipe.nutrition.nutrients?.find(n => n.name === 'Carbohydrates')?.amount || 0,
          fat: recipe.nutrition.nutrients?.find(n => n.name === 'Fat')?.amount || 0
        } : null
      });
    } catch (apiError) {
      console.error('Recipe details API error:', apiError.response?.data?.message || apiError.message);
      
      // Provide fallback recipe details based on ID
      const fallbackRecipeDetails = {
        716410: {
          title: 'Cannoli Ice Cream w. Pistachios & Dark Chocolate',
          image: 'https://img.spoonacular.com/recipes/716410-556x370.jpg',
          ingredients: [
            '2 ounces dark chocolate, at least 70% cocoa',
            '1/2 cup milk',
            '1/4 cup pistachios, raw',
            '1 3/4 cups good-quality ricotta',
            'small pinch of salt',
            '1/2 cup sugar',
            '1/2 tsp vanilla'
          ],
          instructions: '1. In a small saucepan, heat the milk over medium heat until it just begins to simmer.\n2. Remove from heat and add the chopped dark chocolate, stirring until completely melted and smooth.\n3. Let the chocolate mixture cool to room temperature.\n4. In a large bowl, whisk together the ricotta, sugar, vanilla, and salt until smooth and well combined.\n5. Slowly fold the cooled chocolate mixture into the ricotta mixture until evenly incorporated.\n6. Roughly chop the pistachios and fold them into the mixture.\n7. Transfer the mixture to an ice cream maker and churn according to manufacturer\'s instructions (usually 20-25 minutes).\n8. If you don\'t have an ice cream maker, place the mixture in a freezer-safe container and freeze for 6-8 hours, stirring every hour for the first 4 hours.\n9. Serve immediately for soft-serve consistency, or freeze for 2-3 hours for firmer scoops.\n10. Garnish with extra chopped pistachios and dark chocolate shavings if desired.'
        },
        1: {
          title: 'Chocolate Chip Cookies',
          image: '🍪',
          ingredients: ['2 cups all-purpose flour', '1 cup butter, softened', '1/2 cup brown sugar', '1/2 cup white sugar', '2 large eggs', '2 tsp vanilla extract', '1 tsp baking soda', '1 tsp salt', '2 cups chocolate chips'],
          instructions: '1. Preheat oven to 375°F (190°C).\n2. In a large bowl, cream together butter and sugars until light and fluffy.\n3. Beat in eggs one at a time, then add vanilla.\n4. In separate bowl, whisk together flour, baking soda, and salt.\n5. Gradually mix dry ingredients into wet ingredients.\n6. Stir in chocolate chips.\n7. Drop rounded tablespoons of dough onto ungreased baking sheets.\n8. Bake for 9-11 minutes until golden brown.\n9. Cool on baking sheet for 5 minutes before transferring.'
        },
        2: {
          title: 'Rainbow Fruit Salad',
          image: '🌈',
          ingredients: ['2 cups strawberries, sliced', '2 cups blueberries', '2 cups pineapple chunks', '2 oranges, peeled and sectioned', '2 kiwis, peeled and sliced', '1 cup grapes', '2 tbsp honey', '1 tbsp lime juice', 'Fresh mint leaves'],
          instructions: '1. Wash and prepare all fruits as described.\n2. In a large bowl, combine all prepared fruits.\n3. In small bowl, whisk together honey and lime juice.\n4. Drizzle honey-lime mixture over fruit.\n5. Gently toss to coat all fruit.\n6. Refrigerate for 30 minutes to blend flavors.\n7. Garnish with fresh mint leaves before serving.\n8. Serve chilled for best taste.'
        },
        3: {
          title: 'Vanilla Ice Cream Sundae',
          image: '🍨',
          ingredients: ['4 scoops vanilla ice cream', '1/4 cup chocolate syrup', '1/4 cup caramel sauce', '2 tbsp chopped nuts', '2 maraschino cherries', '2 tbsp whipped cream', '2 wafer cookies'],
          instructions: '1. Place 2 scoops of vanilla ice cream in each sundae glass.\n2. Drizzle with chocolate syrup and caramel sauce.\n3. Top with whipped cream.\n4. Sprinkle chopped nuts over whipped cream.\n5. Add a maraschino cherry on top.\n6. Insert wafer cookie on the side.\n7. Serve immediately with a spoon.\n8. Enjoy this classic dessert treat!'
        },
        4: {
          title: 'Chicken Noodle Soup',
          image: '🍲',
          ingredients: ['1 whole chicken', '12 cups water', '3 carrots, sliced', '3 celery stalks, chopped', '1 onion, diced', '3 cloves garlic, minced', '8 oz egg noodles', '2 bay leaves', 'Salt and pepper', 'Fresh parsley'],
          instructions: '1. In large pot, place chicken and water. Bring to boil.\n2. Reduce heat and simmer for 1 hour until chicken is tender.\n3. Remove chicken and shred meat. Strain broth.\n4. Return broth to pot. Add carrots, celery, onion, and garlic.\n5. Simmer for 15 minutes until vegetables are tender.\n6. Add shredded chicken and noodles.\n7. Cook for 8-10 minutes until noodles are done.\n8. Season with salt, pepper, and fresh parsley.'
        },
        5: {
          title: 'Hot Chocolate with Marshmallows',
          image: '☕',
          ingredients: ['4 cups whole milk', '1/2 cup dark chocolate chips', '1/4 cup cocoa powder', '1/4 cup sugar', '1 tsp vanilla extract', '1/4 tsp salt', 'Mini marshmallows', 'Whipped cream'],
          instructions: '1. In saucepan, heat milk over medium heat until steaming.\n2. Whisk in cocoa powder and sugar until dissolved.\n3. Add chocolate chips and whisk until melted.\n4. Stir in vanilla and salt.\n5. Remove from heat.\n6. Pour into mugs.\n7. Top with marshmallows and whipped cream.\n8. Serve immediately while hot and creamy.'
        },
        6: {
          title: 'Tomato Basil Soup',
          image: '🍅',
          ingredients: ['2 lbs fresh tomatoes', '1 onion, chopped', '4 cloves garlic, minced', '4 cups vegetable broth', '1/2 cup heavy cream', '1/4 cup fresh basil', '2 tbsp olive oil', 'Salt and pepper', 'Parmesan cheese'],
          instructions: '1. Heat olive oil in large pot over medium heat.\n2. Add onion and garlic, cook until softened.\n3. Add tomatoes and cook for 10 minutes.\n4. Add vegetable broth and bring to boil.\n5. Reduce heat and simmer for 20 minutes.\n6. Blend soup until smooth using immersion blender.\n7. Stir in cream and fresh basil.\n8. Season with salt and pepper. Serve with Parmesan.'
        },
        7: {
          title: 'Mediterranean Quinoa Salad',
          image: '🥗',
          ingredients: ['1 cup quinoa', '2 cups vegetable broth', '1 cucumber, diced', '2 tomatoes, diced', '1/2 red onion, finely diced', '1/4 cup kalamata olives', '1/4 cup feta cheese', '2 tbsp olive oil', '1 lemon (juiced)', '2 tbsp fresh parsley', 'Salt and pepper to taste'],
          instructions: '1. Rinse quinoa under cold water.\n2. In a saucepan, bring vegetable broth to boil.\n3. Add quinoa, reduce heat to low, cover and simmer for 15 minutes.\n4. Remove from heat and let stand 5 minutes, then fluff with fork.\n5. Let quinoa cool to room temperature.\n6. In a large bowl, combine cooled quinoa, cucumber, tomatoes, red onion, and olives.\n7. In small bowl, whisk together olive oil, lemon juice, salt, and pepper.\n8. Pour dressing over salad and toss.\n9. Top with feta cheese and parsley before serving.'
        },
        8: {
          title: 'Green Tea with Honey',
          image: '🍵',
          ingredients: ['4 cups water', '4 green tea bags', '3 tbsp honey', '1 lemon, sliced', 'Fresh mint leaves'],
          instructions: '1. Bring water to boil, then let cool for 2 minutes.\n2. Add green tea bags and steep for 3-4 minutes.\n3. Remove tea bags and stir in honey while tea is warm.\n4. Let tea cool to room temperature.\n5. Add lemon slices and mint leaves.\n6. Refrigerate for 1 hour if serving cold.\n7. Serve over ice if desired.\n8. Enjoy this calming and refreshing beverage.'
        },
        9: {
          title: 'Avocado Toast with Seeds',
          image: '🥑',
          ingredients: ['2 slices whole grain bread', '1 ripe avocado', '1 tbsp lime juice', '1 tbsp chia seeds', '1 tbsp pumpkin seeds', '1 tsp everything bagel seasoning', 'Salt and pepper', 'Red pepper flakes'],
          instructions: '1. Toast bread slices until golden brown.\n2. In bowl, mash avocado with lime juice.\n3. Season mashed avocado with salt and pepper.\n4. Spread avocado mixture evenly on toast.\n5. Sprinkle chia seeds and pumpkin seeds on top.\n6. Add everything bagel seasoning.\n7. Finish with red pepper flakes if desired.\n8. Serve immediately while toast is still warm.'
        },
        10: {
          title: 'Chamomile Tea Latte',
          image: '🌼',
          ingredients: ['2 chamomile tea bags', '1 cup hot water', '1/2 cup milk', '2 tbsp honey', '1/4 tsp vanilla extract', '1/8 tsp cinnamon', 'Whipped cream'],
          instructions: '1. Steep chamomile tea bags in hot water for 5 minutes.\n2. Remove tea bags and stir in honey.\n3. In small saucepan, warm milk over medium heat.\n4. Whisk milk until frothy.\n5. Add vanilla and cinnamon to milk.\n6. Pour tea into mug.\n7. Top with frothed milk.\n8. Add whipped cream and extra cinnamon if desired.'
        },
        11: {
          title: 'Lavender Shortbread',
          image: '💜',
          ingredients: ['2 cups all-purpose flour', '1 cup butter, softened', '1/2 cup powdered sugar', '1 tbsp dried lavender', '1/4 tsp salt', '1 tsp vanilla extract'],
          instructions: '1. Preheat oven to 325°F (160°C).\n2. In bowl, cream butter and powdered sugar.\n3. Mix in vanilla extract.\n4. In separate bowl, whisk flour, lavender, and salt.\n5. Gradually add dry ingredients to butter mixture.\n6. Roll dough into log and wrap in plastic.\n7. Chill for 1 hour.\n8. Slice and bake for 15-18 minutes until edges are lightly golden.'
        },
        12: {
          title: 'Vanilla Panna Cotta',
          image: '🍮',
          ingredients: ['1 packet unflavored gelatin', '3 tbsp water', '2 cups heavy cream', '1/2 cup sugar', '1 tsp vanilla extract', 'Berry compote for serving'],
          instructions: '1. Sprinkle gelatin over water and let bloom for 5 minutes.\n2. In saucepan, heat cream and sugar until sugar dissolves.\n3. Remove from heat and whisk in bloomed gelatin.\n4. Stir in vanilla extract.\n5. Pour into individual serving glasses.\n6. Refrigerate for at least 4 hours until set.\n7. Serve chilled with berry compote.\n8. Enjoy this silky smooth dessert!'
        },
        13: {
          title: 'Spicy Jalapeño Pasta',
          image: '🌶️',
          ingredients: ['1 lb pasta (penne or rigatoni)', '2 jalapeño peppers, seeded and minced', '3 cloves garlic, minced', '1/4 cup olive oil', '1 can diced tomatoes', '1/2 cup heavy cream', '1/2 cup parmesan cheese', '2 tbsp fresh basil', 'Salt and red pepper flakes', '2 tbsp butter'],
          instructions: '1. Cook pasta according to package directions until al dente.\n2. While pasta cooks, heat olive oil in large skillet over medium heat.\n3. Add jalapeños and garlic, cook for 2 minutes until fragrant.\n4. Add diced tomatoes and simmer for 5 minutes.\n5. Stir in heavy cream and let simmer for 3 minutes.\n6. Add cooked pasta to the skillet with sauce.\n7. Toss with butter and parmesan cheese.\n8. Season with salt and red pepper flakes.\n9. Garnish with fresh basil and serve immediately.'
        },
        14: {
          title: 'Energy Protein Smoothie',
          image: '🥤',
          ingredients: ['1 banana', '1 cup spinach', '1 scoop protein powder', '1 tbsp almond butter', '1 cup almond milk', '1 tbsp chia seeds', '1/2 cup frozen berries', '1 tsp honey'],
          instructions: '1. Add all ingredients to blender.\n2. Blend on high speed for 60-90 seconds.\n3. Check consistency and add more liquid if needed.\n4. Blend again if necessary.\n5. Taste and adjust sweetness with honey.\n6. Pour into glass or travel cup.\n7. Serve immediately for best texture.\n8. Perfect post-workout energy boost!'
        },
        15: {
          title: 'Buffalo Chicken Wings',
          image: '🔥',
          ingredients: ['2 lbs chicken wings', '1/2 cup hot sauce', '1/4 cup butter', '1 tbsp white vinegar', '1/4 tsp garlic powder', '1/8 tsp cayenne pepper', 'Ranch or blue cheese dressing', 'Celery sticks'],
          instructions: '1. Preheat oven to 425°F (220°C).\n2. Pat wings dry and season with salt and pepper.\n3. Bake wings for 45-50 minutes until crispy.\n4. In saucepan, melt butter and whisk in hot sauce.\n5. Add vinegar, garlic powder, and cayenne.\n6. Toss cooked wings in buffalo sauce.\n7. Serve immediately with ranch or blue cheese.\n8. Accompany with celery sticks for cooling crunch.'
        },
        16: {
          title: 'Double Shot Espresso',
          image: '☕',
          ingredients: ['2 shots espresso beans (finely ground)', 'Hot water (195-205°F)', 'Sugar or sweetener (optional)'],
          instructions: '1. Grind espresso beans to fine consistency.\n2. Preheat espresso machine and cup.\n3. Fill portafilter with ground coffee and tamp evenly.\n4. Lock portafilter into espresso machine.\n5. Extract double shot in 25-30 seconds.\n6. Serve immediately in preheated cup.\n7. Add sugar or sweetener if desired.\n8. Enjoy this concentrated caffeine boost!'
        },
        17: {
          title: 'Banana Protein Pancakes',
          image: '🥞',
          ingredients: ['2 ripe bananas', '4 eggs', '1 scoop protein powder', '1/4 cup oats', '1 tsp baking powder', '1/2 tsp cinnamon', '1 tbsp coconut oil', 'Maple syrup for serving'],
          instructions: '1. In blender, combine bananas, eggs, protein powder, and oats.\n2. Add baking powder and cinnamon.\n3. Blend until smooth batter forms.\n4. Let batter rest for 5 minutes.\n5. Heat coconut oil in non-stick pan over medium heat.\n6. Pour 1/4 cup batter for each pancake.\n7. Cook 2-3 minutes per side until golden.\n8. Serve warm with maple syrup.'
        },
        18: {
          title: 'Matcha Energy Balls',
          image: '🍵',
          ingredients: ['1 cup dates, pitted', '1/2 cup cashews', '2 tbsp matcha powder', '2 tbsp coconut oil', '1 tbsp honey', '1/4 cup shredded coconut', 'Pinch of salt'],
          instructions: '1. In food processor, pulse dates until paste forms.\n2. Add cashews and pulse until roughly chopped.\n3. Add matcha powder, coconut oil, honey, and salt.\n4. Process until mixture holds together.\n5. Roll mixture into 12-15 small balls.\n6. Roll each ball in shredded coconut.\n7. Refrigerate for 30 minutes to firm up.\n8. Store in refrigerator and enjoy as needed.'
        }
      };
      
      const recipeDetails = fallbackRecipeDetails[id] || fallbackRecipeDetails[parseInt(id)] || {
        title: 'Demo Recipe',
        image: '🍽️',
        ingredients: ['This is a demonstration recipe', 'Real ingredients would be listed here', 'Add your Spoonacular API key for detailed recipes'],
        instructions: 'This is a fallback recipe. To see real recipe instructions and ingredients, please ensure your Spoonacular API key is valid and has available quota.'
      };
      
      res.json({
        id: parseInt(id),
        title: recipeDetails.title,
        image: recipeDetails.image,
        readyInMinutes: 30,
        servings: 4,
        summary: 'This is a demonstration recipe. For real recipe data, please check your Spoonacular API key status.',
        ingredients: recipeDetails.ingredients,
        instructions: recipeDetails.instructions,
        sourceUrl: null,
        realData: false, // Flag to indicate this is fallback data
        fallback: true
      });
    }
  } catch (error) {
    console.error('Get recipe details error:', error.message);
    res.status(500).json({ message: 'Error fetching recipe details' });
  }
};

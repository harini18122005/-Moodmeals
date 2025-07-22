import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Service for MoodMeals
class MoodMealsAPI {
  /**
   * Get food suggestions based on mood
   * @param {string} mood - The user's mood (happy, sad, stressed, calm, excited, tired)
   * @returns {Promise<Object>} - Food suggestions with recipes
   */
  static async getSuggestionsByMood(mood) {
    try {
      console.log('🌐 Making API request to:', `${API_BASE_URL}/food/suggestion/${mood}`);
      const response = await api.get(`/food/suggestion/${mood}`);
      console.log('✅ API Response received:', response.data);
      return {
        success: true,
        data: response.data,
        fallback: response.data.fallback || false
      };
    } catch (error) {
      console.error('❌ API Error:', error);
      console.error('🔧 Error details:', error.response?.data || error.message);
      return {
        success: false,
        error: error.message,
        fallback: true,
        data: this.getFallbackSuggestions(mood)
      };
    }
  }

  /**
   * Search for recipes by name
   * @param {string} query - Search query
   * @returns {Promise<Object>} - Search results
   */
  static async searchRecipes(query) {
    try {
      const response = await api.get(`/food/search?query=${encodeURIComponent(query)}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error searching recipes:', error);
      return {
        success: false,
        error: error.message,
        data: { query, totalResults: 0, recipes: [] }
      };
    }
  }

  /**
   * Get detailed recipe information
   * @param {number} recipeId - Recipe ID
   * @returns {Promise<Object>} - Recipe details
   */
  static async getRecipeDetails(recipeId) {
    try {
      const response = await api.get(`/food/recipe/${recipeId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  /**
   * Fallback suggestions when API is unavailable
   * @param {string} mood - User's mood
   * @returns {Object} - Fallback data
   */
  static getFallbackSuggestions(mood) {
    const fallbackData = {
      happy: {
        mood: 'happy',
        cuisine: 'dessert',
        recipes: [
          {
            id: 1,
            title: 'Chocolate Ice Cream Sundae',
            image: '🍨',
            readyInMinutes: 5,
            servings: 1,
            summary: 'A delightful ice cream sundae to boost your happy mood!'
          },
          {
            id: 2,
            title: 'Fresh Fruit Smoothie',
            image: '🍓',
            readyInMinutes: 10,
            servings: 2,
            summary: 'Refreshing smoothie packed with vitamins and happiness!'
          }
        ]
      },
      sad: {
        mood: 'sad',
        cuisine: 'soup',
        recipes: [
          {
            id: 3,
            title: 'Warm Chicken Soup',
            image: '🍲',
            readyInMinutes: 30,
            servings: 4,
            summary: 'Comforting soup to warm your heart and soul.'
          },
          {
            id: 4,
            title: 'Hot Chocolate',
            image: '☕',
            readyInMinutes: 5,
            servings: 1,
            summary: 'Rich, warm hot chocolate to comfort you.'
          }
        ]
      },
      stressed: {
        mood: 'stressed',
        cuisine: 'salad',
        recipes: [
          {
            id: 5,
            title: 'Fresh Green Salad',
            image: '🥗',
            readyInMinutes: 15,
            servings: 2,
            summary: 'Light, healthy salad to help you feel refreshed.'
          },
          {
            id: 6,
            title: 'Herbal Tea',
            image: '🍵',
            readyInMinutes: 5,
            servings: 1,
            summary: 'Calming herbal tea to reduce stress.'
          }
        ]
      },
      calm: {
        mood: 'calm',
        cuisine: 'tea',
        recipes: [
          {
            id: 7,
            title: 'Chamomile Tea',
            image: '🍵',
            readyInMinutes: 5,
            servings: 1,
            summary: 'Soothing chamomile tea for peaceful moments.'
          },
          {
            id: 8,
            title: 'Vanilla Yogurt',
            image: '🥛',
            readyInMinutes: 2,
            servings: 1,
            summary: 'Creamy vanilla yogurt for a calm treat.'
          }
        ]
      },
      excited: {
        mood: 'excited',
        cuisine: 'pasta',
        recipes: [
          {
            id: 9,
            title: 'Spicy Pasta Arrabbiata',
            image: '🍝',
            readyInMinutes: 25,
            servings: 3,
            summary: 'Energizing spicy pasta to match your excitement!'
          },
          {
            id: 10,
            title: 'Energy Smoothie',
            image: '🥤',
            readyInMinutes: 5,
            servings: 1,
            summary: 'Protein-packed smoothie for sustained energy.'
          }
        ]
      },
      tired: {
        mood: 'tired',
        cuisine: 'coffee',
        recipes: [
          {
            id: 11,
            title: 'Strong Coffee',
            image: '☕',
            readyInMinutes: 5,
            servings: 1,
            summary: 'Rich, strong coffee to wake you up.'
          },
          {
            id: 12,
            title: 'Energy Bar',
            image: '🍫',
            readyInMinutes: 2,
            servings: 1,
            summary: 'Quick energy bar for an instant boost.'
          }
        ]
      }
    };

    return fallbackData[mood] || fallbackData.happy;
  }
}

export default MoodMealsAPI;

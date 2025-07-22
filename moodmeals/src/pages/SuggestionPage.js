import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MoodMealsAPI from '../services/api';
import '../App.css';

// Emoji mapping for reliable display
const RECIPE_EMOJIS = {
  1: '🍪', // Chocolate Chip Cookies
  2: '🌈', // Rainbow Fruit Salad  
  3: '🍨', // Vanilla Ice Cream Sundae
  4: '🍲', // Chicken Noodle Soup
  5: '☕', // Hot Chocolate
  6: '🍅', // Tomato Basil Soup
  7: '🥗', // Mediterranean Quinoa Salad
  8: '🍵', // Green Tea
  9: '🥑', // Avocado Toast
  10: '🌼', // Chamomile Tea Latte
  11: '💜', // Lavender Shortbread
  12: '🍮', // Vanilla Panna Cotta
  13: '🌶️', // Spicy Jalapeño Pasta
  14: '🥤', // Energy Protein Smoothie
  15: '🔥', // Buffalo Chicken Wings
  16: '☕', // Double Shot Espresso
  17: '🥞', // Banana Protein Pancakes
  18: '🍵', // Matcha Energy Balls
  'default': '🍽️'
};

function SuggestionPage() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const mood = location.state?.mood || 'happy';

  // Helper function to parse HTML instructions
  const parseInstructions = (instructions) => {
    if (!instructions) return 'No instructions available';
    
    // Remove HTML tags and clean up the text
    let cleanText = instructions.replace(/<[^>]*>/g, '');
    
    // If it's a long string, try to split it into steps
    if (cleanText.length > 100) {
      // Look for numbered steps like "1." or step indicators
      const stepPattern = /(\d+\.|\d+\)|Step \d+:)/g;
      const steps = cleanText.split(stepPattern).filter(step => step.trim().length > 10);
      
      if (steps.length > 1) {
        return steps.map((step, index) => {
          const trimmedStep = step.trim();
          if (trimmedStep.match(/^\d+\.|\d+\)|Step \d+:/)) {
            return trimmedStep;
          }
          return `${index + 1}. ${trimmedStep}`;
        }).filter(step => step.length > 3).join('\n');
      }
    }
    
    // If no clear steps found, split by periods for long instructions
    if (cleanText.length > 200) {
      const sentences = cleanText.split('.').filter(sentence => sentence.trim().length > 20);
      if (sentences.length > 1) {
        return sentences.map((sentence, index) => `${index + 1}. ${sentence.trim()}.`).join('\n');
      }
    }
    
    return cleanText;
  };

  // Helper function to format ingredients list
  const formatIngredients = (ingredients) => {
    if (!ingredients || !Array.isArray(ingredients)) return [];
    
    return ingredients.map(ingredient => {
      if (typeof ingredient === 'string') {
        // Clean up any HTML tags from ingredients
        return ingredient.replace(/<[^>]*>/g, '').trim();
      }
      return ingredient;
    });
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('🔍 Fetching suggestions for mood:', mood);
        console.log('🌐 API Base URL:', 'http://localhost:5001/api');
        
        // Get suggestions from backend API
        const result = await MoodMealsAPI.getSuggestionsByMood(mood);
        
        console.log('📊 API Result:', result);
        console.log('✅ Success:', result.success);
        console.log('🔄 Fallback:', result.fallback);
        
        if (result.success) {
          console.log('📋 Recipes received:', result.data.recipes?.length);
          if (result.data.recipes?.[0]) {
            console.log('🍽️ Sample recipe:', {
              id: result.data.recipes[0].id,
              title: result.data.recipes[0].title,
              image: result.data.recipes[0].image,
              realData: result.data.recipes[0].realData
            });
          }
          setSuggestions(result.data.recipes || []);
        } else {
          console.log('❌ Error:', result.error);
          setError(result.error);
          setSuggestions(result.data.recipes || []);
        }
      } catch (err) {
        setError('Failed to fetch suggestions');
        // Use fallback data
        const fallbackData = MoodMealsAPI.getFallbackSuggestions(mood);
        setSuggestions(fallbackData.recipes || []);
      }
      
      setIsLoading(false);
    };

    fetchSuggestions();
  }, [mood]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && selectedRecipe) {
        closeModal();
      }
    };

    if (selectedRecipe) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [selectedRecipe]);

  const handleRecipeClick = async (recipe) => {
    try {
      // Disable body scroll when modal opens
      document.body.style.overflow = 'hidden';
      
      // If recipe ID is a simple number (1-12), it's fallback data
      if (recipe.id <= 12) {
        // For fallback data, create a detailed view from the existing recipe data
        const detailedRecipe = {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          summary: recipe.summary,
          ingredients: [
            'This is a demonstration recipe',
            'Ingredients would be listed here',
            'Add your Spoonacular API key for real recipes',
            'Visit spoonacular.com for API access'
          ],
          instructions: 'This is a fallback recipe. To see real recipe instructions, ingredients, and nutrition data, please add your Spoonacular API key to the .env file.',
          sourceUrl: 'https://spoonacular.com/food-api',
          nutrition: {
            calories: 'N/A',
            protein: 'N/A',
            carbs: 'N/A',
            fat: 'N/A'
          }
        };
        setSelectedRecipe(detailedRecipe);
      } else {
        // For real API data, fetch detailed recipe information
        const result = await MoodMealsAPI.getRecipeDetails(recipe.id);
        if (result.success) {
          // Ensure image exists and is valid
          const recipeData = {
            ...result.data,
            image: result.data.image || '🍽️' // Fallback to emoji if no image
          };
          setSelectedRecipe(recipeData);
        } else {
          // If API call fails, show basic recipe info
          setSelectedRecipe({
            ...recipe,
            ingredients: ['API call failed - using basic recipe info'],
            instructions: 'Unable to fetch detailed recipe information. Please try again later.',
            sourceUrl: null,
            image: recipe.image || '🍽️' // Ensure fallback image
          });
        }
      }
    } catch (err) {
      console.error('Error fetching recipe details:', err);
      // Show basic recipe info as fallback
      setSelectedRecipe({
        ...recipe,
        ingredients: ['Error loading recipe details'],
        instructions: 'There was an error loading the recipe details. Please try again.',
        sourceUrl: null
      });
    }
  };

  const handleTryAgain = () => {
    navigate('/mood');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="card">
          <h2 className="section-title">Finding the perfect meal for you...</h2>
          <div className="loading" style={{ margin: '40px auto' }}></div>
          <p className="subtitle">Analyzing your mood and preferences</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="card" style={{
        maxWidth: '1400px',
        width: '100%',
        padding: '30px'
      }}>
        <h2 className="section-title">Perfect Matches Found!</h2>
        <p className="subtitle">
          Based on your {mood} mood, here are our recommendations:
          {error && <span style={{ color: '#ff6b6b' }}> (Using fallback data)</span>}
        </p>
        
        <div className="recipes-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '25px',
          marginTop: '40px',
          justifyItems: 'center'
        }}>
          {suggestions.map((recipe, index) => {
            console.log('Recipe:', recipe.title, 'Image:', recipe.image, 'Type:', typeof recipe.image);
            return (
            <div 
              key={recipe.id} 
              className="suggestion-card"
              onClick={() => handleRecipeClick(recipe)}
              style={{
                cursor: 'pointer',
                transform: 'scale(1)',
                transition: 'transform 0.2s ease',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                width: '100%',
                maxWidth: '350px',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div className="food-image">
                {recipe.image && recipe.image.startsWith('http') ? (
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '15px',
                      marginBottom: '15px'
                    }}
                    onError={(e) => {
                      console.log('Image failed to load:', recipe.image);
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                ) : (
                  <div className="food-emoji" style={{ 
                    fontSize: '4rem', 
                    marginBottom: '15px',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    borderRadius: '15px',
                    border: '2px solid rgba(102, 126, 234, 0.2)'
                  }}>
                    {RECIPE_EMOJIS[recipe.id] || RECIPE_EMOJIS.default}
                  </div>
                )}
                {/* Fallback emoji div for broken images */}
                {recipe.image && recipe.image.startsWith('http') && (
                  <div className="food-emoji-fallback" style={{ 
                    fontSize: '4rem', 
                    marginBottom: '15px',
                    height: '200px',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    borderRadius: '15px',
                    border: '2px solid rgba(102, 126, 234, 0.2)'
                  }}>
                    {RECIPE_EMOJIS[recipe.id] || RECIPE_EMOJIS.default}
                  </div>
                )}
              </div>
              
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 className="food-name" style={{ 
                  fontSize: '1.3rem', 
                  marginBottom: '10px',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>{recipe.title}</h3>
                
                <p className="food-description" style={{ 
                  fontSize: '0.9rem',
                  color: '#666',
                  marginBottom: '15px',
                  lineHeight: '1.4',
                  flexGrow: 1,
                  textAlign: 'center'
                }}>
                  {recipe.summary ? 
                    recipe.summary.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 
                    'Delicious recipe perfect for your mood!'
                  }
                </p>
                
                <div className="recipe-info" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '15px',
                  padding: '10px 0',
                  borderTop: '1px solid rgba(102, 126, 234, 0.1)'
                }}>
                  {recipe.readyInMinutes && (
                    <span className="info-item">⏱️ {recipe.readyInMinutes} mins</span>
                  )}
                  {recipe.servings && (
                    <span className="info-item">👥 {recipe.servings} servings</span>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {suggestions.length === 0 && !isLoading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              No suggestions found for your mood. Try a different mood or check back later!
            </p>
          </div>
        )}

        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={handleTryAgain}
            style={{ animationDelay: '0.5s' }}
          >
            Try Different Mood
          </button>
          
          <button 
            className="btn"
            onClick={handleBackHome}
            style={{ 
              background: 'transparent',
              color: '#667eea',
              border: '2px solid #667eea',
              animationDelay: '0.7s'
            }}
          >
            Back to Home
          </button>
        </div>

        <div className="fun-fact" style={{
          marginTop: '30px',
          padding: '20px',
          background: 'rgba(102, 126, 234, 0.1)',
          borderRadius: '15px',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          animation: 'fadeInUp 1s ease-out 0.8s both'
        }}>
          <h4 style={{ color: '#667eea', marginBottom: '10px' }}>💡 Fun Fact</h4>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>
            Your mood directly influences your taste preferences! When you're {mood}, 
            your body craves specific nutrients to help balance your emotional state.
          </p>
        </div>
      </div>

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeModal} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease-out',
          overflow: 'auto',
          padding: '20px'
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
            backdropFilter: 'blur(10px)',
            borderRadius: '25px',
            padding: '40px',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            animation: 'slideInUp 0.3s ease-out',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#667eea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#667eea';
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                e.target.style.color = '#667eea';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
            
            <h2 style={{ 
              color: '#667eea', 
              marginBottom: '20px',
              fontSize: '1.8rem',
              fontWeight: '700',
              textAlign: 'center',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              paddingRight: '60px' // Space for close button
            }}>
              {selectedRecipe.title}
            </h2>
            
            {selectedRecipe.id <= 12 && (
              <div style={{
                background: 'rgba(255, 193, 7, 0.1)',
                border: '1px solid rgba(255, 193, 7, 0.3)',
                borderRadius: '10px',
                padding: '10px 15px',
                marginBottom: '20px',
                fontSize: '0.9rem',
                color: '#856404'
              }}>
                <strong>💡 Demo Recipe:</strong> This is sample data. Add your Spoonacular API key for real recipes!
              </div>
            )}
            
            {selectedRecipe.image && (
              <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                {selectedRecipe.image.startsWith('http') ? (
                  <img 
                    src={selectedRecipe.image} 
                    alt={selectedRecipe.title}
                    style={{
                      width: '100%',
                      maxWidth: '400px',
                      height: '250px',
                      objectFit: 'cover',
                      borderRadius: '15px',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div style={{
                    fontSize: '4rem',
                    padding: '40px 20px',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    borderRadius: '15px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '200px',
                    minHeight: '150px',
                    border: '2px solid rgba(102, 126, 234, 0.2)'
                  }}>
                    {selectedRecipe.image}
                  </div>
                )}
                {/* Fallback for broken images */}
                <div style={{
                  display: 'none',
                  fontSize: '3rem',
                  padding: '40px 20px',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                  borderRadius: '15px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '200px',
                  minHeight: '150px',
                  border: '2px solid rgba(102, 126, 234, 0.2)',
                  color: '#667eea'
                }}>
                  🍽️
                </div>
              </div>
            )}
            
            <div className="recipe-info" style={{ 
              marginBottom: '25px',
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              {selectedRecipe.readyInMinutes && (
                <span className="info-item" style={{
                  background: 'rgba(102, 126, 234, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  color: '#667eea',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>⏱️ {selectedRecipe.readyInMinutes} mins</span>
              )}
              {selectedRecipe.servings && (
                <span className="info-item" style={{
                  background: 'rgba(118, 75, 162, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  color: '#764ba2',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>👥 {selectedRecipe.servings} servings</span>
              )}
            </div>
            
            {selectedRecipe.summary && (
              <div style={{ 
                marginBottom: '25px',
                background: 'rgba(255, 193, 7, 0.05)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 193, 7, 0.2)'
              }}>
                <h4 style={{ 
                  color: '#f39c12', 
                  marginBottom: '12px',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>📝 Summary:</h4>
                <p style={{ 
                  color: '#666', 
                  lineHeight: '1.7',
                  fontSize: '0.95rem',
                  background: 'rgba(255, 255, 255, 0.7)',
                  padding: '15px',
                  borderRadius: '10px'
                }}>
                  {selectedRecipe.summary.replace(/<[^>]*>/g, '')}
                </p>
              </div>
            )}
            
            {selectedRecipe.ingredients && (
              <div style={{ 
                marginBottom: '25px',
                background: 'rgba(102, 126, 234, 0.05)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(102, 126, 234, 0.1)'
              }}>
                <h4 style={{ 
                  color: '#667eea', 
                  marginBottom: '15px',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>🛒 Ingredients:</h4>
                <ul style={{ 
                  color: '#666', 
                  paddingLeft: '0',
                  listStyle: 'none'
                }}>
                  {formatIngredients(selectedRecipe.ingredients).map((ingredient, index) => (
                    <li key={index} style={{ 
                      marginBottom: '8px',
                      padding: '8px 12px',
                      background: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '8px',
                      borderLeft: '3px solid #667eea',
                      fontSize: '0.95rem'
                    }}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedRecipe.instructions && (
              <div style={{ 
                marginBottom: '25px',
                background: 'rgba(118, 75, 162, 0.05)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(118, 75, 162, 0.1)'
              }}>
                <h4 style={{ 
                  color: '#764ba2', 
                  marginBottom: '15px',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>👨‍🍳 Instructions:</h4>
                <div style={{ color: '#666', lineHeight: '1.7' }}>
                  {parseInstructions(selectedRecipe.instructions).split('\n').filter(step => step.trim()).map((step, index) => (
                    <div key={index} style={{ 
                      marginBottom: '12px', 
                      padding: '12px 15px',
                      background: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '10px',
                      borderLeft: '3px solid #764ba2',
                      fontSize: '0.95rem'
                    }}>
                      {step.trim()}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedRecipe.sourceUrl && (
              <a 
                href={selectedRecipe.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ 
                  display: 'inline-block',
                  marginTop: '15px',
                  textDecoration: 'none'
                }}
              >
                View Original Recipe
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SuggestionPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFoodSuggestion, getFallbackSuggestion } from '../services/foodAPI';
import '../App.css';

function SuggestionPage() {
  const [suggestion, setSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const mood = location.state?.mood || 'happy';

  const foodSuggestions = {
    happy: {
      emoji: '🥗',
      name: 'Rainbow Buddha Bowl',
      description: 'A vibrant, colorful bowl packed with fresh vegetables, quinoa, and tahini dressing to keep your spirits high!',
      benefits: 'Rich in vitamins and antioxidants that boost serotonin levels',
      color: '#7ED321'
    },
    sad: {
      emoji: '🍲',
      name: 'Creamy Tomato Soup',
      description: 'Warm, comforting soup with grilled cheese that feels like a hug in a bowl.',
      benefits: 'Comfort food that provides warmth and emotional comfort',
      color: '#FF6B6B'
    },
    stressed: {
      emoji: '🐟',
      name: 'Grilled Salmon with Avocado',
      description: 'Omega-3 rich salmon with creamy avocado to help reduce stress and anxiety.',
      benefits: 'Omega-3 fatty acids help reduce cortisol levels and promote calm',
      color: '#4A90E2'
    },
    calm: {
      emoji: '🍵',
      name: 'Green Tea & Sushi',
      description: 'Light, fresh sushi with calming green tea for a peaceful dining experience.',
      benefits: 'Green tea contains L-theanine which promotes relaxation',
      color: '#50E3C2'
    },
    excited: {
      emoji: '🌮',
      name: 'Spicy Street Tacos',
      description: 'Energetic flavors with fresh cilantro, lime, and your choice of protein.',
      benefits: 'Spicy foods release endorphins and boost energy levels',
      color: '#F5A623'
    },
    tired: {
      emoji: '☕',
      name: 'Açaí Bowl with Granola',
      description: 'Energy-boosting açaí bowl topped with granola, berries, and honey.',
      benefits: 'Natural sugars and antioxidants provide sustained energy',
      color: '#9013FE'
    }
  };

  useEffect(() => {
    const fetchSuggestion = async () => {
      setIsLoading(true);
      
      // Try to get real API data
      const apiSuggestion = await getFoodSuggestion(mood);
      
      if (apiSuggestion) {
        setSuggestion(apiSuggestion);
      } else {
        // Fallback to hardcoded suggestions
        setSuggestion(getFallbackSuggestion(mood));
      }
      
      setIsLoading(false);
    };

    fetchSuggestion();
  }, [mood]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTryAgain = () => {
    navigate('/mood');
  };

  const handleBackHome = () => {
    navigate('/');
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
      <div className="card">
        <h2 className="section-title">Perfect Match Found!</h2>
        <p className="subtitle">Based on your {mood} mood, here's our recommendation:</p>
        
        <div className="suggestion-card">
          <div className="food-image">
            {suggestion.image && suggestion.image.startsWith('http') ? (
              <img 
                src={suggestion.image} 
                alt={suggestion.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                  marginBottom: '20px'
                }}
              />
            ) : (
              <div className="food-emoji">{suggestion.image || '🍽️'}</div>
            )}
          </div>
          <h3 className="food-name">{suggestion.name}</h3>
          <p className="food-description">{suggestion.description}</p>
          
          {suggestion.cookingTime && (
            <div className="recipe-info">
              <span className="info-item">⏱️ {suggestion.cookingTime} mins</span>
              {suggestion.servings && (
                <span className="info-item">👥 {suggestion.servings} servings</span>
              )}
            </div>
          )}
          
          {suggestion.ingredients && (
            <div className="ingredients-section">
              <h4 style={{ color: '#667eea', marginBottom: '10px' }}>
                🛒 Key Ingredients:
              </h4>
              <ul style={{ textAlign: 'left', color: '#666' }}>
                {suggestion.ingredients.map((ingredient, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {suggestion.sourceUrl && (
            <a 
              href={suggestion.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn"
              style={{ 
                display: 'inline-block',
                marginTop: '15px',
                textDecoration: 'none'
              }}
            >
              View Full Recipe
            </a>
          )}
        </div>

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
    </div>
  );
}

export default SuggestionPage;

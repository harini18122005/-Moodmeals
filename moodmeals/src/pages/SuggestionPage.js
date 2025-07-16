import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    // Simulate loading time
    const timer = setTimeout(() => {
      setSuggestion(foodSuggestions[mood] || foodSuggestions.happy);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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
          <div className="food-emoji">{suggestion.emoji}</div>
          <h3 className="food-name">{suggestion.name}</h3>
          <p className="food-description">{suggestion.description}</p>
          
          <div className="benefits-section">
            <h4 style={{ 
              color: suggestion.color, 
              marginBottom: '10px',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Why this works for you:
            </h4>
            <p style={{ 
              color: '#666', 
              fontStyle: 'italic',
              background: `${suggestion.color}15`,
              padding: '15px',
              borderRadius: '10px',
              border: `1px solid ${suggestion.color}30`
            }}>
              {suggestion.benefits}
            </p>
          </div>
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

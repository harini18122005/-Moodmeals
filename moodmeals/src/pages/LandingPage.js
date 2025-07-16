import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/mood');
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="main-title">MoodMeals</h1>
        <p className="subtitle">
          Discover the perfect food to match your mood and elevate your dining experience
        </p>
        <div className="features-container">
          <div className="feature-item">
            <span className="feature-icon">🍽️</span>
            <span className="feature-text">Personalized Recommendations</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">😊</span>
            <span className="feature-text">Mood-Based Suggestions</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Instant Results</span>
          </div>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={handleStartClick}
          style={{ animationDelay: '0.6s' }}
        >
          Start Your Journey
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

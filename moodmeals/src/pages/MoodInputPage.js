import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function MoodInputPage() {
  const [selectedMood, setSelectedMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊', color: '#FFD93D' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: '#4A90E2' },
    { id: 'stressed', label: 'Stressed', emoji: '😰', color: '#F5A623' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: '#7ED321' },
    { id: 'excited', label: 'Excited', emoji: '🤩', color: '#FF6B6B' },
    { id: 'tired', label: 'Tired', emoji: '😴', color: '#9013FE' }
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    navigate('/suggestion', { state: { mood: selectedMood } });
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2 className="section-title">How are you feeling today?</h2>
        <p className="subtitle">Select your current mood to get personalized food recommendations</p>
        
        <div className="mood-grid">
          {moods.map((mood, index) => (
            <button
              key={mood.id}
              className={`mood-btn ${selectedMood === mood.id ? 'selected' : ''}`}
              onClick={() => handleMoodSelect(mood.id)}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                borderColor: selectedMood === mood.id ? mood.color : 'transparent'
              }}
            >
              <div className="mood-emoji" style={{ fontSize: '2rem', marginBottom: '10px' }}>
                {mood.emoji}
              </div>
              <div className="mood-label">{mood.label}</div>
            </button>
          ))}
        </div>

        <div className="mood-description">
          {selectedMood && (
            <p style={{ 
              color: '#666', 
              marginBottom: '20px',
              animation: 'fadeInUp 0.5s ease-out'
            }}>
              Great choice! Let's find the perfect food for your {selectedMood} mood.
            </p>
          )}
        </div>

        <button 
          className={`btn ${selectedMood ? 'btn-primary' : ''}`}
          onClick={handleSubmit}
          disabled={!selectedMood || isLoading}
          style={{ 
            opacity: selectedMood ? 1 : 0.5,
            cursor: selectedMood ? 'pointer' : 'not-allowed'
          }}
        >
          {isLoading ? (
            <div className="loading"></div>
          ) : (
            'Get My Food Suggestion'
          )}
        </button>

        <button 
          className="btn"
          onClick={() => navigate('/')}
          style={{ 
            background: 'transparent',
            color: '#667eea',
            border: '2px solid #667eea',
            marginTop: '10px'
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default MoodInputPage;

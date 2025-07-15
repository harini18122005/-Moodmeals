import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MoodInputPage from './pages/MoodInputPage';
import SuggestionPage from './pages/SuggestionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mood" element={<MoodInputPage />} />
        <Route path="/suggestion" element={<SuggestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;

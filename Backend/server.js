const express = require('express');
const cors = require('cors');
require('dotenv').config();

const foodRoutes = require('./routes/foodRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure UTF-8 encoding for proper emoji handling
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Use food routes
app.use('/api/food', foodRoutes);

app.get('/', (req, res) => {
  res.send('MoodMeals Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

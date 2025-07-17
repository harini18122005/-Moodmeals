# 🏗️ MoodMeals Backend Design & AI Integration Planning

## 📊 **Current Frontend Analysis**

### **Existing Frontend Features:**
- ✅ **3 Pages:** Landing, Mood Input, Suggestion
- ✅ **6 Mood Categories:** Happy, Sad, Stressed, Calm, Excited, Tired
- ✅ **Spoonacular API Integration:** Real recipe data
- ✅ **Fallback System:** Offline suggestions
- ✅ **Professional UI:** 559 lines of custom CSS

### **Current Data Flow:**
```
User → Mood Selection → API Call → Food Suggestion → Display
```

---

## 🔷 **Step 1: Backend Endpoints Design**

### **Required Backend Routes:**

#### **1. POST /api/mood**
```javascript
// Save user mood selection
Request Body: {
  userId: "user123",
  mood: "happy",
  timestamp: "2025-07-17T10:30:00Z",
  sessionId: "session456"
}

Response: {
  success: true,
  moodId: "mood789",
  message: "Mood saved successfully"
}
```

#### **2. GET /api/suggestion/:mood**
```javascript
// Get AI-powered food suggestion
Request: GET /api/suggestion/happy?userId=user123

Response: {
  success: true,
  suggestion: {
    id: "recipe123",
    name: "Rainbow Buddha Bowl",
    description: "AI-generated description...",
    image: "https://...",
    cookingTime: 25,
    servings: 2,
    ingredients: ["quinoa", "avocado", "..."],
    aiExplanation: "This colorful bowl boosts serotonin levels...",
    nutritionFacts: {...},
    sourceUrl: "https://..."
  }
}
```

#### **3. POST /api/feedback**
```javascript
// Save user feedback on suggestions
Request Body: {
  userId: "user123",
  suggestionId: "recipe123",
  rating: 4,
  feedback: "Loved it! Really helped my mood",
  helpful: true,
  timestamp: "2025-07-17T11:00:00Z"
}

Response: {
  success: true,
  message: "Feedback saved successfully"
}
```

#### **4. GET /api/user/:userId/history**
```javascript
// Get user's mood and suggestion history
Response: {
  success: true,
  history: [
    {
      date: "2025-07-17",
      mood: "happy",
      suggestion: "Rainbow Buddha Bowl",
      rating: 4
    }
  ]
}
```

#### **5. GET /api/analytics/mood-trends**
```javascript
// Get mood analytics (admin/insights)
Response: {
  success: true,
  trends: {
    mostCommonMood: "happy",
    topRatedSuggestions: [...],
    moodByTimeOfDay: {...}
  }
}
```

---

## 💾 **Step 2: Database Schema Design**

### **Database Choice:** MongoDB (NoSQL) - Perfect for flexible recipe data

#### **Collection 1: users**
```javascript
{
  _id: ObjectId("..."),
  userId: "user123",
  email: "user@example.com",
  preferences: {
    dietaryRestrictions: ["vegetarian", "gluten-free"],
    cuisinePreferences: ["italian", "asian"],
    allergens: ["nuts", "dairy"]
  },
  createdAt: ISODate("2025-07-17T10:00:00Z"),
  lastActive: ISODate("2025-07-17T10:30:00Z")
}
```

#### **Collection 2: moods**
```javascript
{
  _id: ObjectId("..."),
  userId: "user123",
  mood: "happy",
  intensity: 7, // 1-10 scale
  timestamp: ISODate("2025-07-17T10:30:00Z"),
  sessionId: "session456",
  context: "morning", // morning, afternoon, evening
  weather: "sunny" // optional environmental context
}
```

#### **Collection 3: suggestions**
```javascript
{
  _id: ObjectId("..."),
  userId: "user123",
  mood: "happy",
  recipeData: {
    spoonacularId: 123456,
    name: "Rainbow Buddha Bowl",
    image: "https://...",
    cookingTime: 25,
    servings: 2,
    ingredients: ["quinoa", "avocado", "..."],
    nutritionFacts: {...},
    sourceUrl: "https://..."
  },
  aiGenerated: {
    explanation: "This colorful bowl boosts serotonin...",
    moodBenefits: ["increases happiness", "provides energy"],
    personalizedTip: "Add extra berries for antioxidants"
  },
  timestamp: ISODate("2025-07-17T10:35:00Z"),
  viewed: true,
  cookingAttempted: false
}
```

#### **Collection 4: feedback**
```javascript
{
  _id: ObjectId("..."),
  userId: "user123",
  suggestionId: ObjectId("..."),
  rating: 4, // 1-5 stars
  feedback: "Loved it! Really helped my mood",
  helpful: true,
  cookingDifficulty: 3, // 1-5 scale
  actualMoodImprovement: 4, // 1-5 scale
  wouldCookAgain: true,
  timestamp: ISODate("2025-07-17T11:00:00Z")
}
```

#### **Collection 5: recipes_cache**
```javascript
{
  _id: ObjectId("..."),
  spoonacularId: 123456,
  mood: "happy",
  recipeData: {...}, // Cached Spoonacular data
  aiEnhancement: {...}, // AI-generated content
  lastUpdated: ISODate("2025-07-17T10:00:00Z"),
  popularity: 85, // Based on user ratings
  averageRating: 4.2
}
```

---

## 🤖 **Step 3: AI Integration Architecture**

### **AI Integration Points:**

#### **1. Smart Recipe Selection**
```javascript
// AI Prompt for Recipe Selection
const prompt = `
You are a mood-food expert. Based on the user's mood: "${mood}", 
suggest the most appropriate recipe from these options:
${availableRecipes}

Consider:
- Nutritional benefits for mood enhancement
- Cooking complexity based on mood energy levels
- Seasonal ingredients
- Cultural food psychology

Return JSON with: selectedRecipe, reasoning, moodBenefits
`;
```

#### **2. Personalized Explanations**
```javascript
// AI Prompt for Mood-Food Explanation
const prompt = `
Explain why "${recipeName}" is perfect for someone feeling "${mood}".
Include:
- Scientific reasoning (serotonin, dopamine, etc.)
- Cultural/psychological comfort factors
- Nutritional benefits
- Cooking therapy aspects

Keep it encouraging and personal (under 150 words).
`;
```

#### **3. Adaptive Suggestions**
```javascript
// AI Prompt for Learning from Feedback
const prompt = `
Based on user feedback history:
${userFeedbackHistory}

The user is feeling "${currentMood}". 
Suggest 3 recipes that would work better than previous suggestions.
Consider their preferences and past ratings.

Format: JSON with recipes array, each with confidence score.
`;
```

### **AI Fallback Strategy:**
1. **Primary:** OpenAI GPT-4 for dynamic suggestions
2. **Secondary:** Pre-trained mood-food mapping
3. **Tertiary:** Your current hardcoded suggestions

---

## 🔄 **Step 4: Enhanced Data Flow**

### **New Backend-Enhanced Flow:**
```
User Input → Backend Validation → AI Processing → Database Storage → Response
     ↓
User History → Personalization → Better Suggestions → Feedback Loop
```

### **Performance Optimizations:**
- **Caching:** Store popular AI responses
- **Batch Processing:** Process multiple moods simultaneously
- **Rate Limiting:** Prevent API abuse
- **Queue System:** Handle high traffic

---

## 📈 **Step 5: Analytics & Insights**

### **Tracking Metrics:**
- Most common moods by time/day
- Recipe success rates
- User engagement patterns
- Mood improvement correlation
- Seasonal food preferences

### **Business Intelligence:**
- Popular ingredients by mood
- Cooking difficulty preferences
- Regional mood-food patterns
- User retention based on satisfaction

---

## 🚀 **Implementation Priority:**

### **Phase 1 (Day 4):**
- ✅ Basic Express.js server
- ✅ MongoDB connection
- ✅ Core endpoints (mood, suggestion)
- ✅ Basic AI integration

### **Phase 2 (Day 5):**
- ✅ User authentication
- ✅ Feedback system
- ✅ History tracking
- ✅ Enhanced AI prompts

### **Phase 3 (Future):**
- ✅ Advanced analytics
- ✅ Admin dashboard
- ✅ Mobile API
- ✅ Real-time features

---

## 🔧 **Technology Stack:**

### **Backend Framework:**
- **Node.js + Express.js** (Fast, JavaScript consistency)
- **MongoDB + Mongoose** (Flexible schema for recipes)
- **OpenAI API** (GPT-4 for intelligent suggestions)

### **Additional Tools:**
- **JWT** for authentication
- **Redis** for caching
- **Winston** for logging
- **Joi** for validation
- **Helmet** for security

---

## 📝 **Next Steps for Day 4:**

1. **Setup Express.js server**
2. **Connect MongoDB database**
3. **Implement core endpoints**
4. **Add OpenAI integration**
5. **Test with your existing frontend**

**Your backend will be as professional as your frontend! 🎯**

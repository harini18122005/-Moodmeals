# 📋 MoodMeals Backend Planning - Step 1

## 🔍 **What You Currently Have (Frontend Analysis)**

### Your Current Frontend Flow:
1. **Landing Page** → User clicks "Start Your Journey"
2. **Mood Input Page** → User selects mood (Happy, Sad, Stressed, Calm, Excited, Tired)
3. **Suggestion Page** → Shows food recommendation

### Your Current Data Structure:
```javascript
// From your foodAPI.js - you already have this mapping:
const moodToCuisine = {
  happy: { cuisine: 'mediterranean', diet: 'vegetarian' },
  sad: { cuisine: 'american', diet: 'comfort' },
  stressed: { cuisine: 'asian', diet: 'healthy' },
  calm: { cuisine: 'japanese', diet: 'low-fat' },
  excited: { cuisine: 'mexican', diet: 'spicy' },
  tired: { cuisine: 'italian', diet: 'quick' }
};
```

---

## 🏗️ **Step 1: Required Backend Endpoints**

Based on your current frontend, you need these 3 simple endpoints:

### **Endpoint 1: Save User Mood**
```
POST /api/mood
Purpose: Save when user selects a mood
```

**What data to save:**
- User's selected mood (happy, sad, stressed, etc.)
- Timestamp when they selected it
- User ID (for future login feature)

### **Endpoint 2: Get Food Suggestion**
```
GET /api/suggestion/:mood
Purpose: Get food suggestion for a mood
```

**What this endpoint does:**
- Takes mood as parameter (happy, sad, etc.)
- Returns food suggestion with recipe details
- Same format your frontend already expects

### **Endpoint 3: Save User Feedback**
```
POST /api/feedback
Purpose: Save if user liked the suggestion
```

**What data to save:**
- Did they like the suggestion? (thumbs up/down)
- User comments
- Which recipe they got

---

## 💾 **Step 1: Database Tables Needed**

You need 3 simple tables:

### **Table 1: user_moods**
```
Fields needed:
- id (auto-generated)
- mood (happy, sad, stressed, calm, excited, tired)
- timestamp (when they selected it)
- user_id (optional for now)
```

### **Table 2: food_suggestions**
```
Fields needed:
- id (auto-generated)
- mood (which mood this was for)
- recipe_name (like "Rainbow Buddha Bowl")
- recipe_details (JSON with all recipe info)
- timestamp (when suggested)
- user_id (optional for now)
```

### **Table 3: user_feedback**
```
Fields needed:
- id (auto-generated)
- suggestion_id (links to food_suggestions table)
- liked (true/false)
- comment (optional text)
- timestamp (when they gave feedback)
- user_id (optional for now)
```

---

## 🤖 **Step 1: AI Integration Plan**

### **Option A: Keep Current + Add AI Explanations**
- Keep your Spoonacular API calls (they work great!)
- Add AI to explain WHY this food helps the mood
- Example: "This Mediterranean bowl is perfect for happiness because..."

### **Option B: Full AI Suggestions**
- Use AI to pick the best recipe for each mood
- Still use Spoonacular for recipe details
- AI decides which recipe fits best

### **Recommended: Start with Option A**
It's easier and builds on what you already have working!

---

## 📝 **Step 1: AI Prompt Examples**

### **For Mood Explanations:**
```
"Explain in 2-3 sentences why [RECIPE_NAME] is good for someone feeling [MOOD]. 
Focus on nutrition and psychological benefits. Keep it encouraging and simple."
```

### **Example AI Response:**
```
"This Rainbow Buddha Bowl is perfect when you're feeling happy because the colorful vegetables provide mood-boosting vitamins and antioxidants. The quinoa gives sustained energy to keep your positive mood going, while the tahini dressing adds healthy fats that support brain function."
```

---

## ✅ **Step 1 Checklist - What You've Planned:**

**Backend Routes:**
- [ ] POST /api/mood (save user mood)
- [ ] GET /api/suggestion/:mood (get food suggestion)  
- [ ] POST /api/feedback (save user feedback)

**Database Tables:**
- [ ] user_moods (store mood selections)
- [ ] food_suggestions (store recipe recommendations)
- [ ] user_feedback (store user ratings)

**AI Integration:**
- [ ] Add AI explanations for why food helps mood
- [ ] Keep current Spoonacular API working
- [ ] Create fallback if AI fails

---

## 🚀 **Next Steps (For Tomorrow - Day 4):**

1. **Create Express.js server**
2. **Set up MongoDB database**
3. **Build the 3 endpoints above**
4. **Connect your frontend to new backend**
5. **Add simple AI explanations**

**Does this Step 1 plan make sense now?** 

This is exactly what you need to build - simple, focused, and builds on your existing great frontend! 🎯

---

## 🤖 **Step 2: AI Integration Approach - Detailed Plan**

### **AI Integration Strategy: Option A (Recommended)**

**What we'll do:**
1. **Keep your Spoonacular API** (it works great!)
2. **Add AI for smart explanations** (why this food helps your mood)
3. **Use AI for personalization** (learn from user feedback)

### **AI Service: OpenAI GPT-4**

**Why OpenAI:**
- Best for natural language explanations
- Reliable and fast
- Good at understanding mood-food relationships

### **Specific AI Prompts to Use:**

#### **Prompt 1: Mood-Food Explanation**
```javascript
const generateMoodExplanation = (recipeName, mood, ingredients) => {
  return `You are a nutrition and psychology expert. Explain in 2-3 sentences why "${recipeName}" is perfect for someone feeling "${mood}".

Recipe ingredients: ${ingredients.join(', ')}

Focus on:
- Nutritional benefits (vitamins, minerals, brain chemistry)
- Psychological comfort factors
- How it matches the energy level of this mood

Keep it encouraging, scientific but simple, and under 100 words.
Example: "This Rainbow Buddha Bowl is perfect when you're happy because..."`;
};
```

#### **Prompt 2: Personalized Tips**
```javascript
const generatePersonalizedTip = (mood, timeOfDay, season) => {
  return `Give a short personalized cooking tip for someone feeling "${mood}" at ${timeOfDay} during ${season}.

Make it specific and actionable. Examples:
- "Add extra berries for morning energy"
- "Serve warm for evening comfort"
- "Try with seasonal vegetables"

Keep it under 50 words.`;
};
```

#### **Prompt 3: Alternative Suggestions**
```javascript
const generateAlternatives = (mood, dietaryRestrictions) => {
  return `Someone feeling "${mood}" didn't like their food suggestion. 
  
Dietary restrictions: ${dietaryRestrictions || 'none'}

Suggest 2 quick alternative foods that would work better:
1. [Food name] - [Why it's good for this mood]
2. [Food name] - [Why it's good for this mood]

Keep each suggestion under 30 words.`;
};
```

### **AI Response Format:**
```javascript
// What AI will return
{
  explanation: "This Rainbow Buddha Bowl is perfect when you're happy because the colorful vegetables provide mood-boosting vitamins and antioxidants. The quinoa gives sustained energy to keep your positive mood going.",
  personalizedTip: "Add extra avocado for healthy fats that support brain function and enhance your happy mood.",
  confidence: 0.85,
  sources: ["nutrition science", "mood psychology"]
}
```

### **AI Integration Points in Your App:**

#### **Point 1: Enhanced Suggestion Page**
```javascript
// In your SuggestionPage.js, after getting Spoonacular data:
const enhanceWithAI = async (recipe, mood) => {
  const aiExplanation = await getAIExplanation(recipe.name, mood, recipe.ingredients);
  const personalizedTip = await getPersonalizedTip(mood);
  
  return {
    ...recipe,
    aiExplanation,
    personalizedTip
  };
};
```

#### **Point 2: Smart Fallback System**
```javascript
// Your current fallback + AI enhancement
const smartFallback = async (mood) => {
  const basicSuggestion = getFallbackSuggestion(mood);
  const aiExplanation = await getAIExplanation(basicSuggestion.name, mood);
  
  return {
    ...basicSuggestion,
    aiExplanation
  };
};
```

### **AI Fallback Strategy:**
1. **Primary:** OpenAI GPT-4 for explanations
2. **Secondary:** Pre-written mood explanations
3. **Tertiary:** Your current system (no AI)

### **Cost Management:**
- **Cache AI responses** (same recipe + mood = same explanation)
- **Batch requests** when possible
- **Use shorter prompts** to reduce costs
- **Free tier:** 3 requests/minute, $18 credit

---

## 📝 **Step 2 Checklist - AI Integration Planned:**

**AI Prompts:**
- [ ] Mood-food explanation prompt
- [ ] Personalized tip prompt  
- [ ] Alternative suggestion prompt

**AI Integration Points:**
- [ ] Enhanced suggestion display
- [ ] Smart fallback system
- [ ] Caching strategy

**AI Response Format:**
- [ ] Explanation text
- [ ] Personalized tip
- [ ] Confidence score

---

## 🚀 **Step 3: Create Documentation**

Now let's create the final documentation file to complete today's task!

---

## 📋 **Step 3: Complete Backend & AI Documentation**

### **Technology Stack Chosen:**
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (flexible for recipe data)
- **AI Service:** OpenAI GPT-4
- **Current API:** Spoonacular (keep working)

### **Implementation Timeline:**

#### **Day 4 (Tomorrow) - Backend Setup:**
1. **Morning:** Create Express.js server
2. **Afternoon:** Set up MongoDB database  
3. **Evening:** Build first endpoint (POST /api/mood)

#### **Day 5 - AI Integration:**
1. **Morning:** Add OpenAI API calls
2. **Afternoon:** Test AI explanations
3. **Evening:** Connect frontend to backend

#### **Day 6 - Testing & Polish:**
1. **Morning:** Test all endpoints
2. **Afternoon:** Add error handling
3. **Evening:** Deploy and celebrate! 🎉

### **Required API Keys:**
- **OpenAI API Key:** Get from https://platform.openai.com/
- **Spoonacular API Key:** You already have this setup

### **File Structure for Backend:**
```
backend/
├── server.js (main Express server)
├── routes/
│   ├── mood.js
│   ├── suggestion.js
│   └── feedback.js
├── models/
│   ├── Mood.js
│   ├── Suggestion.js
│   └── Feedback.js
├── services/
│   ├── aiService.js
│   └── spoonacularService.js
└── config/
    └── database.js
```

### **Environment Variables Needed:**
```bash
# .env file
MONGODB_URI=mongodb://localhost:27017/moodmeals
OPENAI_API_KEY=sk-your-key-here
SPOONACULAR_API_KEY=your-existing-key
PORT=5000
```

---

## ✅ **Day 3 Complete - All Steps Done!**

**What you've accomplished today:**

### **✅ Step 1: Backend Design**
- **3 endpoints planned** (mood, suggestion, feedback)
- **3 database tables designed** (user_moods, food_suggestions, user_feedback)
- **Clear data flow** from frontend to backend

### **✅ Step 2: AI Integration Approach**
- **OpenAI GPT-4 chosen** for smart explanations
- **3 AI prompts designed** (explanations, tips, alternatives)
- **Smart fallback strategy** planned

### **✅ Step 3: Documentation Created**
- **Complete technical plan** in ProjectDocs.md
- **Implementation timeline** for next 3 days
- **Technology stack** finalized

---

## 🎯 **Ready for Tomorrow (Day 4):**

**You have everything needed to start building:**
- Clear backend endpoints
- Database structure
- AI integration plan
- Technology choices
- Implementation timeline

**Tomorrow you'll start coding the actual backend!** 🚀

---

## 🔥 **What Makes Your Plan Special:**

1. **Builds on your existing frontend** - No wasted work
2. **AI-enhanced, not AI-dependent** - Reliable with smart features
3. **Scalable architecture** - Can grow with your app
4. **Professional approach** - Industry-standard patterns

**Your MoodMeals app is going to be amazing!** 🌟

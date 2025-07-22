# 🏗️ MoodMeals Technical Architecture

## 🎯 **System Architecture Overview**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 USER INTERFACE                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React)                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                │
│  │  LandingPage.js │  │ MoodInputPage.js│  │SuggestionPage.js│                │
│  │                 │  │                 │  │                 │                │
│  │ • Welcome UI    │  │ • Mood Selection│  │ • Recipe Display│                │
│  │ • Feature Info  │  │ • 6 Mood Types  │  │ • Recipe Modal  │                │
│  │ • Navigation    │  │ • Validation    │  │ • Interactions  │                │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                │
│                                        │                                       │
│                            ┌─────────────────┐                                │
│                            │   API Service   │                                │
│                            │                 │                                │
│                            │ • HTTP Requests │                                │
│                            │ • Error Handling│                                │
│                            │ • Fallback Data │                                │
│                            └─────────────────┘                                │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼ HTTP/JSON
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            BACKEND (Express.js)                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                │
│  │   server.js     │  │ foodController  │  │  foodRoutes.js  │                │
│  │                 │  │                 │  │                 │                │
│  │ • CORS Setup    │  │ • Business Logic│  │ • Route Mapping │                │
│  │ • Middleware    │  │ • API Integration│  │ • HTTP Methods  │                │
│  │ • Port Config   │  │ • Error Handling│  │ • Parameter Val │                │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                │
│                                        │                                       │
│                            ┌─────────────────┐                                │
│                            │ Environment     │                                │
│                            │                 │                                │
│                            │ • API Keys      │                                │
│                            │ • Port Settings │                                │
│                            │ • Security Config│                               │
│                            └─────────────────┘                                │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼ HTTPS/JSON
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL API (Spoonacular)                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                │
│  │Recipe Search API│  │Recipe Details   │  │ Nutrition Data  │                │
│  │                 │  │                 │  │                 │                │
│  │ • 300k+ Recipes │  │ • Ingredients   │  │ • Calories      │                │
│  │ • Image URLs    │  │ • Instructions  │  │ • Macronutrients│                │
│  │ • Cooking Time  │  │ • Serving Size  │  │ • Health Info   │                │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 **Data Flow Diagram**

```
User Action → React Component → API Service → Backend Controller → Spoonacular API
    ↓              ↓               ↓               ↓                     ↓
 UI Update ← State Update ← Response ← JSON Response ← Recipe Data
```

## 🗂️ **File Structure & Responsibilities**

### **Frontend Structure**
```
src/
├── pages/
│   ├── LandingPage.js          # Entry point UI
│   ├── MoodInputPage.js        # Mood selection interface
│   └── SuggestionPage.js       # Recipe display & modal
├── services/
│   └── api.js                  # HTTP client & error handling
├── App.js                      # Router configuration
├── App.css                     # Global styles & animations
└── index.js                    # React DOM entry point
```

### **Backend Structure**
```
Backend/
├── controllers/
│   └── foodController.js       # Business logic
├── routes/
│   └── foodRoutes.js          # API endpoints
├── server.js                  # Express server setup
├── .env                       # Environment variables
└── package.json               # Dependencies
```

## 🔐 **Security Architecture**

```
Frontend Security:
├── Input Validation
├── XSS Prevention
├── HTTPS Only
└── Environment Variables

Backend Security:
├── CORS Configuration
├── API Key Management
├── Input Sanitization
├── Error Handling
└── Rate Limiting Ready
```

## 🚀 **Performance Architecture**

```
Frontend Performance:
├── React Optimization
│   ├── Functional Components
│   ├── Efficient State Management
│   └── Lazy Loading Ready
├── CSS Optimization
│   ├── Efficient Animations
│   ├── Responsive Design
│   └── Minimal Bundle Size
└── API Optimization
    ├── Request Caching
    ├── Error Boundaries
    └── Timeout Handling

Backend Performance:
├── Express.js Optimization
│   ├── Middleware Efficiency
│   ├── JSON Parsing
│   └── Route Optimization
├── API Integration
│   ├── Connection Pooling
│   ├── Response Caching
│   └── Error Recovery
└── Environment Management
    ├── Configuration Loading
    ├── Secret Management
    └── Performance Monitoring
```

## 🔧 **Development Workflow**

```
Development Environment:
├── Frontend: http://localhost:3001
├── Backend: http://localhost:5000
├── Hot Reloading: React Scripts
├── API Testing: Custom test scripts
└── Environment: .env configuration

Production Ready:
├── Frontend: npm run build
├── Backend: npm start
├── Environment: Production configs
├── Deployment: Vercel/Netlify ready
└── Monitoring: Error tracking ready
```

## 📊 **Technology Stack Summary**

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Frontend | React | 19.1.0 | UI Framework |
| Frontend | React Router | 7.6.3 | Navigation |
| Frontend | Axios | 1.10.0 | HTTP Client |
| Backend | Express.js | 5.1.0 | Web Framework |
| Backend | Node.js | Latest | Runtime |
| Backend | Axios | 1.10.0 | API Client |
| External | Spoonacular | Latest | Recipe Data |
| Styling | Custom CSS | - | UI Design |
| Environment | dotenv | 17.2.0 | Config Management |

## 🎯 **API Integration Points**

### **Internal API Endpoints**
```
POST /api/food/suggestion/:mood
GET  /api/food/search?query=:term
GET  /api/food/recipe/:id
```

### **External API Integration**
```
Spoonacular API:
├── Recipe Search: /recipes/complexSearch
├── Recipe Details: /recipes/:id/information
├── Nutrition Data: /recipes/:id/nutritionWidget.json
└── Authentication: API Key in headers
```

## 🛡️ **Error Handling Strategy**

```
Frontend Error Handling:
├── API Request Failures
├── Network Connectivity Issues
├── Invalid User Input
├── Component Error Boundaries
└── Graceful Degradation

Backend Error Handling:
├── Spoonacular API Failures
├── Invalid Request Parameters
├── Network Timeout Issues
├── Environment Configuration Errors
└── Database Connection Issues (Ready)
```

## 🎨 **UI/UX Architecture**

```
Design System:
├── Color Scheme: Purple gradient (#667eea → #764ba2)
├── Typography: Segoe UI font stack
├── Layout: CSS Grid & Flexbox
├── Animations: CSS keyframes
├── Responsive: Mobile-first approach
└── Accessibility: WCAG guidelines ready

User Experience Flow:
Landing Page → Mood Selection → Recipe Display → Recipe Details
     ↓              ↓               ↓               ↓
  Welcome UI → Interactive Grid → Recipe Cards → Modal View
```

This technical architecture provides a solid foundation for scaling the application with additional features like user authentication, database integration, and advanced AI-powered recommendations.

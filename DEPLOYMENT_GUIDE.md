# 🚀 MoodMeals Deployment Guide

## 🎯 **Deployment Strategy**

### **Phase 1: API Key Integration (Today)**
1. ✅ Get Spoonacular API key
2. ✅ Update .env file
3. ✅ Test real data integration
4. ✅ Verify all endpoints work

### **Phase 2: Backend Deployment (Railway/Render)**
1. Push backend to GitHub
2. Create Railway/Render account
3. Deploy backend as web service
4. Configure environment variables
5. Test deployed backend

### **Phase 3: Frontend Deployment (Vercel/Netlify)**
1. Update frontend API URL
2. Push frontend to GitHub
3. Deploy on Vercel/Netlify
4. Test full production app

---

## 🔧 **Step-by-Step Deployment**

### **1. Prepare for Deployment**

#### **Backend Preparation:**
- ✅ Express server configured
- ✅ Environment variables ready
- ✅ CORS configured
- ✅ Port configuration (process.env.PORT)

#### **Frontend Preparation:**
- ✅ React app built and tested
- ✅ API service configured
- ✅ Responsive design ready
- ✅ Build script working

### **2. Backend Deployment (Railway)**

#### **Why Railway?**
- Free tier available
- Easy GitHub integration
- Automatic deployments
- Built-in database options

#### **Steps:**
1. Create Railway account: https://railway.app
2. Connect GitHub repository
3. Deploy backend folder
4. Add environment variables:
   ```
   PORT=5000
   SPOONACULAR_API_KEY=your_key_here
   ```
5. Get deployment URL: `https://your-app.railway.app`

### **3. Frontend Deployment (Vercel)**

#### **Why Vercel?**
- Perfect for React apps
- Automatic deployments
- Fast global CDN
- Free tier generous

#### **Steps:**
1. Update API base URL in frontend
2. Create Vercel account: https://vercel.com
3. Connect GitHub repository
4. Deploy frontend folder
5. Get deployment URL: `https://your-app.vercel.app`

---

## 📋 **Pre-Deployment Checklist**

### **Backend Ready:**
- [ ] API key configured
- [ ] All endpoints tested
- [ ] CORS configured for production
- [ ] Environment variables documented
- [ ] Error handling implemented

### **Frontend Ready:**
- [ ] Build script working (`npm run build`)
- [ ] API URLs configurable
- [ ] Responsive design tested
- [ ] No console errors
- [ ] Production build optimized

---

## 🎯 **Post-Deployment Testing**

### **Backend Testing:**
```bash
# Test deployed backend
curl https://your-backend-url.railway.app/api/food/suggestion/happy
```

### **Frontend Testing:**
```bash
# Test deployed frontend
# Visit: https://your-frontend-url.vercel.app
# Test full user flow
```

---

## 📊 **Expected Timeline**

| Phase | Time | Status |
|-------|------|--------|
| API Key Setup | 10 mins | ⏳ In Progress |
| Backend Deploy | 30 mins | ⏳ Pending |
| Frontend Deploy | 20 mins | ⏳ Pending |
| Testing | 15 mins | ⏳ Pending |
| **Total** | **75 mins** | **🎯 Today** |

---

## 🎉 **Final Result**

After deployment, you'll have:
- **Production Backend**: `https://moodmeals-backend.railway.app`
- **Production Frontend**: `https://moodmeals.vercel.app`
- **Real Recipe Data**: From Spoonacular API
- **Portfolio Ready**: Deployed full-stack app

Let's get your API key first, then we'll deploy! 🚀

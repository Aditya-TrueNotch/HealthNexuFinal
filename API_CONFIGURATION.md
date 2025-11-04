# API Configuration Guide

This document lists all the API key placeholders in the Health Nexus application and where to configure them.

## 🔑 Required API Keys

### 1. **Google Gemini API Key** (Medical Report Analysis & All AI Features)
- **Used For**: AI-powered medical report summarization and all AI-based features
- **Where to Add**: 
  - **Supabase Dashboard**: Settings → Edge Functions → Secrets → Add `GEMINI_API_KEY`
  - **Link**: https://supabase.com/dashboard/project/mndxzewzaxfhdgzhpghw/settings/functions
- **Code Location**: `supabase/functions/analyze-medical-report/index.ts` (Line 71-76)
- **How to Get**: https://aistudio.google.com/app/apikey
- **Model Used**: `gemini-2.0-flash-exp` (Fast and efficient model for medical analysis)

---

## 📍 Feature-Specific API Placeholders

### 2. **Doctor/Lab Finder API** (Optional)
- **Used For**: Finding nearby doctors and diagnostic labs
- **Status**: Currently disabled - placeholder ready
- **Code Location**: `src/pages/DoctorLabIntegration.tsx`
- **Required API**: 
  - Google Places API or similar location-based API
  - Healthcare directory API
  - **OR** Use Gemini API with location-based prompts
- **Where to Configure**: Create new edge function and add API key to Supabase secrets
- **Edge Function Name**: `find-doctors-labs` (to be created)

### 3. **Symptom Checker API** (Optional)
- **Used For**: AI-powered symptom analysis
- **Status**: Currently disabled - placeholder ready
- **Code Location**: `src/pages/SymptomChecker.tsx`
- **Required API**: 
  - Google Gemini API (same `GEMINI_API_KEY`)
- **Where to Configure**: Create new edge function `check-symptoms`
- **Edge Function Name**: `check-symptoms` (to be created)

### 4. **Chronic Disease Predictor API** (Optional)
- **Used For**: Risk assessment for cardiovascular and diabetes
- **Status**: Currently disabled - placeholder ready
- **Code Location**: `src/pages/ChronicDiseasePredictor.tsx`
- **Required API**: 
  - Google Gemini API (same `GEMINI_API_KEY`)
- **Where to Configure**: Create new edge function `predict-disease-risk`
- **Edge Function Name**: `predict-disease-risk` (to be created)

### 5. **Nutrition Planner API** (Optional)
- **Used For**: Daily nutrition tracking and meal planning
- **Status**: Currently disabled - placeholder ready
- **Code Location**: `src/pages/NutritionPlanner.tsx`
- **Required API**: 
  - Google Gemini API (same `GEMINI_API_KEY`)
  - **OR** Nutritionix API / Edamam API
- **Where to Configure**: Create new edge function `plan-nutrition`
- **Edge Function Name**: `plan-nutrition` (to be created)

### 6. **Digital First Aid API** (Optional)
- **Used For**: First aid guidance and ASHA worker connection
- **Status**: Currently disabled - placeholder ready
- **Code Location**: `src/pages/DigitalFirstAid.tsx`
- **Required API**: 
  - Google Gemini API (same `GEMINI_API_KEY`)
- **Where to Configure**: Create new edge function `digital-first-aid`
- **Edge Function Name**: `digital-first-aid` (to be created)

### 7. **Smart Notifications AI** (Optional)
- **Used For**: AI-powered health notifications
- **Status**: Currently disabled - placeholder ready
- **Code Location**: `src/pages/SmartNotifications.tsx`
- **Required API**: 
  - Google Gemini API (same `GEMINI_API_KEY`)
- **Where to Configure**: Create new edge function `smart-notifications`
- **Edge Function Name**: `smart-notifications` (to be created)

---

## 🛠️ How to Add API Keys to Supabase

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/mndxzewzaxfhdgzhpghw/settings/functions

2. **Click "Edge Function Secrets"**

3. **Add New Secret**:
   - Enter the secret name (e.g., `GEMINI_API_KEY`)
   - Paste your API key value
   - Click "Save"

4. **Restart Edge Functions** (automatic on deploy)

---

## 🔧 How to Get Google Gemini API Key

1. Go to **Google AI Studio**: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the generated API key
5. Add it to Supabase Edge Function Secrets as `GEMINI_API_KEY`

**Important Notes:**
- Gemini API has a free tier with generous limits
- Monitor your usage at: https://aistudio.google.com/app/apikey
- The free tier includes 1500 requests per day for `gemini-2.0-flash-exp`

---

## 📝 Code Placeholder Pattern

All disabled features follow this pattern:

```tsx
<Button disabled className="w-full">
  <Lock className="mr-2 h-4 w-4" />
  Feature Name (Requires API Key)
</Button>
<p className="text-sm text-muted-foreground mt-2">
  This feature requires an API key. Contact support to enable.
</p>
```

To enable a feature:
1. Add the required API key to Supabase secrets
2. Create or update the edge function
3. Remove the `disabled` prop and update the button text
4. Implement the API call logic

---

## 🔐 Security Best Practices

✅ **DO**:
- Always store API keys in Supabase Edge Function Secrets
- Use environment variables (`Deno.env.get('KEY_NAME')`)
- Add proper error handling for missing keys
- Use CORS headers for edge functions

❌ **DON'T**:
- Never hardcode API keys in frontend code
- Never commit API keys to version control
- Never expose API keys in client-side JavaScript
- Don't use `.env` files (not supported in this project)

---

## 📊 Current Status Summary

| Feature | API Required | Status | Priority |
|---------|-------------|--------|----------|
| Medical Report Analysis | Gemini API | ⚠️ Needs Key | High |
| Doctor/Lab Finder | Gemini/Google Places | 🔒 Disabled | Medium |
| Symptom Checker | Gemini API | 🔒 Disabled | Medium |
| Chronic Disease Predictor | Gemini API | 🔒 Disabled | Low |
| Nutrition Planner | Gemini API | 🔒 Disabled | Low |
| Digital First Aid | Gemini API | 🔒 Disabled | Medium |
| Smart Notifications | Gemini API | 🔒 Disabled | Low |

---

## 🚀 Quick Start Guide

### Step 1: Get Gemini API Key
1. Visit https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Create API key
4. Copy the key

### Step 2: Add to Supabase
1. Go to https://supabase.com/dashboard/project/mndxzewzaxfhdgzhpghw/settings/functions
2. Add secret: `GEMINI_API_KEY`
3. Paste your API key
4. Save

### Step 3: Test Medical Report Analysis
1. Log in to Health Nexus
2. Go to Dashboard → Medical Report Summarizer
3. Upload a medical report (PDF or image)
4. View AI-powered analysis

### Step 4: Enable Other Features (Optional)
- All features use the same `GEMINI_API_KEY`
- Create edge functions for each feature as needed
- Follow the edge function patterns in `analyze-medical-report`

---

## 📞 Support

For questions about API configuration:
- Supabase Documentation: https://supabase.com/docs
- Edge Functions Guide: https://supabase.com/docs/guides/functions

---

**Last Updated**: 2025-10-29

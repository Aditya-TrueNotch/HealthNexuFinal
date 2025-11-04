# Health Nexus - AI-Powered Health Management Platform

## 📋 Project Overview

Health Nexus is a comprehensive AI-powered health management platform that provides intelligent healthcare solutions including medical report analysis, symptom checking, disease risk prediction, nutrition planning, and more. The platform leverages Google's Gemini AI to deliver personalized health insights and recommendations.

## 🚀 Live Demo

Visit the deployed application to see all features in action.

## 🛠️ Technologies Used

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible component library
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon system
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **Sonner** - Toast notifications

### Backend & Infrastructure
- **Supabase** - Backend-as-a-Service
  - PostgreSQL Database
  - Authentication
  - Storage (for medical reports)
  - Edge Functions (serverless)
- **Deno** - Runtime for Edge Functions
- **Google Gemini API** - AI-powered analysis and insights

## 🏗️ Project Architecture

### Frontend Architecture
```
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   ├── auth/         # Authentication components
│   ├── Hero.tsx      # Landing page hero
│   ├── Features.tsx  # Feature showcase
│   ├── Benefits.tsx  # Benefits section
│   └── ...
├── pages/            # Route pages
│   ├── Index.tsx     # Landing page
│   ├── Dashboard.tsx # Main dashboard
│   ├── AIChat.tsx    # AI chatbot
│   ├── MedicalReportSummarizer.tsx
│   ├── SymptomChecker.tsx
│   ├── ChronicDiseasePredictor.tsx
│   ├── NutritionPlanner.tsx
│   ├── DigitalFirstAid.tsx
│   ├── DoctorLabIntegration.tsx
│   └── SmartNotifications.tsx
├── integrations/     # External service integrations
│   └── supabase/     # Supabase client and types
├── hooks/            # Custom React hooks
└── lib/              # Utility functions
```

### Backend Architecture (Supabase Edge Functions)
```
supabase/functions/
├── analyze-medical-report/    # PDF/Image analysis
├── symptom-checker/           # Symptom analysis
├── find-doctors-labs/         # Healthcare provider search
├── predict-disease-risk/      # Disease risk assessment
├── plan-nutrition/            # Nutrition planning
├── digital-first-aid/         # Emergency guidance
├── smart-notifications/       # Health notifications
└── health-chatbot/            # AI health assistant
```

## 🗄️ Database Schema

### Tables

#### `medical_report_analyses`
Stores analyzed medical reports with AI-generated insights.

```sql
- id: UUID (Primary Key)
- user_id: UUID (References auth.users)
- file_name: TEXT
- file_type: TEXT
- storage_path: TEXT
- summary: TEXT
- key_findings: TEXT[]
- recommendations: TEXT[]
- severity_level: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Storage Buckets

#### `medical-reports`
- Private bucket for storing user-uploaded medical reports (PDFs and images)
- Secured with Row Level Security (RLS) policies

## 🤖 AI Integration - Google Gemini API

All AI features use the **Gemini API** (`gemini-2.0-flash-exp` model) through Supabase Edge Functions.

### API Configuration
- **API Key**: Stored as `GEMINI_API_KEY` in Supabase secrets
- **Model**: `gemini-2.0-flash-exp`
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`

### AI-Powered Features

1. **Medical Report Summarizer**
   - Analyzes PDFs and images of medical reports
   - Extracts key findings, recommendations, and severity level
   - Edge Function: `analyze-medical-report`

2. **Symptom Checker**
   - AI-powered symptom analysis
   - Emergency detection
   - Edge Function: `symptom-checker`

3. **Chronic Disease Risk Predictor**
   - Predicts risk for diabetes, heart disease, hypertension
   - Provides personalized recommendations
   - Edge Function: `predict-disease-risk`

4. **Nutrition & Diet Planner**
   - Creates personalized meal plans
   - Calorie and macro tracking
   - Edge Function: `plan-nutrition`

5. **Digital First Aid**
   - Emergency response guidance
   - Step-by-step instructions
   - Edge Function: `digital-first-aid`

6. **Doctor & Lab Finder**
   - Healthcare provider recommendations
   - Location-based search
   - Edge Function: `find-doctors-labs`

7. **Smart Notifications**
   - Personalized health tips
   - AI-generated recommendations
   - Edge Function: `smart-notifications`

8. **AI Health Chatbot**
   - Conversational health assistant
   - Context-aware responses
   - Edge Function: `health-chatbot`

## 🔐 Authentication & Security

- **Supabase Auth** for user authentication
- Email/password authentication
- Row Level Security (RLS) policies on all tables
- Secure file storage with access controls
- JWT-based API authentication for Edge Functions (disabled for public endpoints)

## 🎨 Design System & Customization

### Color Customization

The project uses a **semantic token-based design system** defined in `src/index.css` and `tailwind.config.ts`. All colors are HSL-based for consistency.

#### How to Change Colors

**Step 1: Update CSS Variables in `src/index.css`**

```css
:root {
  /* Primary brand color - change these values */
  --primary: 210 100% 50%;  /* Blue */
  --primary-foreground: 0 0% 100%;  /* White text */
  
  /* Accent colors */
  --accent: 210 100% 95%;
  --accent-foreground: 210 100% 20%;
  
  /* Background colors */
  --background: 0 0% 100%;  /* White */
  --foreground: 222 47% 11%;  /* Dark text */
  
  /* Gradients */
  --gradient-hero: linear-gradient(135deg, hsl(210 100% 50%), hsl(195 100% 45%));
  --gradient-primary: linear-gradient(135deg, hsl(210 100% 50%), hsl(220 100% 60%));
  --gradient-teal: linear-gradient(135deg, hsl(180 80% 50%), hsl(170 70% 45%));
}

.dark {
  /* Dark mode colors */
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  /* ... other dark mode colors */
}
```

**Step 2: Never Use Direct Colors in Components**

```tsx
// ❌ WRONG - Don't use direct colors
<div className="bg-blue-500 text-white">

// ✅ CORRECT - Use semantic tokens
<div className="bg-primary text-primary-foreground">
```

**Step 3: Use Gradient Classes**

```tsx
// Predefined gradients from index.css
<div className="bg-gradient-hero">
<div className="bg-gradient-primary">
<div className="bg-gradient-teal">
```

**Step 4: Customize shadcn/ui Components**

Edit `src/components/ui/button.tsx` to add custom variants:

```tsx
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Add custom variants here
        medical: "bg-gradient-primary text-white",
      }
    }
  }
)
```

### Typography Customization

Edit `tailwind.config.ts`:

```typescript
fontFamily: {
  sans: ["Inter", "system-ui", "sans-serif"],
  // Add custom fonts
  heading: ["Poppins", "sans-serif"],
}
```

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ with npm
- Supabase account
- Google Gemini API key

### Local Development

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Environment Configuration

The project uses Supabase, so no `.env` file is needed. Configuration is handled through:
- `src/integrations/supabase/client.ts` - Supabase connection
- Supabase Edge Function secrets for API keys

### Setting Up Supabase

1. **Create Supabase Project**: Already configured at `mndxzewzaxfhdgzhpghw.supabase.co`

2. **Add API Keys to Supabase Secrets**:
   - Go to: https://supabase.com/dashboard/project/mndxzewzaxfhdgzhpghw/settings/functions
   - Add `GEMINI_API_KEY` with your Google Gemini API key

3. **Deploy Edge Functions**: Automatically deployed when you push code

4. **Run Migrations**: Database tables are created via Supabase migrations

### Getting Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to Supabase secrets as `GEMINI_API_KEY`

## 🚀 Deployment

### Deploy to Production

The application can be deployed to any static hosting service (Vercel, Netlify, etc.)

**Build Command:**
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Build for Production

```bash
npm run build
```

## 📁 Project Structure Details

### Key Configuration Files

- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `supabase/config.toml` - Supabase Edge Functions config
- `components.json` - shadcn/ui configuration

### Important Files

- `src/index.css` - Global styles and design tokens (HSL colors)
- `src/App.tsx` - Main app component with routing
- `src/integrations/supabase/client.ts` - Supabase client setup
- `src/hooks/useAuth.tsx` - Authentication hook

## 🔧 Edge Functions Details

All Edge Functions follow this pattern:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userInput } = await req.json();
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    
    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
```

## 🐛 Debugging

### View Console Logs
- Open browser DevTools (F12)
- Check Console tab for errors

### Check Edge Function Logs
- Visit: https://supabase.com/dashboard/project/mndxzewzaxfhdgzhpghw/functions/{function-name}/logs

### Common Issues

1. **"API key not found"**: Ensure `GEMINI_API_KEY` is set in Supabase secrets
2. **CORS errors**: Check Edge Function CORS headers
3. **Authentication errors**: Verify Supabase client configuration

## 🔷 TypeScript Implementation

### Why TypeScript?

This project is built entirely with **TypeScript** to ensure:
- **Type Safety**: Catch errors at compile-time instead of runtime
- **Better Developer Experience**: IntelliSense, autocomplete, and inline documentation
- **Refactoring Confidence**: Rename and restructure code safely
- **Self-Documenting Code**: Types serve as inline documentation

### TypeScript Features Used

#### 1. **Database Type Safety**
Auto-generated types from Supabase schema in `src/integrations/supabase/types.ts`:

```typescript
import { Database } from '@/integrations/supabase/types';

type MedicalReport = Database['public']['Tables']['medical_report_analyses']['Row'];
type MedicalReportInsert = Database['public']['Tables']['medical_report_analyses']['Insert'];
```

#### 2. **Component Props Typing**
All React components have typed props:

```typescript
interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, onCtaClick }) => {
  // Component implementation
};
```

#### 3. **API Response Typing**
Edge function responses are typed:

```typescript
interface SymptomCheckResponse {
  analysis: string;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  recommendations: string[];
  isEmergency: boolean;
}

const response = await fetch('/functions/v1/symptom-checker');
const data: SymptomCheckResponse = await response.json();
```

#### 4. **Form Validation with Zod**
Type-safe form schemas:

```typescript
import { z } from 'zod';

const symptomFormSchema = z.object({
  symptoms: z.string().min(10, 'Please describe your symptoms in detail'),
  duration: z.string(),
  severity: z.enum(['mild', 'moderate', 'severe']),
  age: z.number().min(0).max(120),
});

type SymptomFormData = z.infer<typeof symptomFormSchema>;
```

#### 5. **Custom Hooks Typing**
Type-safe React hooks:

```typescript
interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  // Hook implementation
};
```

#### 6. **Utility Functions**
Typed utility functions in `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### TypeScript Configuration

**`tsconfig.json`** - Main TypeScript config:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Type Checking

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Watch mode for continuous checking
npx tsc --noEmit --watch
```

### Common TypeScript Patterns in This Project

#### Event Handlers
```typescript
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Handle form submission
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // Handle button click
};
```

#### Async Functions
```typescript
const fetchReports = async (): Promise<MedicalReport[]> => {
  const { data, error } = await supabase
    .from('medical_report_analyses')
    .select('*');
  
  if (error) throw error;
  return data;
};
```

#### State Management
```typescript
const [reports, setReports] = useState<MedicalReport[]>([]);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
```

### Benefits in This Project

1. **No Runtime Type Errors**: All type mismatches caught during development
2. **IDE Integration**: Full autocomplete for Supabase queries, component props, and API responses
3. **Refactoring Safety**: Change database schema → types update automatically
4. **Team Collaboration**: Clear contracts between components and functions
5. **Documentation**: Types serve as inline documentation

## 📝 Code Style

- **TypeScript**: Strict mode enabled with full type coverage
- **ESLint**: Configured for React and TypeScript best practices
- **Formatting**: Consistent 2-space indentation
- **Naming Conventions**: 
  - PascalCase for components and types/interfaces
  - camelCase for functions and variables
  - UPPER_CASE for constants
- **Import Organization**: 
  - External dependencies first
  - Internal imports second
  - Type imports separate

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - Feel free to use this project for your own purposes.

## 🔗 Useful Links

- **Supabase Documentation**: https://supabase.com/docs
- **Google Gemini API**: https://ai.google.dev/
- **React Documentation**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs

## 📊 Current Status

✅ All features fully functional with Gemini AI integration
✅ User authentication enabled
✅ File upload and storage working
✅ AI chatbot operational
✅ All edge functions deployed
✅ Responsive design implemented
✅ Dark mode support

## 🎯 Future Enhancements

- Real-time health monitoring
- Integration with wearable devices
- Multi-language support
- Advanced analytics dashboard
- Telemedicine consultation booking
- Medicine reminder notifications
- Health record export (PDF)

---

**Built with React, TypeScript, Supabase, and Google Gemini AI**

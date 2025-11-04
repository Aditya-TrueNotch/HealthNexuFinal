import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { planType, userProfile } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    console.log(`Creating ${planType} nutrition plan for:`, userProfile);

    const prompt = `You are a nutrition planning AI. Create a ${planType} plan based on:

${JSON.stringify(userProfile, null, 2)}

Provide:
1. Daily calorie target
2. Macronutrient breakdown (protein, carbs, fats)
3. Sample meal plan for one day (breakfast, lunch, dinner, snacks)
4. Key nutrients to focus on
5. Foods to include and avoid
6. Hydration recommendations

Focus on locally available, affordable foods. Make it practical and easy to follow.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const plan = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to create nutrition plan';

    console.log('Nutrition plan created successfully');

    return new Response(
      JSON.stringify({ plan }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in plan-nutrition:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
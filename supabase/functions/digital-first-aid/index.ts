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
    const { emergency, situation } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    console.log(`Providing first aid guidance for: ${emergency || situation}`);

    const prompt = `You are a first aid guidance AI. Provide immediate, clear, step-by-step first aid instructions for:

Situation: ${emergency || situation}

Provide:
1. IMMEDIATE ACTIONS (numbered steps, very clear)
2. What NOT to do (common mistakes to avoid)
3. Signs that require emergency services (call 112/108)
4. How to monitor the person
5. What information to tell emergency services if needed

CRITICAL: Start with "CALL EMERGENCY SERVICES IMMEDIATELY" if this is life-threatening.
Keep instructions simple, clear, and actionable. Use numbered steps.`;

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
    const guidance = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to provide first aid guidance';

    console.log('First aid guidance generated successfully');

    return new Response(
      JSON.stringify({ guidance }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in digital-first-aid:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
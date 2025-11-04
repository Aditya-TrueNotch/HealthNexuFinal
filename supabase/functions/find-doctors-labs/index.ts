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
    const { searchType, location, specialty } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    console.log(`Finding ${searchType} near ${location}, specialty: ${specialty}`);

    const prompt = `You are a healthcare directory assistant. Provide information about ${searchType} in ${location}${specialty ? ` specializing in ${specialty}` : ''}.

Generate a helpful response with:
1. General guidance on finding ${searchType} in the area
2. Types of facilities/specialists to look for
3. Important questions to ask when calling
4. What to prepare for the visit

Note: This is general guidance. For actual locations, users should search online directories or contact local health departments.`;

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
    const guidance = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to provide guidance';

    console.log('Search guidance generated successfully');

    return new Response(
      JSON.stringify({ guidance }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in find-doctors-labs:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
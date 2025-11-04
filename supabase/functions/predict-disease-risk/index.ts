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
    const { riskType, healthData } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    console.log(`Analyzing ${riskType} risk with data:`, healthData);

    const prompt = `You are a health risk assessment AI. Analyze the following health data for ${riskType} risk:

${JSON.stringify(healthData, null, 2)}

Provide:
1. Risk Level (Low, Moderate, High)
2. Key Risk Factors identified
3. Preventive Recommendations (lifestyle, diet, exercise)
4. Monitoring Suggestions
5. When to consult a doctor

Be thorough but encouraging, focusing on prevention and healthy lifestyle changes.`;

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
    const assessment = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to assess risk';

    console.log('Risk assessment completed successfully');

    return new Response(
      JSON.stringify({ assessment }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in predict-disease-risk:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
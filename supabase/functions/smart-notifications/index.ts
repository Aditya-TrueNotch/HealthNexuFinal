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
    const { userProfile, preferences } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    console.log('Generating smart health notifications');

    const prompt = `You are a personalized health notification AI. Generate 5 relevant health tips/reminders for today based on:

User Profile: ${JSON.stringify(userProfile, null, 2)}
Preferences: ${JSON.stringify(preferences, null, 2)}

Generate notifications for:
1. Morning health tip
2. Medication/supplement reminder (if applicable)
3. Nutrition/hydration reminder
4. Physical activity suggestion
5. Evening wellness tip

Make each notification:
- Short (1-2 sentences)
- Actionable
- Personalized to the user
- Encouraging and positive

Format as a JSON array with objects containing: { "time": "morning/afternoon/evening", "title": "...", "message": "..." }`;

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
    const notificationsText = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
    
    // Try to extract JSON from response
    let notifications = [];
    try {
      const jsonMatch = notificationsText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        notifications = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.log('Could not parse as JSON, using text response');
    }

    console.log('Smart notifications generated successfully');

    return new Response(
      JSON.stringify({ notifications: notifications.length > 0 ? notifications : notificationsText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in smart-notifications:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
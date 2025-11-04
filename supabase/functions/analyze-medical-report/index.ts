import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

console.log("✅ analyze-medical-report function initialized");

async function handleRequest(req: Request): Promise<Response> {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reportText, storagePath, fileType, fileName, userId } =
      await req.json();

    console.log("📄 Analyzing report:", fileName, "Type:", fileType);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let textToAnalyze = reportText;
    let fileUrl = "";
    let base64Content = "";
    let mimeType = "";

    // Download file if available
    if (storagePath) {
      const publicUrl = supabase.storage
        .from("medical-reports")
        .getPublicUrl(storagePath);
      fileUrl = publicUrl.data.publicUrl;

      const { data: fileData, error: downloadError } = await supabase.storage
        .from("medical-reports")
        .download(storagePath);

      if (downloadError) {
        console.error("❌ File download error:", downloadError);
        throw new Error("Failed to download file from storage");
      }

      if (fileType === "text/plain") {
        textToAnalyze = await fileData.text();
      } else if (
        fileType === "application/pdf" || fileType.startsWith("image/")
      ) {
        const arrayBuffer = await fileData.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        base64Content = btoa(String.fromCharCode(...bytes));
        mimeType = fileType;
      }
    }

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) throw new Error("GEMINI_API_KEY not configured");

    console.log("🤖 Sending request to Gemini...");

    const messages = [
      {
        role: "system",
        content:
          "You are a medical AI assistant that analyzes reports and provides structured, detailed medical summaries.",
      },
    ];

    if (base64Content) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyze this medical report (${fileName}) and extract key findings, diagnoses, and recommendations.`,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${base64Content}`,
            },
          },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: textToAnalyze || `Please analyze this report: ${fileUrl}`,
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${geminiApiKey}`,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: JSON.stringify(messages) }] }],
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI Error:", errText);
      throw new Error("Gemini API request failed");
    }

    const aiData = await response.json();
    const aiOutput = aiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("✅ AI response received");

    const { error: dbError } = await supabase.from("medical_report_analyses")
      .insert({
        user_id: userId,
        report_filename: fileName,
        report_url: fileUrl,
        analysis_summary: aiOutput.slice(0, 5000),
        key_findings: ["AI output processed"],
        recommendations: [],
        severity_level: "Medium",
      });

    if (dbError) {
      console.error("❌ Database error:", dbError);
      throw new Error("Failed to save analysis to database");
    }

    return new Response(
      JSON.stringify({ success: true, analysis: aiOutput }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("🔥 Error in analyze-medical-report:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
}

serve(handleRequest);

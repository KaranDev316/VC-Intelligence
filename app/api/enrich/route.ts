import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawUrl = body?.url;

    if (!rawUrl || typeof rawUrl !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'url' field" },
        { status: 400 }
      );
    }

    // -----------------------------
    // 1️⃣ Normalize URL
    // -----------------------------
    let targetUrl = rawUrl.trim();

    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = `https://${targetUrl}`;
    }

    // -----------------------------
    // 2️⃣ Fetch Website HTML
    // -----------------------------
    let html = "";

    try {
      const res = await fetch(targetUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; VCIntelBot/1.0; +https://example.com)",
        },
      });

      if (!res.ok) {
        return NextResponse.json(
          { error: `Failed to fetch website (${res.status})` },
          { status: 502 }
        );
      }

      html = await res.text();
    } catch (err) {
      console.error("Fetch error:", err);
      return NextResponse.json(
        { error: "Could not reach the website" },
        { status: 502 }
      );
    }

    // -----------------------------
    // 3️⃣ Clean HTML → Text
    // -----------------------------
    const cleaned = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "")
      .replace(/<header[\s\S]*?<\/header>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim()
      .slice(0, 12000);

    // Fallback if site is JS-heavy
    const safeContent =
      cleaned.length > 200 ? cleaned : html.slice(0, 8000);

    // -----------------------------
    // 4️⃣ OpenAI Call
    // -----------------------------
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const aiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `
You are a VC analyst.

Extract structured company intelligence from the website text below.

Return ONLY valid JSON in this format:

{
  "summary": "1-2 sentence company description",
  "whatTheyDo": ["3-6 bullet points"],
  "keywords": ["5-10 keywords"],
  "signals": ["2-4 inferred signals"]
}

Website text:
${safeContent}
        `,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("OpenAI error:", errText);

      return NextResponse.json(
        { error: "AI analysis failed" },
        { status: 502 }
      );
    }

    const aiData = await aiRes.json();

    const aiText =
      aiData.output?.[0]?.content?.[0]?.text || "";

    if (!aiText) {
      return NextResponse.json(
        { error: "Empty AI response" },
        { status: 502 }
      );
    }

    // -----------------------------
    // 5️⃣ Safe JSON Parse
    // -----------------------------
    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch (err) {
      console.error("Invalid AI JSON:", aiText);
      return NextResponse.json(
        { error: "Invalid AI JSON response" },
        { status: 502 }
      );
    }

    // -----------------------------
    // 6️⃣ Return Structured Result
    // -----------------------------
    return NextResponse.json({
      summary: parsed.summary || "",
      whatTheyDo: parsed.whatTheyDo || [],
      keywords: parsed.keywords || [],
      signals: parsed.signals || [],
      sources: [targetUrl],
      timestamp: new Date().toISOString(),
    });

  } catch (err) {
    console.error("Enrichment route error:", err);
    return NextResponse.json(
      { error: "Enrichment failed" },
      { status: 500 }
    );
  }
}
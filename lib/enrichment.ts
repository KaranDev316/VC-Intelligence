import type { Enrichment, EnrichmentBase } from "./types";

export const THESIS = {
  name: "API-First Fintech Infrastructure",
  description:
    "We invest in API-first infrastructure companies serving fintech and enterprise buyers.",
  keywords: [
    "api",
    "developer",
    "infrastructure",
    "fintech",
    "enterprise",
    "platform",
    "saas",
    "integration",
    "payments",
    "banking",
    "compliance",
  ],
  exclusions: [
    "gaming",
    "consumer social",
    "meme",
    "nft",
    "crypto",
    "b2c",
    "marketplace",
  ],
};

export function scoreAgainstThesis(enrichmentData: EnrichmentBase) {
  const text = [
    enrichmentData.summary || "",
    (enrichmentData.keywords || []).join(" "),
    (enrichmentData.whatTheyDo || []).join(" "),
  ]
    .join(" ")
    .toLowerCase();

  let score = 40;
  const matched: string[] = [];
  const excluded: string[] = [];
  const explanation: string[] = [];

  THESIS.keywords.forEach((kw) => {
    if (text.includes(kw)) {
      score += 10;
      matched.push(kw);
    }
  });

  THESIS.exclusions.forEach((ex) => {
    if (text.includes(ex)) {
      score -= 15;
      excluded.push(ex);
    }
  });

  score = Math.min(100, Math.max(0, score));

  if (matched.includes("api")) explanation.push("Strong API-first positioning detected");
  if (matched.includes("fintech")) explanation.push("Targets fintech vertical — core thesis alignment");
  if (matched.includes("enterprise")) explanation.push("Enterprise buyer focus matches fund thesis");
  if (matched.includes("infrastructure")) explanation.push("Infrastructure layer — high-leverage category");
  if (matched.includes("developer")) explanation.push("Developer-centric go-to-market");
  if (matched.includes("saas")) explanation.push("SaaS revenue model with recurring characteristics");
  if (matched.includes("integration")) explanation.push("Integration layer — strong platform potential");
  if (excluded.length > 0) explanation.push(`⚠ Exclusion signals: ${excluded.join(", ")}`);
  if (explanation.length === 0) explanation.push("Limited signal overlap with thesis keywords");

  return { score, matchedKeywords: matched, exclusionHits: excluded, explanation };
}

export async function simulateEnrichment(company: {
  description: string;
  founded: number;
  employees: number;
  raised: string;
  stage: string;
  hq: string;
  website: string;
}): Promise<Enrichment> {
  const res = await fetch("/api/enrich", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: `https://${company.website}` }),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error || "Enrichment failed");
  }

  const enriched: EnrichmentBase = {
    summary: data.summary,
    whatTheyDo: data.whatTheyDo,
    keywords: data.keywords,
    signals: data.signals,
    sources: data.sources,
    timestamp: data.timestamp,
  };

  const thesis = scoreAgainstThesis(enriched);
  return { ...enriched, ...thesis };
}


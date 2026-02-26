export type Company = {
  id: string;
  name: string;
  website: string;
  industry: string;
  stage: string;
  raised: string;
  founded: number;
  hq: string;
  employees: number;
  description: string;
};

export type EnrichmentBase = {
  summary: string;
  whatTheyDo: string[];
  keywords: string[];
  signals: string[];
  sources: string[];
  timestamp: string;
};

export type ThesisScore = {
  score: number;
  matchedKeywords: string[];
  exclusionHits: string[];
  explanation: string[];
};

export type Enrichment = EnrichmentBase & ThesisScore;


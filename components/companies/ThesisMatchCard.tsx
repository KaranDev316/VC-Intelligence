"use client";

import React from "react";
import { ProgressBar } from "../ui/ProgressBar";
import { Tag } from "../ui/Tag";
import { THESIS } from "../../lib/enrichment";
import type { Enrichment } from "../../lib/types";

type Props = {
  enrichment?: Enrichment;
};

export function ThesisMatchCard({ enrichment }: Props) {
  if (!enrichment) {
    return (
      <div
        style={{
          background: "#0f1117",
          border: "1px solid #1e2130",
          borderRadius: 12,
          padding: 28,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>🧭</div>
        <div style={{ color: "#64748b", fontSize: 14 }}>
          Enrich this company to see thesis alignment score
        </div>
      </div>
    );
  }

  const { score, matchedKeywords, exclusionHits, explanation } = enrichment;
  const reasons = explanation.filter((e) => !e.startsWith("⚠"));
  const risks = explanation.filter((e) => e.startsWith("⚠"));

  return (
    <div
      style={{
        background: "#0f1117",
        border: "1px solid #1e2130",
        borderRadius: 12,
        padding: 28,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#475569",
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        Thesis Match
      </div>
      <div
        style={{
          fontSize: 11,
          color: "#475569",
          marginBottom: 20,
          lineHeight: 1.5,
        }}
      >
        {THESIS.description}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            fontFamily: "monospace",
            lineHeight: 1,
            color: score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444",
          }}
        >
          {score}
        </div>
        <div
          style={{ fontSize: 18, color: "#475569", paddingBottom: 6 }}
        >
          /100
        </div>
      </div>
      <ProgressBar value={score} />

      {reasons.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              fontSize: 11,
              color: "#475569",
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Why it matches
          </div>
          {reasons.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 7,
                fontSize: 13,
                color: "#94a3b8",
              }}
            >
              <span style={{ color: "#22c55e" }}>✓</span> {r}
            </div>
          ))}
        </div>
      )}

      {matchedKeywords.length > 0 && (
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {matchedKeywords.map((k) => (
            <Tag key={k} label={k} color="#22c55e" />
          ))}
        </div>
      )}

      {risks.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              fontSize: 11,
              color: "#475569",
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Potential risks
          </div>
          {risks.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 7,
                fontSize: 13,
                color: "#fbbf24",
              }}
            >
              <span>⚠</span> {r.replace("⚠ ", "")}
            </div>
          ))}
        </div>
      )}

      {exclusionHits.length > 0 && (
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {exclusionHits.map((k) => (
            <Tag key={k} label={k} color="#ef4444" />
          ))}
        </div>
      )}
    </div>
  );
}


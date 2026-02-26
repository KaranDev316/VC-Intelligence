"use client";

import React, { useState } from "react";
import { btnStyle, btnPrimaryStyle } from "../ui/buttonStyles";
import { Tag } from "../ui/Tag";
import { simulateEnrichment } from "../../lib/enrichment";
import type { Company, Enrichment } from "../../lib/types";

type Props = {
  company: Company;
  enrichment?: Enrichment;
  onEnrich: (data: Enrichment) => void;
};

export function EnrichmentPanel({ company, enrichment, onEnrich }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEnrich() {
    setLoading(true);
    setError(null);
    try {
      const result = await simulateEnrichment(company);
      onEnrich(result);
    } catch {
      setError("We couldn’t extract enrichment data from this website. It may be unavailable or blocking automated access.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div
        style={{
          background: "#0f1117",
          border: "1px solid #1e2130",
          borderRadius: 12,
          padding: 32,
          textAlign: "center",
        }}
      >
        <div
          style={{
            animation: "spin 1s linear infinite",
            display: "inline-block",
            fontSize: 28,
            marginBottom: 12,
          }}
        >
          ⟳
        </div>
        <div style={{ color: "#64748b", fontSize: 14 }}>
          Fetching website content and scoring against thesis…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          background: "#0f1117",
          border: "1px solid #ef444422",
          borderRadius: 12,
          padding: 24,
        }}
      >
        <div style={{ color: "#ef4444", marginBottom: 12 }}>{error}</div>
        <button onClick={handleEnrich} style={btnStyle}>
          Retry
        </button>
      </div>
    );
  }

  if (!enrichment) {
    return (
      <div
        style={{
          background: "#0f1117",
          border: "1px dashed #1e2130",
          borderRadius: 12,
          padding: 32,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
        <div
          style={{
            color: "#64748b",
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          No enrichment data yet. Fetch website signals and score against your
          thesis.
        </div>
        <button onClick={handleEnrich} style={btnPrimaryStyle}>
          Enrich Company
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#0f1117",
        border: "1px solid #1e2130",
        borderRadius: 12,
        padding: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#475569",
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Enrichment Data
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span
            style={{
              fontSize: 11,
              color: "#334155",
            }}
          >
            Updated {new Date(enrichment.timestamp).toLocaleString()}
          </span>
          <button
            onClick={handleEnrich}
            style={{ ...btnStyle, padding: "4px 12px", fontSize: 12 }}
          >
            Re-enrich
          </button>
        </div>
      </div>

      <div
        style={{
          color: "#94a3b8",
          fontSize: 14,
          lineHeight: 1.7,
          marginBottom: 20,
        }}
      >
        {enrichment.summary}
      </div>

      <div style={{ marginBottom: 20 }}>
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
          What they do
        </div>
        {enrichment.whatTheyDo.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
              fontSize: 13,
              color: "#64748b",
            }}
          >
            <span style={{ color: "#3b82f6" }}>›</span> {item}
          </div>
        ))}
      </div>

      {enrichment.keywords.length > 0 && (
        <div style={{ marginBottom: 20 }}>
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
            Keywords
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {enrichment.keywords.map((k) => (
              <Tag key={k} label={k} />
            ))}
          </div>
        </div>
      )}

      {enrichment.signals.length > 0 && (
        <div style={{ marginBottom: 20 }}>
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
            Signals
          </div>
          {enrichment.signals.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 7,
                fontSize: 13,
                color: "#64748b",
              }}
            >
              <span style={{ color: "#8b5cf6" }}>◆</span> {s}
            </div>
          ))}
        </div>
      )}

      <div>
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
          Sources
        </div>
        {enrichment.sources.map((s, i) => (
          <div
            key={i}
            style={{
              fontSize: 12,
              color: "#3b82f6",
              marginBottom: 4,
            }}
          >
            ⎋ {s}
          </div>
        ))}
      </div>
    </div>
  );
}


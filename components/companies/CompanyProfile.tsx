"use client";

import React, { useState } from "react";
import type { Company, Enrichment } from "../../lib/types";
import { storage } from "../../lib/storage";
import { btnStyle, btnPrimaryStyle } from "../ui/buttonStyles";
import { Tag } from "../ui/Tag";
import { ScoreBadge } from "../ui/ScoreBadge";
import { ThesisMatchCard } from "./ThesisMatchCard";
import { EnrichmentPanel } from "../enrichment/EnrichmentPanel";

type List = {
  id: string;
  name: string;
  companyIds: string[];
};

type Props = {
  company: Company;
  enrichment?: Enrichment;
  onEnrich: (data: Enrichment) => void;
  onBack: () => void;
  lists: List[];
  onSaveToList: (companyId: string, listId: string) => void;
};

export function CompanyProfile({
  company,
  enrichment,
  onEnrich,
  onBack,
  lists,
  onSaveToList,
}: Props) {
  const [note, setNote] = useState(() => storage.get<string>(`note_${company.id}`) || "");
  const [selectedList, setSelectedList] = useState("");

  function saveNote(val: string) {
    setNote(val);
    storage.set(`note_${company.id}`, val);
  }

  const MOCK_SIGNALS = [
    {
      date: "2024-01",
      event: "Series A closed",
      detail: `${company.raised} led by top-tier VCs`,
    },
    {
      date: "2023-09",
      event: "Product launch",
      detail: "API v2.0 released with new enterprise features",
    },
    {
      date: "2023-06",
      event: "Team growth",
      detail: `Headcount grew to ${company.employees}`,
    },
    {
      date: "2023-01",
      event: "Founded",
      detail: `Company incorporated in ${company.hq}`,
    },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{ ...btnStyle, marginBottom: 24, fontSize: 12 }}
      >
        ← Back to companies
      </button>

      <div
        style={{
          background: "#0a0d14",
          border: "1px solid #1e2130",
          borderRadius: 16,
          padding: 32,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#f1f5f9",
                marginBottom: 8,
                fontFamily: "'Georgia', serif",
              }}
            >
              {company.name}
            </h1>
            <div
              style={{
                color: "#3b82f6",
                fontSize: 13,
                marginBottom: 12,
              }}
            >
              ↗ {company.website}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Tag label={company.industry} color="#3b82f6" />
              <Tag label={company.stage} color="#8b5cf6" />
              <Tag label={company.raised} color="#22c55e" />
              <Tag label={company.hq} />
            </div>
          </div>
          {enrichment && <ScoreBadge score={enrichment.score} />}
        </div>
        <p
          style={{
            color: "#64748b",
            fontSize: 14,
            lineHeight: 1.7,
            marginTop: 20,
          }}
        >
          {company.description}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 24,
        }}
      >
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
              fontSize: 11,
              color: "#475569",
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Signals Timeline
          </div>
          {MOCK_SIGNALS.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom:
                  i < MOCK_SIGNALS.length - 1 ? "1px solid #1e2130" : "none",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#334155",
                  fontFamily: "monospace",
                  whiteSpace: "nowrap",
                  paddingTop: 2,
                }}
              >
                {s.date}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#e2e8f0",
                    fontWeight: 600,
                  }}
                >
                  {s.event}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#475569",
                    marginTop: 2,
                  }}
                >
                  {s.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

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
              fontSize: 11,
              color: "#475569",
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Notes
          </div>
          <textarea
            value={note}
            onChange={(e) => saveNote(e.target.value)}
            placeholder="Add your notes about this company…"
            style={{
              width: "100%",
              minHeight: 140,
              background: "#0a0d14",
              border: "1px solid #1e2130",
              borderRadius: 8,
              padding: 12,
              color: "#94a3b8",
              fontSize: 13,
              fontFamily: "inherit",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              lineHeight: 1.6,
            }}
          />
          <div
            style={{
              fontSize: 11,
              color: "#334155",
              marginTop: 8,
            }}
          >
            Auto-saved to local storage
          </div>
        </div>
      </div>

      {lists.length > 0 && (
        <div
          style={{
            background: "#0f1117",
            border: "1px solid #1e2130",
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
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
            Save to List
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <select
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              style={{
                flex: 1,
                background: "#0a0d14",
                border: "1px solid #1e2130",
                borderRadius: 8,
                padding: "8px 12px",
                color: "#94a3b8",
                fontSize: 13,
                fontFamily: "inherit",
              }}
            >
              <option value="">Choose a list…</option>
              {lists.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                selectedList && onSaveToList(company.id, selectedList)
              }
              style={btnPrimaryStyle}
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 11,
            color: "#475569",
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Thesis Score
        </div>
        <ThesisMatchCard enrichment={enrichment} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 11,
            color: "#475569",
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Enrichment
        </div>
        <EnrichmentPanel
          company={company}
          enrichment={enrichment}
          onEnrich={onEnrich}
        />
      </div>
    </div>
  );
}


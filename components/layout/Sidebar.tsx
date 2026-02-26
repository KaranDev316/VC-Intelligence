"use client";

import React from "react";

type SidebarItem = {
  id: string;
  label: string;
  icon: string;
};

type Props = {
  page: string;
  onChangePage: (id: string) => void;
  enrichedCount: number;
  highScoreCount: number;
};

const ITEMS: SidebarItem[] = [
  { id: "companies", label: "Companies", icon: "◈" },
  { id: "lists", label: "Lists", icon: "◧" },
  { id: "saved", label: "Saved Searches", icon: "◉" },
];

export function Sidebar({ page, onChangePage, enrichedCount, highScoreCount }: Props) {
  return (
    <div
      style={{
        width: 220,
        background: "#0a0d14",
        borderRight: "1px solid #1e2130",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "0 20px 24px",
          borderBottom: "1px solid #1e2130",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: 0.5,
            fontFamily: "'Georgia', serif",
          }}
        >
          VC Intelligence
        </div>
        <div
          style={{
            fontSize: 10,
            color: "#334155",
            marginTop: 2,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Thesis-first sourcing
        </div>
      </div>

      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangePage(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: page === item.id ? "#1e2130" : "transparent",
              color: page === item.id ? "#e2e8f0" : "#475569",
              fontSize: 13,
              fontFamily: "inherit",
              fontWeight: page === item.id ? 600 : 400,
              marginBottom: 2,
              textAlign: "left",
              transition: "all 0.1s",
            }}
          >
            <span style={{ fontSize: 14 }}>{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>

      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #1e2130",
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "#334155",
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Thesis
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#475569",
            marginBottom: 8,
          }}
        >
          API-First Fintech
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
          }}
        >
          <span style={{ color: "#334155" }}>Enriched</span>
          <span
            style={{
              color: "#3b82f6",
              fontFamily: "monospace",
            }}
          >
            {enrichedCount}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            marginTop: 4,
          }}
        >
          <span style={{ color: "#334155" }}>High match (70+)</span>
          <span
            style={{
              color: "#22c55e",
              fontFamily: "monospace",
            }}
          >
            {highScoreCount}
          </span>
        </div>
      </div>
    </div>
  );
}


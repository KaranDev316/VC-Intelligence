"use client";

import React from "react";

type Props = {
  score?: number | null;
};

export function ScoreBadge({ score }: Props) {
  if (score === undefined || score === null) {
    return <span style={{ color: "#888", fontSize: 12 }}>—</span>;
  }
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444";
  return (
    <span
      style={{
        background: color + "22",
        color,
        border: `1px solid ${color}44`,
        borderRadius: 6,
        padding: "2px 8px",
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "monospace",
        letterSpacing: 1,
      }}
    >
      {score}/100
    </span>
  );
}


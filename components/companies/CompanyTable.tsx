"use client";

import React, { useMemo, useState } from "react";
import type { Company, Enrichment } from "../../lib/types";
import { Tag } from "../ui/Tag";
import { ScoreBadge } from "../ui/ScoreBadge";
import { btnStyle } from "../ui/buttonStyles";

type Props = {
  companies: Company[];
  enrichments: Record<string, Enrichment | undefined>;
  onSelect: (company: Company) => void;
};

export function CompanyTable({ companies, enrichments, onSelect }: Props) {
  const [sort, setSort] = useState<{ col: string; dir: "asc" | "desc" }>({
    col: "name",
    dir: "asc",
  });
  const [page, setPage] = useState(0);
  const PER_PAGE = 10;

  function toggleSort(col: string) {
    setSort((s) =>
      s.col === col ? { col, dir: s.dir === "asc" ? "desc" : "asc" } : { col, dir: "asc" }
    );
    setPage(0);
  }

  const sorted = useMemo(() => {
    return [...companies].sort((a, b) => {
      let av: any = (a as any)[sort.col] ?? "";
      let bv: any = (b as any)[sort.col] ?? "";
      if (sort.col === "score") {
        av = enrichments[a.id]?.score ?? -1;
        bv = enrichments[b.id]?.score ?? -1;
      }
      if (typeof av === "string") {
        return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sort.dir === "asc" ? av - bv : bv - av;
    });
  }, [companies, sort, enrichments]);

  const paged = sorted.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const total = Math.ceil(sorted.length / PER_PAGE);

  const colStyle = (col: string) => ({
    padding: "10px 16px",
    textAlign: "left" as const,
    fontSize: 11,
    color: sort.col === col ? "#3b82f6" : "#475569",
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    userSelect: "none" as const,
  });

  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e2130" }}>
              {[
                ["name", "Company"],
                ["industry", "Industry"],
                ["stage", "Stage"],
                ["raised", "Raised"],
                ["employees", "Team"],
                ["score", "Score"],
              ].map(([col, label]) => (
                <th key={col} style={colStyle(col)} onClick={() => toggleSort(col)}>
                  {label}{" "}
                  {sort.col === col ? (sort.dir === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((company) => (
              <tr
                key={company.id}
                onClick={() => onSelect(company)}
                style={{
                  borderBottom: "1px solid #0d1117",
                  cursor: "pointer",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#0f1117")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td style={{ padding: "14px 16px" }}>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#e2e8f0",
                      fontSize: 14,
                    }}
                  >
                    {company.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#475569",
                      marginTop: 2,
                    }}
                  >
                    {company.website}
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <Tag label={company.industry} />
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ color: "#64748b", fontSize: 13 }}>
                    {company.stage}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#64748b",
                      fontSize: 13,
                      fontFamily: "monospace",
                    }}
                  >
                    {company.raised}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ color: "#64748b", fontSize: 13 }}>
                    {company.employees}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <ScoreBadge score={enrichments[company.id]?.score} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {total > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderTop: "1px solid #1e2130",
          }}
        >
          <span style={{ fontSize: 12, color: "#475569" }}>
            {sorted.length} companies · Page {page + 1} of {total}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                style={{
                  ...btnStyle,
                  padding: "4px 10px",
                  background: page === i ? "#3b82f6" : "#1e2130",
                  color: page === i ? "#fff" : "#64748b",
                  fontSize: 12,
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


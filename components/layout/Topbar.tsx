"use client";

import React from "react";
import { btnStyle } from "../ui/buttonStyles";

type Props = {
  page: string;
  selectedCompanyName?: string | null;
  query: string;
  setQuery: (v: string) => void;
  filterIndustry: string;
  setFilterIndustry: (v: string) => void;
  filterStage: string;
  setFilterStage: (v: string) => void;
  industries: string[];
  stages: string[];
  onSaveSearch: () => void;
};

export function Topbar({
  page,
  selectedCompanyName,
  query,
  setQuery,
  filterIndustry,
  setFilterIndustry,
  filterStage,
  setFilterStage,
  industries,
  stages,
  onSaveSearch,
}: Props) {
  return (
    <div
      style={{
        background: "#0a0d14",
        borderBottom: "1px solid #1e2130",
        padding: "14px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <div style={{ fontSize: 14, color: "#475569" }}>
        {selectedCompanyName ? (
          <span>
            <span style={{ color: "#334155" }}>Companies</span> /{" "}
            <span style={{ color: "#e2e8f0" }}>{selectedCompanyName}</span>
          </span>
        ) : (
          <span
            style={{
              color: "#e2e8f0",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {page}
          </span>
        )}
      </div>

      {page === "companies" && !selectedCompanyName && (
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies…"
            style={{
              background: "#0f1117",
              border: "1px solid #1e2130",
              borderRadius: 8,
              padding: "7px 14px",
              color: "#e2e8f0",
              fontSize: 13,
              fontFamily: "inherit",
              outline: "none",
              width: 220,
            }}
          />
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            style={{
              background: "#0f1117",
              border: "1px solid #1e2130",
              borderRadius: 8,
              padding: "7px 12px",
              color: filterIndustry ? "#e2e8f0" : "#475569",
              fontSize: 13,
              fontFamily: "inherit",
            }}
          >
            <option value="">All industries</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            style={{
              background: "#0f1117",
              border: "1px solid #1e2130",
              borderRadius: 8,
              padding: "7px 12px",
              color: filterStage ? "#e2e8f0" : "#475569",
              fontSize: 13,
              fontFamily: "inherit",
            }}
          >
            <option value="">All stages</option>
            {stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={onSaveSearch}
            style={{ ...btnStyle, fontSize: 12, padding: "7px 12px" }}
          >
            Save Search
          </button>
        </div>
      )}
    </div>
  );
}


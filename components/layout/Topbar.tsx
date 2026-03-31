"use client";

import React from "react";
import { btnStyle } from "../ui/buttonStyles";
import styles from "./Topbar.module.css";

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
    <div className={styles.topbar}>
      <div className={styles.topbarTitle}>
        {selectedCompanyName ? (
          <span>
            <strong>Companies</strong> / <strong>{selectedCompanyName}</strong>
          </span>
        ) : (
          <strong>{page}</strong>
        )}
      </div>

      {page === "companies" && !selectedCompanyName && (
        <div className={styles.filterGroup}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies…"
            className={styles.filterInput}
          />
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className={styles.filterSelect}
            style={{ color: filterIndustry ? "#e2e8f0" : "#475569" }}
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
            className={styles.filterSelect}
            style={{ color: filterStage ? "#e2e8f0" : "#475569" }}
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
            className={styles.filterButton}
            style={{ fontSize: 12, padding: "7px 12px" }}
          >
            Save Search
          </button>
        </div>
      )}
    </div>
  );
}


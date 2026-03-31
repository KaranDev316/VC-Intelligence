"use client";

import React from "react";
import styles from "./Sidebar.module.css";

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
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandName}>SignalVC</div>
        <div className={styles.brandTag}>Thesis-first sourcing</div>
      </div>

      <nav className={styles.nav}>
        {ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangePage(item.id)}
            className={`${styles.navItem} ${page === item.id ? styles.navItemActive : ""}`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navItemText}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.footerTitle}>Thesis</div>
        <div className={styles.footerMeta}>API-First Fintech</div>
        <div className={styles.footerRow}>
          <span style={{ color: "#334155" }}>Enriched</span>
          <span className={styles.footerValue} style={{ color: "#3b82f6" }}>{enrichedCount}</span>
        </div>
        <div className={styles.footerRow} style={{ marginTop: 4 }}
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
    </aside>
  );
}


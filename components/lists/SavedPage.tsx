"use client";

import React from "react";
import { storage } from "../../lib/storage";
import { btnStyle, btnPrimaryStyle } from "../ui/buttonStyles";

type SavedSearch = {
  id: string;
  name: string;
  query?: string;
  industry?: string;
  stage?: string;
  savedAt: string;
};

type Props = {
  savedSearches: SavedSearch[];
  setSavedSearches: (items: SavedSearch[]) => void;
  onRunSearch: (s: SavedSearch) => void;
};

export function SavedPage({ savedSearches, setSavedSearches, onRunSearch }: Props) {
  function deleteSearch(id: string) {
    const updated = savedSearches.filter((s) => s.id !== id);
    setSavedSearches(updated);
    storage.set("savedSearches", updated);
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {savedSearches.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "#334155",
            padding: 60,
            fontSize: 14,
          }}
        >
          No saved searches. Use the Companies page to search and save.
        </div>
      )}
      {savedSearches.map((s) => (
        <div
          key={s.id}
          style={{
            background: "#0f1117",
            border: "1px solid #1e2130",
            borderRadius: 12,
            padding: 20,
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 600,
                color: "#e2e8f0",
                fontSize: 14,
                marginBottom: 4,
              }}
            >
              {s.name}
            </div>
            <div style={{ fontSize: 12, color: "#475569" }}>
              {s.query && <span>Query: "{s.query}" · </span>}
              {s.industry && <span>Industry: {s.industry} · </span>}
              {s.stage && <span>Stage: {s.stage}</span>}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#334155",
                marginTop: 4,
              }}
            >
              Saved {new Date(s.savedAt).toLocaleDateString()}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onRunSearch(s)} style={btnPrimaryStyle}>
              Re-run
            </button>
            <button
              onClick={() => deleteSearch(s.id)}
              style={{ ...btnStyle, color: "#ef4444" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}


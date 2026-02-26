"use client";

import React, { useState } from "react";
import type { Company } from "../../lib/types";
import { storage } from "../../lib/storage";
import { btnStyle, btnPrimaryStyle } from "../ui/buttonStyles";

type List = {
  id: string;
  name: string;
  companyIds: string[];
};

type Props = {
  lists: List[];
  setLists: (lists: List[]) => void;
  companies: Company[];
};

export function ListManager({ lists, setLists, companies }: Props) {
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  function createList() {
    if (!newName.trim()) return;
    const list: List = {
      id: Date.now().toString(),
      name: newName.trim(),
      companyIds: [],
    };
    const updated = [...lists, list];
    setLists(updated);
    storage.set("lists", updated);
    setNewName("");
  }

  function deleteList(id: string) {
    const updated = lists.filter((l) => l.id !== id);
    setLists(updated);
    storage.set("lists", updated);
  }

  function saveEdit(id: string) {
    const updated = lists.map((l) =>
      l.id === id ? { ...l, name: editName } : l
    );
    setLists(updated);
    storage.set("lists", updated);
    setEditId(null);
  }

  function removeFromList(listId: string, companyId: string) {
    const updated = lists.map((l) =>
      l.id === listId
        ? { ...l, companyIds: l.companyIds.filter((c) => c !== companyId) }
        : l
    );
    setLists(updated);
    storage.set("lists", updated);
  }

  function exportList(list: List, fmt: "csv" | "json") {
    const cos = list.companyIds
      .map((id) => companies.find((c) => c.id === id))
      .filter(Boolean) as Company[];
    if (fmt === "json") {
      const blob = new Blob([JSON.stringify(cos, null, 2)], {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${list.name}.json`;
      a.click();
    } else {
      const keys: (keyof Company)[] = [
        "name",
        "website",
        "industry",
        "stage",
        "raised",
        "employees",
        "hq",
      ];
      const csv = [
        keys.join(","),
        ...cos.map((c) => keys.map((k) => `"${(c as any)[k]}"`).join(",")),
      ].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${list.name}.csv`;
      a.click();
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && createList()}
          placeholder="New list name…"
          style={{
            flex: 1,
            background: "#0f1117",
            border: "1px solid #1e2130",
            borderRadius: 8,
            padding: "10px 14px",
            color: "#e2e8f0",
            fontSize: 14,
            fontFamily: "inherit",
            outline: "none",
          }}
        />
        <button onClick={createList} style={btnPrimaryStyle}>
          + Create List
        </button>
      </div>

      {lists.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "#334155",
            padding: 60,
            fontSize: 14,
          }}
        >
          No lists yet. Create one above.
        </div>
      )}

      {lists.map((list) => {
        const cos = list.companyIds
          .map((id) => companies.find((c) => c.id === id))
          .filter(Boolean) as Company[];
        return (
          <div
            key={list.id}
            style={{
              background: "#0f1117",
              border: "1px solid #1e2130",
              borderRadius: 12,
              padding: 24,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              {editId === list.id ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && saveEdit(list.id)
                    }
                    style={{
                      background: "#0a0d14",
                      border: "1px solid #3b82f6",
                      borderRadius: 6,
                      padding: "6px 10px",
                      color: "#e2e8f0",
                      fontSize: 14,
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={() => saveEdit(list.id)}
                    style={btnPrimaryStyle}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    fontWeight: 700,
                    color: "#e2e8f0",
                    fontSize: 16,
                  }}
                >
                  {list.name}
                  <span
                    style={{
                      color: "#334155",
                      fontSize: 12,
                      fontWeight: 400,
                      marginLeft: 8,
                    }}
                  >
                    {cos.length} companies
                  </span>
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => exportList(list, "csv")}
                  style={{ ...btnStyle, fontSize: 11, padding: "4px 10px" }}
                >
                  CSV
                </button>
                <button
                  onClick={() => exportList(list, "json")}
                  style={{ ...btnStyle, fontSize: 11, padding: "4px 10px" }}
                >
                  JSON
                </button>
                <button
                  onClick={() => {
                    setEditId(list.id);
                    setEditName(list.name);
                  }}
                  style={{ ...btnStyle, fontSize: 11, padding: "4px 10px" }}
                >
                  Rename
                </button>
                <button
                  onClick={() => deleteList(list.id)}
                  style={{
                    ...btnStyle,
                    fontSize: 11,
                    padding: "4px 10px",
                    color: "#ef4444",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            {cos.length === 0 && (
              <div style={{ color: "#334155", fontSize: 13 }}>
                No companies in this list.
              </div>
            )}
            {cos.map((c) => (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderTop: "1px solid #1a1f2e",
                }}
              >
                <div>
                  <span
                    style={{
                      color: "#e2e8f0",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {c.name}
                  </span>
                  <span
                    style={{
                      color: "#334155",
                      fontSize: 12,
                      marginLeft: 10,
                    }}
                  >
                    {c.industry} · {c.stage}
                  </span>
                </div>
                <button
                  onClick={() => removeFromList(list.id, c.id)}
                  style={{
                    ...btnStyle,
                    fontSize: 11,
                    padding: "3px 8px",
                    color: "#475569",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}


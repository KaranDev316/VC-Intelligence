"use client";

import React, { useMemo, useState } from "react";
import companiesData from "../../data/companies.json";
import type { Company, Enrichment } from "../../lib/types";
import { storage } from "../../lib/storage";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CompanyTable } from "../companies/CompanyTable";
import { CompanyProfile } from "../companies/CompanyProfile";
import { ListManager } from "../lists/ListManager";
import { SavedPage } from "../lists/SavedPage";

type List = {
  id: string;
  name: string;
  companyIds: string[];
};

type SavedSearch = {
  id: string;
  name: string;
  query?: string;
  industry?: string;
  stage?: string;
  savedAt: string;
};

const COMPANIES = companiesData as Company[];

export function AppShell() {
  const [page, setPage] = useState<"companies" | "lists" | "saved">("companies");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [enrichments, setEnrichments] = useState<Record<string, Enrichment>>(
    () => storage.get<Record<string, Enrichment>>("enrichments") || {}
  );
  const [lists, setLists] = useState<List[]>(
    () => storage.get<List[]>("lists") || []
  );
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(
    () => storage.get<SavedSearch[]>("savedSearches") || []
  );

  const [query, setQuery] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterStage, setFilterStage] = useState("");

  const industries = useMemo(
    () => [...new Set(COMPANIES.map((c) => c.industry))].sort(),
    []
  );
  const stages = useMemo(
    () => [...new Set(COMPANIES.map((c) => c.stage))].sort(),
    []
  );

  function saveEnrichment(companyId: string, data: Enrichment) {
    const updated = { ...enrichments, [companyId]: data };
    setEnrichments(updated);
    storage.set("enrichments", updated);
  }

  function saveToList(companyId: string, listId: string) {
    const updated = lists.map((l) => {
      if (l.id !== listId) return l;
      if (l.companyIds.includes(companyId)) return l;
      return { ...l, companyIds: [...l.companyIds, companyId] };
    });
    setLists(updated);
    storage.set("lists", updated);
  }

  function saveSearch() {
    const name = `${query || "All"} ${filterIndustry || ""} ${
      filterStage || ""
    }`.trim();
    const s: SavedSearch = {
      id: Date.now().toString(),
      name,
      query,
      industry: filterIndustry,
      stage: filterStage,
      savedAt: new Date().toISOString(),
    };
    const updated = [...savedSearches, s];
    setSavedSearches(updated);
    storage.set("savedSearches", updated);
  }

  function runSearch(s: SavedSearch) {
    setQuery(s.query || "");
    setFilterIndustry(s.industry || "");
    setFilterStage(s.stage || "");
    setPage("companies");
  }

  const filteredCompanies = useMemo(
    () =>
      COMPANIES.filter((c) => {
        const q = query.toLowerCase();
        if (
          q &&
          !c.name.toLowerCase().includes(q) &&
          !c.description.toLowerCase().includes(q)
        )
          return false;
        if (filterIndustry && c.industry !== filterIndustry) return false;
        if (filterStage && c.stage !== filterStage) return false;
        return true;
      }),
    [query, filterIndustry, filterStage]
  );

  const enrichedCount = Object.keys(enrichments).length;
  const highScoreCount = Object.values(enrichments).filter(
    (e) => e.score >= 70
  ).length;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#06080f",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: "#e2e8f0",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #06080f; }
        ::-webkit-scrollbar-thumb { background: #1e2130; border-radius: 3px; }
        textarea:focus, input:focus, select:focus {
          border-color: #3b82f620 !important;
          box-shadow: 0 0 0 2px #3b82f610;
        }
      `}</style>

      <Sidebar
        page={page}
        onChangePage={(id) => {
          setPage(id as typeof page);
          setSelectedCompany(null);
        }}
        enrichedCount={enrichedCount}
        highScoreCount={highScoreCount}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Topbar
          page={page}
          selectedCompanyName={selectedCompany?.name}
          query={query}
          setQuery={setQuery}
          filterIndustry={filterIndustry}
          setFilterIndustry={setFilterIndustry}
          filterStage={filterStage}
          setFilterStage={setFilterStage}
          industries={industries}
          stages={stages}
          onSaveSearch={saveSearch}
        />

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 28,
          }}
        >
          {page === "companies" && !selectedCompany && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#f1f5f9",
                      fontFamily: "'Georgia', serif",
                      marginBottom: 4,
                    }}
                  >
                    Deal Pipeline
                  </h2>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#475569",
                    }}
                  >
                    {filteredCompanies.length} companies matching filters
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "#0a0d14",
                  border: "1px solid #1e2130",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <CompanyTable
                  companies={filteredCompanies}
                  enrichments={enrichments}
                  onSelect={(c) => setSelectedCompany(c)}
                />
              </div>
            </div>
          )}

          {page === "companies" && selectedCompany && (
            <CompanyProfile
              company={selectedCompany}
              enrichment={enrichments[selectedCompany.id]}
              onEnrich={(data) => saveEnrichment(selectedCompany.id, data)}
              onBack={() => setSelectedCompany(null)}
              lists={lists}
              onSaveToList={saveToList}
            />
          )}

          {page === "lists" && (
            <div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#f1f5f9",
                  fontFamily: "'Georgia', serif",
                  marginBottom: 20,
                }}
              >
                Lists
              </h2>
              <ListManager
                lists={lists}
                setLists={setLists}
                companies={COMPANIES}
              />
            </div>
          )}

          {page === "saved" && (
            <div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#f1f5f9",
                  fontFamily: "'Georgia', serif",
                  marginBottom: 20,
                }}
              >
                Saved Searches
              </h2>
              <SavedPage
                savedSearches={savedSearches}
                setSavedSearches={setSavedSearches}
                onRunSearch={runSearch}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


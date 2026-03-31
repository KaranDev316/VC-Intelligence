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
import styles from "./AppShell.module.css";

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
    <div className={styles.appShell}>

      <Sidebar
        page={page}
        onChangePage={(id) => {
          setPage(id as typeof page);
          setSelectedCompany(null);
        }}
        enrichedCount={enrichedCount}
        highScoreCount={highScoreCount}
      />

      <div className={styles.container}>
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

        <div className={styles.mainContent}>
          {page === "companies" && !selectedCompany && (
            <div>
              <div className={styles.pageHeader}>
                <div>
                  <h2 className={styles.pageTitle}>Deal Pipeline</h2>
                  <div className={styles.pageMeta}>{filteredCompanies.length} companies matching filters</div>
                </div>
              </div>
              <div className={styles.panelBox}>
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
              <h2 className={styles.pageTitle}>Lists</h2>
              <ListManager
                lists={lists}
                setLists={setLists}
                companies={COMPANIES}
              />
            </div>
          )}

          {page === "saved" && (
            <div>
              <h2 className={styles.pageTitle}>Saved Searches</h2>
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


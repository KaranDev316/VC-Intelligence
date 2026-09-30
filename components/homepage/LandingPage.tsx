"use client";

import React from "react";
import styles from "./LandingPage.module.css";

interface LandingPageProps {
  onEnterApp: () => void;
}

const companies = [
  { name: "Stripe", category: "Payments", stage: "Series I", score: 92 },
  { name: "Plaid", category: "Fintech", stage: "Series D", score: 88 },
  { name: "Merge", category: "API Platform", stage: "Series B", score: 84 },
  { name: "Alloy", category: "Compliance", stage: "Series C", score: 79 },
];

const workflow = [
  { number: "01", title: "Find the signal", text: "Search and filter companies by industry, stage, and the context in their profile." },
  { number: "02", title: "Enrich the company", text: "Turn a public website into a concise company brief, keywords, and business signals." },
  { number: "03", title: "Decide with context", text: "Compare thesis fit, add notes, and organize the strongest opportunities into lists." },
];

export function LandingPage({ onEnterApp }: LandingPageProps) {
  function scrollToWorkflow() {
    document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <a className={styles.brand} href="#top" aria-label="VC Intelligence home">
          <span className={styles.brandMark}>VI</span>
          <span>VC Intelligence</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#workflow">Workflow</a>
          <a href="#thesis">Thesis fit</a>
        </div>
        <button onClick={onEnterApp} className={styles.navButton}>
          Open workspace <span aria-hidden="true">-&gt;</span>
        </button>
      </nav>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <span className={styles.statusDot} /> AI-assisted deal intelligence
          </div>
          <h1>VC Intelligence</h1>
          <p className={styles.heroLead}>
            Find promising companies, understand them faster, and evaluate every
            opportunity against your investment thesis.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.primaryButton} onClick={onEnterApp}>
              Explore companies <span aria-hidden="true">-&gt;</span>
            </button>
            <button className={styles.textButton} onClick={scrollToWorkflow}>See how it works</button>
          </div>
          <div className={styles.heroMeta} aria-label="Product highlights">
            <div><strong>28</strong><span>curated companies</span></div>
            <div><strong>Live</strong><span>website enrichment</span></div>
            <div><strong>1 score</strong><span>for thesis alignment</span></div>
          </div>
        </div>

        <div className={styles.productVisual} aria-label="VC Intelligence product preview">
          <div className={styles.visualTopbar}>
            <div className={styles.visualBrand}><span className={styles.miniMark}>VI</span><span>Deal pipeline</span></div>
            <span className={styles.liveLabel}>LIVE DATA</span>
          </div>
          <div className={styles.visualBody}>
            <aside className={styles.visualSidebar} aria-hidden="true">
              <span className={styles.sideActive}>01</span><span>02</span><span>03</span>
            </aside>
            <div className={styles.visualContent}>
              <div className={styles.visualHeader}>
                <div><span className={styles.visualKicker}>DISCOVER</span><h2>Companies</h2></div>
                <div className={styles.searchField}>Search companies...</div>
              </div>
              <div className={styles.tableHeader}><span>Company</span><span>Stage</span><span>Thesis fit</span></div>
              <div className={styles.companyRows}>
                {companies.map((company, index) => (
                  <div className={styles.companyRow} key={company.name}>
                    <div className={styles.companyIdentity}>
                      <span className={styles.companyIcon}>{company.name[0]}</span>
                      <span><strong>{company.name}</strong><small>{company.category}</small></span>
                    </div>
                    <span className={styles.stage}>{company.stage}</span>
                    <div className={styles.scoreCell}>
                      <span className={styles.scoreTrack}><span style={{ width: `${company.score}%` }} /></span>
                      <strong>{company.score}</strong>
                    </div>
                    {index === 0 && <span className={styles.activeRowLabel}>TOP MATCH</span>}
                  </div>
                ))}
              </div>
              <div className={styles.signalPanel}>
                <div><span className={styles.visualKicker}>LATEST SIGNAL</span><strong>Developer-first payment infrastructure</strong></div>
                <span className={styles.signalScore}>+10</span>
              </div>
            </div>
          </div>
        </div>

        <a className={styles.scrollCue} href="#workflow">Built for the first investment pass <span aria-hidden="true">↓</span></a>
      </section>

      <section className={styles.workflowSection} id="workflow">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionLabel}>THE WORKFLOW</span>
          <h2>From a company name to an informed first view.</h2>
          <p>One focused workspace for the research steps that usually happen across tabs, spreadsheets, and scattered notes.</p>
        </div>
        <div className={styles.workflowGrid}>
          {workflow.map((step) => (
            <article className={styles.workflowItem} key={step.number}>
              <span className={styles.workflowNumber}>{step.number}</span>
              <h3>{step.title}</h3><p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.thesisSection} id="thesis">
        <div className={styles.thesisCopy}>
          <span className={styles.sectionLabel}>EXPLAINABLE BY DESIGN</span>
          <h2>A score you can interrogate.</h2>
          <p>Thesis alignment is based on visible keyword matches and exclusion signals. The result supports investor judgment instead of hiding it behind an unexplained number.</p>
          <button className={styles.inlineButton} onClick={onEnterApp}>Review a company <span aria-hidden="true">-&gt;</span></button>
        </div>
        <div className={styles.scoreVisual}>
          <div className={styles.scoreHeading}>
            <div><span>THESIS MATCH</span><strong>API-first fintech infrastructure</strong></div>
            <div className={styles.bigScore}>92<small>/100</small></div>
          </div>
          <div className={styles.matchBar}><span /></div>
          <div className={styles.keywordGroup}><span>API</span><span>payments</span><span>enterprise</span><span>infrastructure</span></div>
          <p className={styles.scoreNote}>Strong alignment across developer tooling, payments infrastructure, and enterprise distribution.</p>
        </div>
      </section>

      <section className={styles.finalCta}>
        <span className={styles.sectionLabel}>READY TO EXPLORE?</span>
        <h2>Start with the companies already on your radar.</h2>
        <button className={styles.primaryButton} onClick={onEnterApp}>Open VC Intelligence <span aria-hidden="true">-&gt;</span></button>
      </section>

      <footer className={styles.footer}>
        <a className={styles.brand} href="#top"><span className={styles.brandMark}>VI</span><span>VC Intelligence</span></a>
        <p>Research faster. Decide with context.</p>
        <span>Built by Alfred Mtambalika</span>
      </footer>
    </main>
  );
}

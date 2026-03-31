"use client";

import React from "react";
import styles from "./LandingPage.module.css";

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>VC Intelligence</div>
        <button onClick={onEnterApp} className={styles.navButton}>
          Launch App
        </button>
      </nav>

      <section className={styles.heroSection}>
        <h1 className={styles.headline}>Meet the startups worth funding—instantly</h1>
        <p className={styles.subheadline}>
          Search your target companies, get AI insights, and make better investment decisions in minutes.
        </p>
        <div className={styles.ctaGroup}>
          <button className={styles.ctaButton} onClick={onEnterApp}>
            Search Companies Now
          </button>
          <button className={styles.ctaButtonSecondary}>Explore Demo</button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What slows you down</h2>
        <p className={styles.sectionSubtitle}>
          Investors spend hours researching startups. Here's why it's broken:
        </p>

        <div className={styles.bulletList}>
          <article className={styles.bulletItem}>
            <h4 className={styles.bulletTitle}>You search, but don't get context</h4>
            <p className={styles.bulletText}>You find a company, but know nothing about their real potential.</p>
          </article>
          <article className={styles.bulletItem}>
            <h4 className={styles.bulletTitle}>Due diligence eats your time</h4>
            <p className={styles.bulletText}>Reading pitch decks, websites, and market research manually for each company is exhausting.</p>
          </article>
          <article className={styles.bulletItem}>
            <h4 className={styles.bulletTitle}>You miss patterns</h4>
            <p className={styles.bulletText}>Without a clear way to track and compare, you can't see what's actually worth your money.</p>
          </article>
          <article className={styles.bulletItem}>
            <h4 className={styles.bulletTitle}>Good deals get passed</h4>
            <p className={styles.bulletText}>Your instinct says yes, but by the time you've researched everything, someone else wrote the check.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How it works</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureNumber}>1</div>
            <h3 className={styles.featureBenefit}>Find the right companies, faster</h3>
            <p className={styles.featureHow}>Search by company name, industry, or stage. Filter by what you care about. One click, clear results. Cut research time from days to minutes.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureNumber}>2</div>
            <h3 className={styles.featureBenefit}>Get AI-powered insights you'd miss</h3>
            <p className={styles.featureHow}>We analyze company data and give you a one-page summary: who they are, what they do, and why they matter. Understand a company's real potential without hours of reading.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureNumber}>3</div>
            <h3 className={styles.featureBenefit}>Save and organize your pipeline</h3>
            <p className={styles.featureHow}>Save searches, create lists, score companies. Your entire investment pipeline in one place. Never lose a promising lead.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What this actually looks like</h2>
        <div className={styles.useCaseCard}>
          <p className={styles.useCaseText}>It's Monday morning. You want to find all <span className={styles.useCaseHighlight}>Series A SaaS companies in healthcare</span>. Normally: 2 hours of searching and manual note-taking.</p>
          <p className={styles.useCaseText}>Now: You search in <span className={styles.useCaseHighlight}>30 seconds</span>, get 12 results, read AI summaries on each, and add your top 5 to a list. By Tuesday, you've scheduled checks with the best ones.</p>
          <p className={styles.useCaseText}><span className={styles.useCaseHighlight}>The difference?</span> You moved 10x faster than your competitors.</p>
        </div>
      </section>

      <section className={styles.cta2Section}>
        <h2 className={styles.cta2Title}>Ready to move faster?</h2>
        <p className={styles.cta2Subtitle}>Start searching companies and building your investment pipeline today.</p>
        <button className={styles.ctaButton} onClick={onEnterApp}>Launch App Now</button>
      </section>

      <footer className={styles.footer}>© 2026 VC Intelligence. Built for investors who move fast.</footer>
    </div>
  );
}

# VC Intelligence

An AI-assisted company discovery workspace for venture capital teams. VC Intelligence helps investors move from a broad company list to a structured view of what a startup does, which signals matter, and how closely it matches an investment thesis.

[View the live demo](https://vc-intelligence-gray.vercel.app/) · [View the repository](https://github.com/KaranDev316/VC-Intelligence)

## Why I built it

Early-stage company research is often spread across browser tabs, spreadsheets, and disconnected notes. This project explores a more focused workflow: discover a company, enrich its public website, evaluate thesis fit, and save the result without leaving the application.

The result is a functional MVP inspired by modern VC sourcing tools such as Harmonic.

## Product highlights

- Search and filter a curated dataset of 28 companies by name, description, industry, and stage
- Sort and paginate a compact company discovery table
- Open detailed company profiles with funding, team, location, and company context
- Enrich a company's public website on demand using OpenAI
- Extract a summary, activities, keywords, and business signals from website content
- Score each company against an API-first fintech infrastructure thesis
- Save companies into custom lists and revisit saved searches
- Store enrichment results, notes, lists, and searches in the browser

## How enrichment works

```text
Company profile
      |
      v
POST /api/enrich
      |
      +--> Fetch public website HTML
      +--> Remove page chrome and extract useful text
      +--> Send the text to the OpenAI Responses API
      +--> Parse structured company intelligence
      +--> Score keywords and exclusions against the thesis
      |
      v
Profile summary + signals + thesis score
```

The OpenAI request runs in a Next.js server route, so `OPENAI_API_KEY` is never sent to the browser. Enrichment also includes source attribution and a timestamp so users can see where and when the result was produced.

## Tech stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript |
| Backend | Next.js App Router API route |
| AI | OpenAI Responses API (`gpt-4.1-mini`) |
| Persistence | Browser `localStorage` |
| Deployment | Vercel |

## Run locally

### Prerequisites

- Node.js 20 or newer
- npm
- An OpenAI API key for live enrichment

### Installation

```bash
git clone https://github.com/KaranDev316/VC-Intelligence.git
cd VC-Intelligence
npm install
```

Create `.env.local` in the project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The discovery and organization features work immediately; an API key is required only for live website enrichment.

## Project structure

```text
app/
  api/enrich/route.ts       Website extraction and OpenAI integration
  page.tsx                  Landing page and application entry point
components/
  companies/                Discovery table and company profiles
  enrichment/               Enrichment states and results
  homepage/                 Public-facing landing page
  layout/                   Main application shell and navigation
  lists/                    Lists and saved-search workflows
data/companies.json         Curated seed dataset
lib/
  enrichment.ts             Thesis scoring and enrichment client
  storage.ts                Browser persistence helpers
  types.ts                  Shared domain types
```

## Key engineering decisions

- **Server-side AI integration:** the API key remains on the server and website fetching is isolated behind one endpoint.
- **Transparent scoring:** thesis fit uses explicit keyword matches and exclusion penalties, making the score understandable rather than opaque.
- **Fast prototype persistence:** `localStorage` supports a complete demo workflow without requiring accounts or database infrastructure.
- **Typed domain model:** shared TypeScript types keep company and enrichment data consistent across the interface.

## Current scope and next steps

This version is intentionally an MVP. Company records are seeded locally, and user-created data is stored per browser rather than synced across devices.

The next production steps would be database-backed persistence, authentication, configurable investment theses, stronger website extraction for JavaScript-heavy sites, structured AI output validation, and automated tests around enrichment and scoring.

## Author

Built by **Alfred Mtambalika**.

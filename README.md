# VC Intelligence Interface + Live Enrichment

Deployed App: https://vc-intelligence-gray.vercel.app/  
GitHub Repo: https://github.com/KaranDev316/VC-Intelligence

---

## Overview

This project is a VC discovery and intelligence interface inspired by Harmonic-style sourcing workflows.

Users can:

- Discover companies
- View detailed profiles
- Run live website enrichment
- Score thesis alignment
- Save companies to lists
- Persist notes and searches

Live enrichment fetches real public website content and extracts structured intelligence using AI via a secure server-side API route.

---

## Environment Variables

Create a `.env.local` file in the root directory:


OPENAI_API_KEY=your_openai_api_key_here


Important:

- The API key is used **server-side only**
- It is accessed via `/api/enrich`
- It is never exposed to the browser
- Do NOT commit `.env.local` to GitHub

---

## Local Setup

Clone the repository:


git clone https://github.com/KaranDev316/VC-Intelligence.git

cd VC-Intelligence


Install dependencies:


npm install


Run development server:


npm run dev


Open:


http://localhost:3000


---

## Live Enrichment Flow

1. Open a company profile
2. Click **Enrich Company**
3. The `/api/enrich` route:
   - Fetches public website HTML
   - Cleans and extracts text
   - Sends content to OpenAI
   - Returns structured intelligence:
     - Summary
     - What they do
     - Keywords
     - Signals
     - Sources
     - Timestamp

---

## Deployment

Deployed using Vercel.

Steps:

1. Import GitHub repository into Vercel
2. Add environment variable:

   OPENAI_API_KEY

3. Redeploy project

Live URL:
https://vc-intelligence-gray.vercel.app/

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- OpenAI API
- Vercel
- LocalStorage persistence

---

## Author

Alfred Mtambalika
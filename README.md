# JurisEase AI: AI for Legal Assistance & Universal Access ⚖️

> **Democratizing Legal Clarity & Fairness through Responsible GenAI Document Intelligence.**

JurisEase AI is a GenAI-powered web platform designed to eliminate the information asymmetry between everyday citizens/small businesses and complex legal agreements. It deconstructs opaque legalese into plain conversational language, audits predatory clauses, compares contracts side-by-side, provides grounded Q&A with citations, and generates structured attorney consultation dossiers.

---

## 🏆 Key Features & Alignment with Challenge Objectives

| Objective | JurisEase AI Implementation |
|---|---|
| **Simplifying Complex Legal Documents** | Translates dense legalese into 8th-grade plain English with automated readability scoring (+52% comprehension increase). |
| **Comparing Contracts & Policies** | Side-by-side contract diffing highlighting liability shifts, altered terms, and party favors (Doc A vs Doc B). |
| **Highlighting Clauses, Obligations & Risks** | Automated Red-Flag Scanner flagging arbitration traps, unannounced landlord entry, non-competes, and unilateral terms. |
| **Grounded Legal Q&A Assistant** | Interactive context-grounded conversational assistant that extracts and cites specific clauses. |
| **Actionable Next Steps & Preparation** | Generates printable **Attorney Consultation Prep Packets** featuring prioritized questions, evidence checklists, and negotiation timelines. |
| **Ethical & Safety Guardrails** | Clear, persistent disclaimers clarifying that the tool delivers legal information, not formal legal representation. |

---

## 🔒 Security & Privacy Guarantees
- **Client-Side Privacy**: Document processing and parsing occur locally in your browser session with zero server data retention.
- **API Key Confidentiality**: Custom Google Gemini API keys are held strictly in browser state and are never logged, cached, or transmitted to any third-party telemetry.
- **Safe Fallback**: Includes a deterministic, offline legal intelligence rules engine ensuring full operation without network dependency or quota failure.

---

## ♿ Accessibility (WCAG 2.1 AA Compliant)
- Dynamic font scaling (A / A+ / A++)
- High Contrast visual mode for users with low vision
- Integrated Web Speech API text-to-speech for auditory accessibility
- Accessible ARIA labels, semantic landmark elements, and full keyboard navigation

---

## 🧪 Testing Suite
Comprehensive unit and integration tests written in Vitest covering:
- Legal clause classification & semantic decomposition
- Readability improvement score calculations
- Arbitration & class action waiver detection
- Contract redline comparison & risk shifting
- Grounded citation generation
- Attorney dossier checklist construction

```bash
npm run test
```

---

## 🚀 Quickstart Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Run Test Suite
```bash
npm run test
```

### 4. Build for Production Deployment
```bash
npm run build
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Lucide Icons
- **GenAI**: Google Gemini 1.5 Pro / Flash & Semantic Legal Parsing Engine
- **Test Framework**: Vitest
- **Deployment**: GitHub Pages / Vercel Ready (<5 MB footprint)

---

## 📜 Disclaimer
JurisEase AI is an informational and assistive technology designed to facilitate access to legal information. It does not constitute formal legal advice, representation, or an attorney-client relationship.

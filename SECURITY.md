# Security Policy & Defensive Architecture

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Architecture & Threat Model

JurisEase AI is designed with **Privacy-by-Design** and **Defense-in-Depth** principles tailored for sensitive legal document analysis:

### 1. Zero-Retention Client-Side Processing
- All contract parsing, clause analysis, and comparison occur ephemerally in browser memory.
- No user-uploaded agreements, leases, or NDAs are stored in persistent databases or sent to telemetry trackers.

### 2. Prompt Injection & Jailbreak Defense
- Incoming user prompts are filtered through a multi-stage sanitizer before hitting GenAI model endpoints.
- System prompts enforce strict context boundaries: models are prohibited from executing shell instructions, disregarding safety policies, or assuming legal liability.

### 3. API Key Protection
- User-provided Google Gemini API keys are maintained exclusively in localized React component memory.
- Keys are never persisted in localStorage, cookies, URL query parameters, or transmitted to any server other than the official Google Generative Language API endpoint (`https://generativelanguage.googleapis.com`).

### 4. Cross-Site Scripting (XSS) & Injection Prevention
- All document content and chat responses are sanitized via `src/utils/security.ts`.
- Scripts, inline event handlers (`onload`, `onerror`), and `javascript:` URIs are stripped prior to rendering.

### 5. Content Security Policy & Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`

## Reporting a Vulnerability

If you discover a security vulnerability, please submit an issue or contact the maintainers at `psg210107@gmail.com`. Vulnerabilities are triaged within 24 hours.

---

# 🧭 Technical Design Document (TDD)

**Project:** AI-Powered Meeting Notes Summarizer & Sharer
**Frontend:** Next.js
**Backend:** Node.js + Express (dedicated)
**AI:** Groq (primary) / OpenAI (fallback)
**Email:** Gmail SMTP (Nodemailer)
**Author:** \[Your Name]
**Date:** \[Insert Date]

---

## 1) Problem & Goals (from PRD → technical scope)

* Accept transcript (paste or upload `.txt` for MVP).
* Accept custom instruction/prompt.
* Generate AI summary.
* Let user edit the summary (client-side).
* Send edited summary via email.
* Minimal UI, reliable backend, easy deployment.

Non-goals (MVP): auth, DB, multi-tenancy, PDF/DOCX parsing, long-term storage.

---

## 2) High-Level Architecture

```
[Next.js Frontend]
  - Upload/paste transcript
  - Prompt input
  - Call /api/summarize
  - Editable summary textarea
  - Email input + call /api/send-email

            ⬇ HTTPS

[Express Backend]
  - POST /api/summarize  → Groq/OpenAI
  - POST /api/send-email → Gmail SMTP
  - Middlewares: CORS, rate-limit, validation, logging

            ⬇ HTTPS

[External Services]
  - Groq (LLM)
  - Gmail SMTP (email)
  - (Optional fallback) OpenAI
```

**Why dedicated backend?** Clear separation of concerns, better API ownership, and easier to swap AI/email providers.

---

## 3) Deployment Plan

* **Frontend (Next.js):** Vercel (build command: `next build`, output: `.next`).
* **Backend (Express):** Render or Railway (Node runtime, port from env).
* Environment variables set in each host’s dashboard.
* CORS: allow the frontend domain only.

---

## 4) Environment Variables

**Backend**

* `PORT` (default `8080`)
* `NODE_ENV` (`production`/`development`)
* `GROQ_API_KEY` (required)
* `OPENAI_API_KEY` (optional fallback)
* `GMAIL_USER` (required)
* `GMAIL_APP_PASSWORD` (required)
* `EMAIL_FROM` (e.g. `summaries@yourdomain.com`)
* `ALLOWED_ORIGIN` (frontend public URL)
* `RATE_LIMIT_WINDOW_MS` (e.g. `60000`)
* `RATE_LIMIT_MAX` (e.g. `60`)

**Frontend**

* `NEXT_PUBLIC_API_BASE_URL` (backend base URL)

---

## 5) Data Flow (Sequence)

**Generate Summary**

1. User pastes/ uploads text + enters prompt.
2. FE → `POST /api/summarize` with `{ transcript, prompt }`.
3. BE validates, normalizes prompt, hits Groq, returns `{ summary }`.
4. FE renders summary in editable textarea (no server persistence).

**Send Email**

1. User edits summary locally.
2. FE → `POST /api/send-email` with `{ to[], subject, body }`.
3. BE validates, sends via Gmail SMTP, returns `{ id, status }`.

---

## 6) Error Handling & Edge Cases

* Validation errors → `400` with field messages.
* AI provider failure/timeouts → `502` with provider error key.
* Email provider failure → `502` with provider error key.
* Rate limit exceeded → `429`.
* CORS violation → blocked preflight.
* Empty transcript or prompt → `400`.
* Very large transcript → `413 Payload Too Large` (set limit, e.g., 200KB).
* Invalid emails → `400`, show which ones failed validation.

---

## 7) Security & Compliance (MVP)

* **CORS** restricted to `ALLOWED_ORIGIN`.
* **Rate limiting** and **basic request size limits**.
* No PII storage on server (stateless).
* Avoid logging transcript content (log only request ids & sizes).
* Use HTTPS everywhere (host enforcement).
* Secrets in env only, never committed.

---

## 8) Observability

* **Logging:** `pino` (JSON logs). Include `{requestId, route, latencyMs, status}`.
* **Health check:** `GET /api/health` returns `{status:'ok', time:...}`.
* **Metrics:** (optional) simple counters in logs; a hosted APM is overkill for MVP.

---

## 9) Tech Choices (Key Libraries)

**Backend**

* `express`, `cors`, `helmet`, `express-rate-limit`
* `zod` (validation)
* `pino` (logging)
* `node-fetch` or `axios` (HTTP)
* `nodemailer` (Gmail SMTP)

**Frontend**

* Next.js (App Router or Pages—either fine)
* Minimal CSS or Tailwind (optional)
* `react-hook-form` (optional)

---

## 10) Prompting Strategy (MVP)

Template:

```
System:
You are a concise assistant that produces structured, action-oriented meeting summaries.

User:
<Prompt from user, e.g., "Summarize in bullet points for executives.">
Transcript:
"""<Transcript text>"""

Instructions:
- Keep it under ~300 words (unless asked otherwise).
- Use headings: Summary, Key Decisions, Action Items (Owner, Due Date), Risks/Follow-ups.
- Be precise and remove filler.
```

---

## 11) API Specification (stable contract)

### Common

* **Base URL (backend):** `https://<your-backend-host>`
* **Headers:** `Content-Type: application/json`
* **Auth:** None (MVP)
* **Rate-limit:** default 60 req/min/IP (configurable)

---

### 11.1 POST `/api/summarize`

**Description:** Generate a structured summary from transcript + custom prompt.

**Request (JSON)**

```json
{
  "transcript": "string (<= ~200k chars)",
  "prompt": "string (<= 1k chars, optional but recommended)"
}
```

**Response 200 (JSON)**

```json
{
  "summary": "string"
}
```

**Response 400**

```json
{
  "error": "VALIDATION_ERROR",
  "details": {
    "transcript": "Transcript is required and must be text under 200KB."
  }
}
```

**Response 502**

```json
{
  "error": "PROVIDER_ERROR",
  "provider": "groq",
  "message": "Timeout or upstream failure"
}
```

**cURL**

```bash
curl -X POST "$API_BASE/api/summarize" \
  -H "Content-Type: application/json" \
  -d '{"transcript":"...","prompt":"Summarize in bullet points for executives"}'
```

---

### 11.2 POST `/api/send-email`

**Description:** Send the edited summary to recipients via Gmail SMTP.

**Request (JSON)**

```json
{
  "to": ["user1@example.com", "user2@example.com"],
  "subject": "Meeting Summary - Project X (2025-08-16)",
  "body": "Final edited summary content as plain text or simple HTML"
}
```

* `to`: 1–10 emails per request (MVP limit)
* `subject`: 3–120 chars
* `body`: plain text or simple HTML (server will send as HTML if it detects tags)

**Response 200**

```json
{
  "message": "Email sent successfully!"
}
```

**Response 400**

```json
{
  "error": "VALIDATION_ERROR",
  "details": {
    "to[1]": "Invalid email format"
  }
}
```

**Response 502**

```json
{
  "error": "PROVIDER_ERROR",
  "provider": "gmail-smtp",
  "message": "Upstream error"
}
```

**cURL**

```bash
curl -X POST "$API_BASE/api/send-email" \
  -H "Content-Type: application/json" \
  -d '{"to":["you@example.com"],"subject":"Demo Summary","body":"<h3>Summary</h3><ul><li>Point A</li></ul>"}'
```

---

### 11.3 GET `/api/health`

**Response 200**

```json
{ "status": "ok", "time": "2025-08-16T08:00:00.000Z" }
```

---

## 12) Validation Schemas (Zod)

```ts
// summarize.schema.ts
import { z } from "zod";

export const SummarizeSchema = z.object({
  transcript: z.string().min(1).max(200_000),
  prompt: z.string().max(1_000).optional().default("Summarize the transcript.")
});
export type SummarizeInput = z.infer<typeof SummarizeSchema>;

// send-email.schema.ts
export const SendEmailSchema = z.object({
  to: z.array(z.string().email()).min(1).max(10),
  subject: z.string().min(3).max(120),
  body: z.string().min(1).max(200_000) // allow large-ish body
});
export type SendEmailInput = z.infer<typeof SendEmailSchema>;
```

---

## 13) Backend Routing & Folder Structure

```
backend/
  src/
    index.ts            # app bootstrap
    server.ts           # creates express app
    routes/
      summarize.ts
      sendEmail.ts
      health.ts
    services/
      ai.ts             # Groq/OpenAI wrapper
      mail.ts           # Gmail SMTP wrapper
    schemas/
      summarize.schema.ts
      send-email.schema.ts
    middleware/
      error.ts
      rateLimit.ts
      cors.ts
      requestId.ts
    utils/
      logger.ts
      env.ts
    types/
  package.json
  tsconfig.json
```

**Key Middlewares**

* `helmet()` security headers
* `cors({ origin: ALLOWED_ORIGIN })`
* `express.json({ limit: '300kb' })`
* `rateLimit({ windowMs, max })`
* `requestId` (attach `x-request-id` header for tracing)
* central `errorHandler`

---

## 14) Service Implementations (Logic)

**`services/ai.ts` (Groq)**

* Build prompt using template.
* Call Groq chat/completions (model like `llama-3.1-8b-instant` or per docs).
* 10–20s timeout.
* If Groq fails and `OPENAI_API_KEY` exists, fallback to OpenAI.
* Return clean text (strip leading/trailing whitespace).

**`services/mail.ts` (Gmail SMTP)**

* Use Nodemailer to send emails via Gmail SMTP.
* From: `EMAIL_FROM`.
* To: array.
* Content: if `body` contains `<`/`>`, send as HTML; else plain text.
* Return `{ message: "Email sent successfully!" }`.

---

## 15) Frontend Pages (Next.js minimal)

```
frontend/
  app/
    page.tsx            # single-page UI
  lib/
    api.ts              # fetch helpers
  package.json
```

**UI Blocks**

* Textarea (transcript)
* Input (prompt with placeholder examples)
* Button “Generate Summary”
* Textarea (editable summary)
* Input (comma-separated emails)
* Input (subject default: “Meeting Summary - <date>”)
* Button “Send Email”
* Toast messages for success/error

---

## 16) Testing Plan (light but effective)

**Manual Test Table**

| Scenario            | Steps                             | Expected              |
| ------------------- | --------------------------------- | --------------------- |
| Generate summary ok | Provide small transcript + prompt | 200 + summary text    |
| Empty transcript    | Leave transcript blank            | 400 validation error  |
| Large transcript    | Paste >200KB                      | 413 payload too large |
| Invalid email       | `to` includes invalid             | 400 with details      |
| Email success       | Valid `to`, subject, body         | 200 with `id`         |
| Provider down       | Kill internet or mock failure     | 502 provider error    |
| Rate limit          | Hit endpoint >60/min              | 429 error             |

**Automation**

* Unit: validate schemas, ai/mail services using mocks.
* Integration: supertest for `/api/summarize`, `/api/send-email`.

---

## 17) Performance/Limits

* Transcript size: ≤200KB (roughly \~100–150k chars).
* Summaries aimed ≤300–500 words by default.
* Requests: 60/min/IP default (configurable).
* Timeouts: 20s for AI, 10s for email.

---

## 18) Risks & Mitigations

* **LLM variance** → structured headings in prompt, show editable field.
* **Email deliverability** → Use a verified sender domain in Gmail.
* **CORS/config errors** → Test staging URLs before final deploy.
* **Provider outages** → OpenAI fallback; user-visible, friendly error.

---

## 19) Future Enhancements (post-MVP)

* Auth + simple history (store summaries/transcripts in Postgres/Supabase).
* Rich editor (TipTap/Quill) with templates.
* PDF/DOCX ingestion (server-side parsing).
* Export (PDF/Markdown).
* Action item extraction with owner/due dates table.
* Webhooks for email delivery status.

---


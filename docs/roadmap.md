---
# 🗺️ Mangodesk AI Meeting Summarizer Roadmap

## Project Overview
Build a minimal full-stack web app to:
- Upload/paste transcript
- Input custom prompt
- Generate AI-powered summary (Groq primary, OpenAI fallback)
- Edit summary
- Send summary via email (Gmail SMTP via Nodemailer)
- Deploy on Vercel/Render

## Milestone Checklist
1. Backend scaffold (Express + TypeScript)
   - Health endpoint, env loader, core middlewares
2. Validation schemas (Zod) + unit tests
3. /api/summarize skeleton (validation, prompt builder, mock AI)
4. /api/send-email skeleton (validation, mock mail sender)
5. AI provider integration (Groq + OpenAI fallback)
6. Gmail SMTP integration for email
7. Frontend (Next.js): transcript textarea, prompt input, summary editor, email form
8. Connect FE ↔ BE, manual E2E test
9. Add rate-limit, CORS, helmet, logging
10. Tests: schema unit, endpoint integration
11. Deployment configs & docs
12. Final polish & deploy

## API Contracts
- POST /api/summarize
  - Request: { transcript: string, prompt?: string }
  - Response: { summary: string }
  - Errors: 400, 413, 502, 429
- POST /api/send-email
  - Request: { to: string[], subject: string, body: string }
  - Response: { message: string }
- GET /api/health
  - Response: { status: 'ok', time: ISOString }

## Environment Variables
- BACKEND: PORT, NODE_ENV, GROQ_API_KEY, OPENAI_API_KEY, GMAIL_USER, GMAIL_APP_PASSWORD, EMAIL_FROM, ALLOWED_ORIGIN, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX
- FRONTEND: NEXT_PUBLIC_API_BASE_URL

## Edge Cases
- Empty transcript/prompt → 400
- >200KB transcript → 413
- AI/email provider error → 502
- Invalid emails → 400
- Rate-limit → 429

## Testing Plan
- Type/TS compile
- Lint
- Unit tests (schemas, services)
- Integration tests (endpoints)
- Manual E2E: summary + email

## Next Steps
- Start with backend scaffold and health endpoint
- Add validation schemas and tests
- Implement summarize/email endpoints with mocks
- Integrate Groq/OpenAI and Gmail SMTP
- Build minimal Next.js frontend
- Connect, test, and deploy
---

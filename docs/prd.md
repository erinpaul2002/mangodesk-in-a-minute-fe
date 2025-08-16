
---

# 📝 Product Requirements Document (PRD)

**Project:** AI-Powered Meeting Notes Summarizer and Sharer
**Company:** Mangodesk
**Author:** \[Your Name]
**Date:** \[Insert Date]

---

## 1. Objective

The goal is to build a **full-stack web application** that allows users to:

1. Upload a transcript (meeting notes, call logs, or text files).
2. Provide a **custom instruction/prompt** to guide the summarization style.
3. Generate a structured, AI-powered **summary**.
4. Edit the AI-generated summary.
5. Share the final version with others via **email**.

The product should be **functional, minimal, and deployable**, with the focus on demonstrating **end-to-end full-stack capabilities** rather than design polish.

---

## 2. Target Users

* **Business professionals** who need quick meeting summaries.
* **Team managers/executives** who prefer bullet-point takeaways.
* **Project managers** who want clear lists of action items.
* **Students/researchers** who want condensed transcripts of lectures/interviews.

---

## 3. User Stories

### Upload & Input

* *As a user, I want to upload a transcript file or paste raw text, so that I can process meeting notes.*
* *As a user, I want to provide a custom prompt (e.g., “Summarize in bullet points for executives”), so the output is tailored to my needs.*

### Summarization

* *As a user, I want to generate a summary by clicking a button, so that I don’t have to manually process long text.*
* *As a user, I want the summary to appear in an editable text field, so I can refine the AI’s output.*

### Sharing

* *As a user, I want to enter recipient emails and send the edited summary, so my team receives the meeting notes quickly.*

### Deployment

* *As a stakeholder, I want the app to be deployed with a working link, so I can test functionality without setting up locally.*

---

## 4. Features & Requirements

### Core Features

1. **Transcript Upload/Input**

   * Accept `.txt` (MVP).
   * Optionally allow `.pdf`/`.docx`.
   * Paste text directly in a textbox.

2. **Custom Prompt Input**

   * Text field for user instructions.
   * Example: “Highlight only decisions and deadlines.”

3. **AI-Powered Summary Generation**

   * Backend sends transcript + prompt → AI API (Groq/OpenAI).
   * Returns structured summary.

4. **Editable Summary**

   * Display summary in a text editor (simple textarea).
   * User can freely modify output.

5. **Email Sharing**

   * Input for recipient addresses.
   * Backend sends summary via SMTP (Nodemailer) or API (SendGrid/Resend).

### Non-Functional Requirements

* **Frontend:** Extremely basic UI. Focus on usability, not styling.
* **Scalability:** Not required (single-user MVP acceptable).
* **Security:**

  * Validate email addresses.
  * Sanitize file uploads (only text).
* **Deployment:** Must be accessible via public URL (Netlify/Vercel + Render).

---

## 5. Tech Stack

### Frontend

* Framework: **React (Vite/Next.js)**
* Styling: Minimal CSS/Tailwind (optional)
* Functionality: File upload, text input, textarea editor, email form

### Backend

* **Node.js + Express**
* Routes:

  * `/api/summarize` → transcript + prompt → AI API → summary
  * `/api/send-email` → summary + recipients → email service

### AI Integration

* Primary: **Groq API** (provided documentation).
* Alternative: OpenAI GPT-4o-mini / GPT-3.5.

### Email Service

* Option 1: **Nodemailer** with Gmail SMTP.
* Option 2: **SendGrid** / **Resend API** (recommended for reliability).

### Deployment

* **Frontend**: Vercel or Netlify.
* **Backend**: Render, Railway, or Vercel serverless functions.

---

## 6. System Architecture

```
[Frontend]
  - Upload transcript
  - Enter prompt
  - Generate summary (editable)
  - Enter email & send

        ⬇️ (API call)

[Backend: Express/Node.js]
  - /summarize → calls AI API (Groq/OpenAI)
  - /send-email → sends via Nodemailer/SendGrid

        ⬇️ (External Services)

[AI Service]     [Email Service]
Groq/OpenAI  |  SendGrid/Nodemailer
```

---

## 7. Success Metrics

* User can successfully upload a transcript and generate a summary.
* Generated summary is editable in the UI.
* Edited summary can be sent to valid email addresses.
* The app is live on a deployed link and works end-to-end.

---

## 8. Deliverables

1. **Deployed link** (working demo).
2. **Documentation**:

   * Tech stack choices & reasoning.
   * Implementation process.
   * API integration details.
   * Deployment steps.

---

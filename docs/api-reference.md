# Mangodesk Backend API Reference

## Base URL

```
http://localhost:8000
```
*(Replace with deployed backend URL in production)*

---

## 1. Health Check

**GET** `/api/health`

- **Response:**
  ```json
  { "status": "ok", "time": "2025-08-16T08:00:00.000Z" }
  ```

---

## 2. Summarize Transcript

**POST** `/api/summarize`

- **Request Body:**
  ```json
  {
    "transcript": "string (required, max 200,000 chars)",
    "prompt": "string (optional, max 1,000 chars)"
  }
  ```
- **Success Response:**
  ```json
  { "summary": "string" }
  ```
- **Error Responses:**
  - `400 VALIDATION_ERROR`
    ```json
    { "error": "VALIDATION_ERROR", "details": { "transcript": "Transcript is required and must be text under 200KB." } }
    ```
  - `413 Payload Too Large`
  - `502 PROVIDER_ERROR`
    ```json
    { "error": "PROVIDER_ERROR", "provider": "groq", "message": "Timeout or upstream failure" }
    ```
  - `429 Rate Limit`

---

## 3. Send Email

**POST** `/api/send-email`

- **Request Body:**
  ```json
  {
    "to": ["user1@example.com", "user2@example.com"], // 1-10 emails
    "subject": "Meeting Summary - Project X (2025-08-16)", // 3-120 chars
    "body": "Final edited summary content as plain text or simple HTML"
  }
  ```
- **Success Response:**
  ```json
  { "message": "Email sent successfully!" }
  ```
- **Error Responses:**
  - `400 VALIDATION_ERROR`
    ```json
    { "error": "VALIDATION_ERROR", "details": { "to[1]": "Invalid email format" } }
    ```
  - `502 PROVIDER_ERROR`
    ```json
    { "error": "PROVIDER_ERROR", "provider": "gmail-smtp", "message": "Upstream error" }
    ```
  - `429 Rate Limit`

---

## Notes

- All requests and responses use `application/json`.
- Rate limits and CORS are enforced.
- For development, use the local base URL; for production, use the deployed backend URL.
- See backend repo for more details on validation and error handling.

---

## Example Usage

### Summarize Transcript

```bash
curl -X POST "http://localhost:8000/api/summarize" \
  -H "Content-Type: application/json" \
  -d '{"transcript":"...","prompt":"Summarize in bullet points for executives"}'
```

### Send Email

```bash
curl -X POST "http://localhost:8000/api/send-email" \
  -H "Content-Type: application/json" \
  -d '{"to":["you@example.com"],"subject":"Demo Summary","body":"<h3>Summary</h3><ul><li>Point A</li></ul>"}'
```

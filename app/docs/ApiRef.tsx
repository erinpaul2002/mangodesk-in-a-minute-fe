import React, { useState } from 'react';
import { theme } from '../theme';

export default function ApiRef() {
  return (
    <>
      <div style={{ fontWeight: theme.typography.fontWeight.bold, fontSize: theme.typography.fontSize.lg, color: theme.colors.primary[700], marginBottom: theme.spacing[3] }}>
        Mangodesk API Reference
      </div>
      <div style={{ marginBottom: theme.spacing[3], color: theme.colors.primary[600] }}>
        <strong>Base URL:</strong> <span style={{ color: theme.colors.neutral[800] }}>http://localhost:8000</span> <span style={{ color: theme.colors.neutral[500] }}>(Use production URL when deployed)</span>
      </div>
      <Section title="Endpoints">
        <Endpoint
          name="Health Check"
          method="GET"
          path="/api/health"
          response="{ status: 'ok', time: '2025-08-16T08:00:00.000Z' }"
        />
        <Hr />
        <Endpoint
          name="Summarize Transcript"
          method="POST"
          path="/api/summarize"
          requestBody={`transcript: string (required, max 200,000 chars)\nprompt: string (optional, max 1,000 chars)`}
          successResponse="{ summary: 'string' }"
          errorResponses={[
            '400 VALIDATION_ERROR: { error: \'VALIDATION_ERROR\', details: { transcript: \'Transcript is required and must be text under 200KB.\' } }',
            '413 Payload Too Large',
            "502 PROVIDER_ERROR: { error: 'PROVIDER_ERROR', provider: 'groq', message: 'Timeout or upstream failure' }",
            '429 Rate Limit',
          ]}
        />
        <Hr />
        <Endpoint
          name="Send Email"
          method="POST"
          path="/api/send-email"
          requestBody={`to: [ 'user1@example.com', ... ] (1-10 emails)\nsubject: 'Meeting Summary - Project X (2025-08-16)' (3-120 chars)\nbody: 'Final edited summary content as plain text or simple HTML'`}
          successResponse="{ message: 'Email sent successfully!' }"
          errorResponses={[
            "400 VALIDATION_ERROR: { error: 'VALIDATION_ERROR', details: { to[1]: 'Invalid email format' } }",
            "502 PROVIDER_ERROR: { error: 'PROVIDER_ERROR', provider: 'gmail-smtp', message: 'Upstream error' }",
            '429 Rate Limit',
          ]}
        />
      </Section>
      <Hr />
      <Section title="General Notes">
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[700] }}>
          <li>All requests/responses use <strong>application/json</strong>.</li>
          <li>Rate limits and CORS are enforced.</li>
          <li>For development, use the local base URL; for production, use the deployed backend URL.</li>
          <li>See backend repo for more details on validation and error handling.</li>
        </ul>
      </Section>
      <Hr />
      <Section title="Example Requests">
        <div style={{ marginBottom: theme.spacing[2] }}>
          <strong>Summarize Transcript</strong>
          <CodeBlock>{`
curl -X POST "http://localhost:8000/api/summarize" ^
  -H "Content-Type: application/json" ^
  -d '{"transcript":"...","prompt":"Summarize in bullet points for executives"}'
`}</CodeBlock>
        </div>
        <div>
          <strong>Send Email</strong>
          <CodeBlock>{`
curl -X POST "http://localhost:8000/api/send-email" ^
  -H "Content-Type: application/json" ^
  -d '{"to":["you@example.com"],"subject":"Demo Summary","body":"<h3>Summary</h3><ul><li>Point A</li></ul>"}'
`}</CodeBlock>
        </div>
      </Section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: theme.spacing[5] }}>
      <div style={{ fontWeight: theme.typography.fontWeight.semibold, fontSize: theme.typography.fontSize.base, color: theme.colors.primary[500], marginBottom: theme.spacing[2], letterSpacing: '0.02em' }}>{title}</div>
      {children}
    </div>
  );
}

function Endpoint({ name, method, path, requestBody, successResponse, errorResponses, response }: {
  name: string;
  method: string;
  path: string;
  requestBody?: string;
  successResponse?: string;
  errorResponses?: string[];
  response?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  // Parse error responses into code/status/message columns if possible
  const parsedErrors = errorResponses?.map((err) => {
    const match = err.match(/^(\d{3})\s+([A-Z_]+|[\w\s]+)(:\s*(.*))?$/);
    if (match) {
      return {
        code: match[1],
        status: match[2],
        message: match[4] || '',
      };
    }
    return { code: '', status: '', message: err };
  });

  return (
    <div style={{ marginBottom: theme.spacing[4], paddingLeft: theme.spacing[2] }}>
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing[3],
          background: expanded ? theme.colors.primary[50] : theme.colors.neutral[0],
          border: `1px solid ${expanded ? theme.colors.primary[400] : theme.colors.neutral[200]}`,
          borderRadius: theme.borderRadius.lg,
          padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
          cursor: 'pointer',
          width: '100%',
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.primary[700],
          fontSize: theme.typography.fontSize.base,
          boxShadow: expanded ? theme.shadows.sm : 'none',
          transition: 'background 0.2s',
        }}
        aria-expanded={expanded}
      >
        <span style={{ fontWeight: theme.typography.fontWeight.bold }}>{name}</span>
        <span style={{ color: theme.colors.primary[500], fontWeight: theme.typography.fontWeight.semibold }}>{method}</span>
        <span style={{ color: theme.colors.neutral[700], fontWeight: theme.typography.fontWeight.normal }}>{path}</span>
        <span style={{ marginLeft: 'auto', color: theme.colors.primary[400], fontSize: '1.2em' }}>{expanded ? '−' : '+'}</span>
      </button>
      {expanded && (
        <div style={{ marginTop: theme.spacing[3] }}>
          {requestBody && (
            <div style={{ marginTop: theme.spacing[2], color: theme.colors.neutral[700] }}>
              <strong>Request Body:</strong>
              <CodeBlock>{requestBody}</CodeBlock>
            </div>
          )}
          {successResponse && (
            <div style={{ marginTop: theme.spacing[2], color: theme.colors.success[700] }}>
              <strong>Success Response:</strong>
              <CodeBlock>{successResponse}</CodeBlock>
            </div>
          )}
          {errorResponses && errorResponses.length > 0 && (
            <div style={{ marginTop: theme.spacing[2], color: theme.colors.error[700] }}>
              <strong>Error Responses:</strong>
              <div style={{ overflowX: 'auto', marginTop: theme.spacing[2] }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: theme.typography.fontSize.sm }}>
                  <thead>
                    <tr style={{ background: theme.colors.error[50], color: theme.colors.error[700] }}>
                      <th style={{ textAlign: 'left', padding: theme.spacing[2], borderBottom: `1px solid ${theme.colors.neutral[200]}` }}>Code</th>
                      <th style={{ textAlign: 'left', padding: theme.spacing[2], borderBottom: `1px solid ${theme.colors.neutral[200]}` }}>Status</th>
                      <th style={{ textAlign: 'left', padding: theme.spacing[2], borderBottom: `1px solid ${theme.colors.neutral[200]}` }}>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedErrors?.map((err, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? theme.colors.neutral[0] : theme.colors.neutral[50] }}>
                        <td style={{ padding: theme.spacing[2], borderBottom: `1px solid ${theme.colors.neutral[100]}` }}>{err.code}</td>
                        <td style={{ padding: theme.spacing[2], borderBottom: `1px solid ${theme.colors.neutral[100]}` }}>{err.status}</td>
                        <td style={{ padding: theme.spacing[2], borderBottom: `1px solid ${theme.colors.neutral[100]}` }}>
                          {err.message ? <CodeBlock>{err.message}</CodeBlock> : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {response && (
            <div style={{ marginTop: theme.spacing[2], color: theme.colors.success[700] }}>
              <strong>Response:</strong>
              <CodeBlock>{response}</CodeBlock>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre style={{
      background: theme.colors.neutral[100],
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[3],
      fontSize: theme.typography.fontSize.sm,
      margin: 0,
      overflowX: 'auto',
      fontFamily: theme.typography.fontFamily.mono.join(', '),
      border: `1px solid ${theme.colors.neutral[200]}`,
    }}>{children}</pre>
  );
}

function Hr() {
  return <hr style={{ border: 'none', borderTop: `1px solid ${theme.colors.neutral[200]}`, margin: `${theme.spacing[4]} 0` }} />;
}

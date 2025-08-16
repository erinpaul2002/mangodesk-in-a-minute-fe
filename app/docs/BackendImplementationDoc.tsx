import React, { useState } from 'react';
import { theme } from '../theme';
import { FiLayers, FiSettings, FiDatabase, FiMail, FiShield, FiCloud, FiCode, FiEye, FiPackage, FiTerminal, FiCheckCircle } from 'react-icons/fi';

export default function BackendImplementationDoc() {
  return (
    <div style={{ display: 'grid', gap: theme.spacing[5] }}>
      <Section title="Project Structure" icon={<FiLayers size={20} style={{ color: theme.colors.primary[500] }} />}>
        <pre style={{
          background: theme.colors.neutral[100],
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing[3],
          fontFamily: 'monospace',
          fontSize: 14,
          color: theme.colors.neutral[800],
          margin: 0,
          overflowX: 'auto',
        }}>
{`
mangodesk-in-a-minute-bd/
├── src/
│   ├── server.ts
│   ├── middleware/
│   ├── routes/
│   │   ├── health.ts
│   │   ├── summarize.ts
│   │   └── sendEmail.ts
│   ├── schemas/
│   │   ├── send-email.schema.ts
│   │   ├── send-email.schema.test.ts
│   │   ├── summarize.schema.ts
│   │   └── summarize.schema.test.ts
│   └── services/
│       ├── ai.ts
│       └── mail.ts
├── package.json
├── jest.config.js
├── tsconfig.json
└── README.md
`}
        </pre>
      </Section>
      <Section title="Tech Stack" icon={<FiPackage size={20} style={{ color: theme.colors.primary[500] }} />}>
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[800], display: 'grid', gap: theme.spacing[2] }}>
          <li>Node.js + Express</li>
          <li>Zod (validation)</li>
          <li>Nodemailer (Gmail SMTP)</li>
          <li>Groq API (primary AI)</li>
          <li>Helmet, CORS, dotenv</li>
          <li>Jest (unit testing)</li>
        </ul>
      </Section>
      <Section title="Main Modules" icon={<FiTerminal size={20} style={{ color: theme.colors.primary[500] }} />}>
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[800], display: 'grid', gap: theme.spacing[2] }}>
          <li><strong>Routes:</strong> <code>health.ts</code> (health check), <code>summarize.ts</code> (AI summary), <code>sendEmail.ts</code> (email sending)</li>
          <li><strong>Schemas:</strong> <code>summarize.schema.ts</code>, <code>send-email.schema.ts</code> (validation)</li>
          <li><strong>Services:</strong> <code>ai.ts</code> (Groq), <code>mail.ts</code> (Nodemailer)</li>
          <li><strong>Server:</strong> <code>server.ts</code> (app setup, middleware, router mounting)</li>
        </ul>
      </Section>
      <Section title="Validation & Error Handling" icon={<FiShield size={20} style={{ color: theme.colors.error[500] }} />}>
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[800], display: 'grid', gap: theme.spacing[2] }}>
          <li>All requests validated with Zod schemas (min/max constraints, type checks)</li>
          <li>400 errors for validation failures (detailed field errors)</li>
          <li>413 errors for oversized payloads (transcript {'>'} 200KB)</li>
          <li>502 errors for provider failures (AI/email)</li>
          <li>429 errors for rate limiting</li>
          <li>Consistent error structure: <code>{'{ error, details }'}</code> for validation, <code>{'{ error, provider, message }'}</code> for provider errors</li>
        </ul>
      </Section>
      <Section title="Environment & Configuration" icon={<FiSettings size={20} style={{ color: theme.colors.primary[500] }} />}>
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[800], display: 'grid', gap: theme.spacing[2] }}>
          <li>Environment variables loaded via <code>dotenv</code></li>
          <li>Configurable: <code>PORT</code>, <code>GROQ_API_KEY</code>, <code>GMAIL_USER</code>, <code>GMAIL_APP_PASSWORD</code>, <code>ALLOWED_ORIGIN</code>,</li>
          <li>Security: CORS restricted, helmet for headers</li>
        </ul>
        <div style={{ marginTop: theme.spacing[4], marginBottom: theme.spacing[2] }}>
          <span style={{ color: theme.colors.neutral[700], fontWeight: theme.typography.fontWeight.medium }}>
            Sample <code>.env</code> file:
          </span>
        </div>
        <pre id="env-sample" style={{
          background: theme.colors.neutral[100],
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing[3],
          fontFamily: 'monospace',
          fontSize: 14,
          color: theme.colors.neutral[800],
          margin: 0,
          overflowX: 'auto',
        }}>
{`# Backend Sample .env\nPORT=3001\nGROQ_API_KEY=your-groq-api-key\nGMAIL_USER=your-gmail-user@gmail.com\nGMAIL_APP_PASSWORD=your-gmail-app-password\nALLOWED_ORIGIN=https://your-frontend-url.com`}
        </pre>
        <button
          onClick={() => {
            navigator.clipboard.writeText(`# Backend Sample .env\nPORT=3001\nGROQ_API_KEY=your-groq-api-key\nGMAIL_USER=your-gmail-user@gmail.com\nGMAIL_APP_PASSWORD=your-gmail-app-password\nALLOWED_ORIGIN=https://your-frontend-url.com`);
          }}
          style={{
            marginTop: theme.spacing[2],
            padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
            borderRadius: theme.borderRadius.lg,
            border: `1px solid ${theme.colors.primary[400]}`,
            background: theme.colors.primary[50],
            color: theme.colors.primary[700],
            fontWeight: theme.typography.fontWeight.medium,
            cursor: 'pointer',
            fontSize: theme.typography.fontSize.base,
            transition: 'background 0.2s',
          }}
        >
          Copy to clipboard
        </button>
      </Section>
      <Section title="Deployment" icon={<FiCloud size={20} style={{ color: theme.colors.primary[500] }} />}>
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[800], display: 'grid', gap: theme.spacing[2] }}>
          <li>Deployable to Node.js hosts (Render, Railway, etc.)</li>
          <li>Recommended: <strong>Render</strong> for backend deployment</li>
          <li>Frontend connects via public API base URL</li>
          <li>Production: secure environment variables, CORS restricted to frontend</li>
        </ul>
        <div style={{ marginTop: theme.spacing[4], marginBottom: theme.spacing[2] }}>
          <span style={{ color: theme.colors.neutral[700], fontWeight: theme.typography.fontWeight.medium }}>
            Example Render backend URL:
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}>
          <code style={{
            background: theme.colors.neutral[100],
            borderRadius: theme.borderRadius.lg,
            padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
            fontFamily: 'monospace',
            fontSize: 14,
            color: theme.colors.primary[700],
          }}>https://mangodesk-backend.onrender.com</code>
          <button
            onClick={() => {
              navigator.clipboard.writeText('https://mangodesk-backend.onrender.com');
            }}
            style={{
              padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
              borderRadius: theme.borderRadius.lg,
              border: `1px solid ${theme.colors.primary[400]}`,
              background: theme.colors.primary[50],
              color: theme.colors.primary[700],
              fontWeight: theme.typography.fontWeight.medium,
              cursor: 'pointer',
              fontSize: theme.typography.fontSize.base,
              transition: 'background 0.2s',
            }}
          >
            Copy URL
          </button>
        </div>
        <div style={{ marginTop: theme.spacing[3], color: theme.colors.neutral[600], fontSize: theme.typography.fontSize.sm }}>
          <span>Set this URL as <code>NEXT_PUBLIC_API_BASE_URL</code> in your frontend <code>.env</code> file.</span>
        </div>
      </Section>
      <Section title="Testing" icon={<FiCheckCircle size={20} style={{ color: theme.colors.success[500] }} />}>
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[800], display: 'grid', gap: theme.spacing[2] }}>
          <li>Unit tests for schemas (<code>send-email.schema.test.ts</code>, <code>summarize.schema.test.ts</code>)</li>
          <li>Ensures validation logic is robust</li>
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  const [minimized, setMinimized] = useState(true); // default to minimized
  return (
    <div style={{
      background: theme.colors.neutral[50],
      borderRadius: theme.borderRadius.xl,
      boxShadow: theme.shadows.sm,
      padding: theme.spacing[4],
      border: `1px solid ${theme.colors.neutral[200]}`,
      marginBottom: theme.spacing[3],
    }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2], fontWeight: theme.typography.fontWeight.semibold, fontSize: theme.typography.fontSize.lg, color: theme.colors.primary[600], marginBottom: theme.spacing[2], letterSpacing: '0.02em', cursor: 'pointer' }}
        onClick={() => setMinimized((m) => !m)}
        title={minimized ? 'Expand section' : 'Minimize section'}
      >
        {icon}
        {title}
        <span style={{ marginLeft: 'auto', color: theme.colors.neutral[500], fontSize: 18 }}>
          {minimized ? '\u25B6' : '\u25BC'}
        </span>
      </div>
      {!minimized && (
        <div>{children}</div>
      )}
    </div>
  );
}

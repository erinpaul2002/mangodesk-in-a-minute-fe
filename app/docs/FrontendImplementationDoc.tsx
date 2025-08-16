import React, { useState } from 'react';
import { theme } from '../theme';
import { FiLayout, FiPackage, FiCode, FiCloud, FiSettings, FiTerminal } from 'react-icons/fi';

export default function FrontendImplementationDoc() {
  return (
    <div style={{ display: 'grid', gap: theme.spacing[5] }}>
      <Section title="Project Structure" icon={<FiLayout size={20} style={{ color: theme.colors.primary[500] }} />}>
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
mangodesk-in-a-minute-fe/
├── app/
│   ├── apiClient.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── summarizerUtils.ts
│   ├── theme.ts
│   ├── components/
│   │   ├── EmailForm.tsx
│   │   ├── FileUpload.tsx
│   │   ├── MeetingSummarizer.tsx
│   │   ├── Modal.tsx
│   │   ├── Navbar.tsx
│   │   ├── PromptInput.tsx
│   │   ├── SummaryEditor.tsx
│   │   ├── TextInput.tsx
│   │   └── Toast.tsx
│   └── docs/
│       ├── ApiRef.tsx
│       ├── BackendImplementationDoc.tsx
│       ├── FrontendImplementationDoc.tsx
│       └── page.tsx
├── public/
├── docs/
│   ├── api-reference.md
│   ├── groq-api-doc.md
│   ├── groq-quickstart.md
│   ├── prd.md
│   ├── req.md
│   ├── roadmap.md
│   └── tdd.md
├── package.json
├── tsconfig.json
├── next.config.mjs
├── next.config.ts
├── postcss.config.js
├── postcss.config.mjs
├── eslint.config.mjs
├── next-env.d.ts
└── README.md
`}
        </pre>
      </Section>
      <Section title="Tech Stack & Libraries" icon={<FiPackage size={20} style={{ color: theme.colors.primary[500] }} />}>
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[800], display: 'grid', gap: theme.spacing[2] }}>
          <li>Next.js (App Router)</li>
          <li>React (functional components, hooks)</li>
          <li>TypeScript</li>
          <li>Custom theme system for styling</li>
          <li>react-icons (icon library)</li>
          <li>PostCSS (optional, for CSS processing)</li>
          <li>ESLint (linting)</li>
        </ul>
      </Section>
      <Section title="Main Modules & Components" icon={<FiTerminal size={20} style={{ color: theme.colors.primary[500] }} />}>
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[800], display: 'grid', gap: theme.spacing[2] }}>
          <li><strong>apiClient.ts:</strong> Handles API requests to backend endpoints</li>
          <li><strong>summarizerUtils.ts:</strong> Utility functions for summarization logic</li>
          <li><strong>Theme:</strong> <code>theme.ts</code> centralizes colors, spacing, typography</li>
          <li><strong>Docs:</strong> <code>docs/ApiRef.tsx</code>, <code>docs/BackendImplementationDoc.tsx</code>, <code>docs/FrontendImplementationDoc.tsx</code></li>
          <li><strong>UI Components:</strong> EmailForm, FileUpload, MeetingSummarizer, Modal, Navbar, PromptInput, SummaryEditor, TextInput, Toast</li>
        </ul>
      </Section>
      <Section title="Data Flow & API Integration" icon={<FiCode size={20} style={{ color: theme.colors.primary[500] }} />}>
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[800], display: 'grid', gap: theme.spacing[2] }}>
          <li>Frontend interacts with backend via <code>apiClient.ts</code> (fetch/axios)</li>
          <li>Handles transcript upload/input, prompt, summary generation, editing, and email sending</li>
          <li>Uses backend endpoints: <code>/api/summarize</code>, <code>/api/send-email</code>, <code>/api/health</code></li>
        </ul>
      </Section>
      <Section title="Validation & Error Handling" icon={<FiSettings size={20} style={{ color: theme.colors.primary[500] }} />}>
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[800], display: 'grid', gap: theme.spacing[2] }}>
          <li>Frontend validates user input (basic checks, e.g., email format, required fields)</li>
          <li>Displays error messages from backend responses</li>
          <li>Shows toast notifications for success/error</li>
        </ul>
      </Section>
      <Section title="Environment & Configuration" icon={<FiSettings size={20} style={{ color: theme.colors.primary[500] }} />}>
        <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.neutral[800], display: 'grid', gap: theme.spacing[2] }}>
          <li>Environment variables via <code>.env</code> (e.g., <code>NEXT_PUBLIC_API_BASE_URL</code>)</li>
          <li>Configurable API base URL for backend integration</li>
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
{`# Frontend Sample .env\nNEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com`}
        </pre>
        <button
          onClick={() => {
            navigator.clipboard.writeText(`# Frontend Sample .env\nNEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com`);
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
          <li>Deployable to <strong>Vercel</strong>  (Next.js optimized)</li>
          <li>Static assets in <code>public/</code></li>
          <li>Production: secure environment variables, connect to deployed backend</li>
        </ul>
        <div style={{ marginTop: theme.spacing[4], marginBottom: theme.spacing[2] }}>
          <span style={{ color: theme.colors.neutral[700], fontWeight: theme.typography.fontWeight.medium }}>
            Example Vercel deployed frontend URL:
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
          }}>https://mangodesk-frontend.vercel.app</code>
          <button
            onClick={() => {
              navigator.clipboard.writeText('https://mangodesk-frontend.vercel.app');
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
          <span>Use this URL to set <code>ALLOWED_ORIGIN</code> in your backend <code>.env</code> file.</span>
        </div>
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

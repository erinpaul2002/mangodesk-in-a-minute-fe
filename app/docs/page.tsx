'use client';

import React, { useMemo, useState } from 'react';
import { theme } from '../theme';
import ApiRef from './ApiRef';
import BackendImplementationDoc from './BackendImplementationDoc';
import FrontendImplementationDoc from './FrontendImplementationDoc';
import { FiBookOpen, FiSearch, FiFileText, FiGithub } from 'react-icons/fi';

// Responsive hook
function useBreakpoint() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

// Simple placeholder document list. Swap `content` with your actual text/markdown later.
type Doc = {
  id: string;
  title: string;
  summary?: string;
  content: string | React.ReactNode;
};

export default function DocsPage() {
  const isMobile = useBreakpoint();
  const docs: Doc[] = useMemo(
    () => [
      {
        id: 'api-ref',
        title: 'API Reference',
        summary: 'Endpoints, params, and examples.',
        content: <ApiRef />,
      },
      {
        id: 'backend-overview',
        title: 'Backend Architecture Overview',
        summary: 'Architecture, modules, validation, deployment.',
        content: <BackendImplementationDoc />,
      },
      {
        id: 'frontend-overview',
        title: 'Frontend Architecture Overview',
        summary: 'Structure, components, data flow, deployment.',
        content: <FrontendImplementationDoc />,
      },
    ],
    []
  );

  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(docs[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docs;
    return docs.filter((d) =>
      [d.title, d.summary, typeof d.content === 'string' ? d.content : '']
        .some((v) => (v ?? '').toLowerCase().includes(q))
    );
  }, [docs, query]);

  const selected = useMemo(() => filtered.find((d) => d.id === selectedId) ?? filtered[0] ?? null, [filtered, selectedId]);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? theme.spacing[4] : theme.spacing[6],
        padding: isMobile ? theme.spacing[2] : theme.spacing[6],
        maxWidth: isMobile ? '100%' : theme.layout.maxWidth['6xl'],
        margin: 0,
        fontFamily: theme.typography.fontFamily.sans.join(', '),
        background: `linear-gradient(90deg, ${theme.colors.primary[50]} 0%, ${theme.colors.neutral[50]} 100%)`,
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: isMobile ? '100%' : '280px',
          flex: isMobile ? 'unset' : '0 0 280px',
          background: theme.colors.neutral[0],
          border: `1px solid ${theme.colors.neutral[200]}`,
          borderRadius: theme.borderRadius.xl,
          boxShadow: theme.shadows.md,
          padding: isMobile ? theme.spacing[3] : theme.spacing[4],
          height: isMobile ? 'auto' : 'calc(100vh - 180px)',
          position: isMobile ? 'static' : 'sticky',
          top: isMobile ? undefined : theme.spacing[6],
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing[3],
          marginLeft: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2], fontWeight: theme.typography.fontWeight.bold, fontSize: isMobile ? theme.typography.fontSize.lg : theme.typography.fontSize.xl, color: theme.colors.primary[600] }}>
          <FiBookOpen size={isMobile ? 18 : 22} />
          Documents
        </div>

        <div style={{ position: 'relative' }}>
          <FiSearch style={{ position: 'absolute', left: theme.spacing[3], top: '50%', transform: 'translateY(-50%)', color: theme.colors.neutral[400] }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs..."
            style={{
              width: '100%',
              padding: `${theme.spacing[2]} ${theme.spacing[3]} ${theme.spacing[2]} ${theme.spacing[7]}`,
              borderRadius: theme.borderRadius.lg,
              border: `1px solid ${theme.colors.neutral[200]}`,
              background: theme.colors.neutral[50],
              outline: 'none',
              fontSize: isMobile ? theme.typography.fontSize.sm : theme.typography.fontSize.base,
            }}
          />
        </div>

        <div style={{ overflowY: isMobile ? 'visible' : 'auto', marginTop: theme.spacing[2] }}>
          {filtered.length === 0 && (
            <div style={{ color: theme.colors.neutral[500], fontSize: theme.typography.fontSize.sm }}>No results</div>
          )}

          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: theme.spacing[2] }}>
            {filtered.map((doc) => {
              const active = doc.id === selected?.id;
              return (
                <li key={doc.id}>
                  <button
                    onClick={() => setSelectedId(doc.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: isMobile ? theme.spacing[2] : theme.spacing[3],
                      borderRadius: theme.borderRadius.lg,
                      border: `1px solid ${active ? theme.colors.primary[400] : theme.colors.neutral[200]}`,
                      background: active ? `linear-gradient(90deg, ${theme.colors.primary[50]} 60%, ${theme.colors.neutral[0]} 100%)` : theme.colors.neutral[0],
                      color: theme.colors.neutral[800],
                      cursor: 'pointer',
                      transition: `background ${theme.animation.duration.normal} ${theme.animation.easing.ease}`,
                      boxShadow: active ? theme.shadows.sm : 'none',
                      position: 'relative',
                    }}
                  >
                    {active && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: theme.colors.primary[400], borderRadius: '4px 0 0 4px' }} />}
                    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}>
                      <FiFileText size={isMobile ? 14 : 18} style={{ color: active ? theme.colors.primary[600] : theme.colors.neutral[400] }} />
                      <span style={{ fontWeight: theme.typography.fontWeight.medium }}>{doc.title}</span>
                    </div>
                    {doc.summary && (
                      <div style={{ color: theme.colors.neutral[500], fontSize: isMobile ? theme.typography.fontSize.xs : theme.typography.fontSize.sm, marginTop: theme.spacing[1] }}>
                        {doc.summary}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <section style={{ flex: 1, minWidth: 0, width: isMobile ? '100%' : undefined }}>
        <div
          className="animate-in slide-in-from-top-2 duration-300"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary[50]} 0%, ${theme.colors.neutral[0]} 100%)`,
            border: `1px solid ${theme.colors.neutral[200]}`,
            borderRadius: theme.borderRadius['2xl'],
            boxShadow: theme.shadows.lg,
            padding: isMobile ? theme.spacing[3] : theme.spacing[6],
            minHeight: isMobile ? 'auto' : '60vh',
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing[4],
          }}
        >
          {selected ? (
            <>
              <h1
                style={{
                  margin: 0,
                  fontSize: isMobile ? theme.typography.fontSize.xl : theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  lineHeight: theme.typography.lineHeight.tight,
                  color: theme.colors.primary[700],
                  letterSpacing: '0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing[2],
                }}
              >
                <FiFileText size={isMobile ? 20 : 28} style={{ color: theme.colors.primary[500] }} />
                {selected.title}
              </h1>
              {selected.summary && (
                <p style={{ color: theme.colors.neutral[600], marginTop: theme.spacing[2], fontSize: isMobile ? theme.typography.fontSize.base : theme.typography.fontSize.lg }}>{selected.summary}</p>
              )}

              <div
                style={{
                  marginTop: theme.spacing[4],
                  background: theme.colors.neutral[50],
                  border: `1px solid ${theme.colors.neutral[200]}`,
                  borderRadius: theme.borderRadius.xl,
                  padding: isMobile ? theme.spacing[3] : theme.spacing[5],
                  color: theme.colors.neutral[900],
                  fontFamily: selected.id === 'api-ref' ? theme.typography.fontFamily.mono.join(', ') : undefined,
                  fontSize: selected.id === 'api-ref' ? theme.typography.fontSize.sm : (isMobile ? theme.typography.fontSize.sm : theme.typography.fontSize.base),
                  whiteSpace: 'pre-wrap',
                  boxShadow: theme.shadows.sm,
                  overflowX: 'auto',
                  borderLeft: selected.id === 'api-ref' ? `6px solid ${theme.colors.primary[400]}` : undefined,
                }}
              >
                {selected.id === 'api-ref' ? selected.content : selected.content}
              </div>
            </>
          ) : (
            <div style={{ color: theme.colors.neutral[600] }}>Select a document from the left to view its contents.</div>
          )}
        </div>
      </section>

      {/* Repo Links Card */}
      <div
        style={{
          position: isMobile ? 'static' : 'fixed',
          top: isMobile ? undefined : `120px`,
          right: isMobile ? undefined : theme.spacing[8],
          width: isMobile ? '100%' : '220px',
          zIndex: 100,
          background: theme.colors.neutral[0],
          border: `1px solid ${theme.colors.neutral[200]}`,
          borderRadius: theme.borderRadius.xl,
          boxShadow: theme.shadows.md,
          padding: isMobile ? theme.spacing[3] : theme.spacing[4],
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing[3],
          marginTop: isMobile ? theme.spacing[2] : 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2], fontWeight: theme.typography.fontWeight.bold, fontSize: isMobile ? theme.typography.fontSize.base : theme.typography.fontSize.lg, color: theme.colors.primary[600] }}>
          <FiGithub size={isMobile ? 16 : 20} />
          GitHub
        </div>
        <a
          href="https://github.com/erinpaul2002/mangodesk-in-a-minute-bd"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[2],
            padding: theme.spacing[2],
            borderRadius: theme.borderRadius.lg,
            border: `1px solid ${theme.colors.neutral[200]}`,
            background: theme.colors.neutral[50],
            color: theme.colors.primary[700],
            textDecoration: 'none',
            fontWeight: theme.typography.fontWeight.medium,
            fontSize: isMobile ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
            transition: 'background 0.2s',
          }}
        >
          <FiGithub size={isMobile ? 12 : 16} /> Backend
        </a>
        <a
          href="https://github.com/erinpaul2002/mangodesk-in-a-minute-fe"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[2],
            padding: theme.spacing[2],
            borderRadius: theme.borderRadius.lg,
            border: `1px solid ${theme.colors.neutral[200]}`,
            background: theme.colors.neutral[50],
            color: theme.colors.primary[700],
            textDecoration: 'none',
            fontWeight: theme.typography.fontWeight.medium,
            fontSize: isMobile ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
            transition: 'background 0.2s',
          }}
        >
          <FiGithub size={isMobile ? 12 : 16} /> Frontend
        </a>
        <a
          href="https://github.com/erinpaul2002"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[2],
            padding: theme.spacing[2],
            borderRadius: theme.borderRadius.lg,
            border: `1px solid ${theme.colors.neutral[200]}`,
            background: theme.colors.neutral[50],
            color: theme.colors.primary[700],
            textDecoration: 'none',
            fontWeight: theme.typography.fontWeight.medium,
            fontSize: isMobile ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
            transition: 'background 0.2s',
          }}
        >
          <FiGithub size={isMobile ? 12 : 16} /> Profile
        </a>
      </div>
    </main>
  );
}

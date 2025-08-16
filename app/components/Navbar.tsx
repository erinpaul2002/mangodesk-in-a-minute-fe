import React from 'react';
import { theme } from '../theme';

export default function Navbar() {
  return (
    <nav
      style={{
        background: theme.colors.primary[500],
        color: theme.colors.neutral[0],
        padding: theme.spacing[4],
        borderRadius: `0 0 ${theme.borderRadius.lg} ${theme.borderRadius.lg}`,
        boxShadow: theme.shadows.sm,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: theme.typography.fontFamily.sans.join(', '),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[3] }}>
        <img src="/favicon.png" alt="Mango Logo" style={{ width: 32, height: 32, borderRadius: '50%' }} />
        <span style={{ fontWeight: theme.typography.fontWeight.bold, fontSize: theme.typography.fontSize.lg }}>
          In-A-Minute
        </span>
      </div>
      <div style={{ display: 'flex', gap: theme.spacing[6] }}>
        <a href="/" style={{ color: theme.colors.neutral[0], textDecoration: 'none', fontWeight: theme.typography.fontWeight.medium }}>Home</a>
        <a href="https://epm-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.neutral[0], textDecoration: 'none', fontWeight: theme.typography.fontWeight.medium }}>Portfolio</a>
        <a href="/docs" style={{ color: theme.colors.neutral[0], textDecoration: 'none', fontWeight: theme.typography.fontWeight.medium }}>Docs</a>
      </div>
    </nav>
  );
}

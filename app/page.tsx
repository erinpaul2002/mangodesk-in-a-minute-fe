'use client';

import { useEffect } from 'react';

import MeetingSummarizer from './components/MeetingSummarizer';
import { healthCheck } from './apiClient';

export default function MeetingSummarizerPage() {
  useEffect(() => {
    healthCheck().catch(() => {});
  }, []);
  return <MeetingSummarizer />;
}
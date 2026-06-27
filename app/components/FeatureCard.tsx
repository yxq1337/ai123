'use client';

import Link from 'next/link';
import { useState } from 'react';

interface FeatureCardProps {
  href: string;
  emoji: string;
  title: string;
  description: string;
}

export function FeatureCard({ href, emoji, title, description }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
          padding: '1.75rem',
          border: '2px solid rgba(255,255,255,0.2)',
          color: 'var(--color-text-inverse)',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          height: '100%',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{emoji}</div>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text-inverse)'
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '0.9375rem',
          color: 'rgba(245, 241, 232, 0.8)',
          lineHeight: '1.6',
          margin: 0
        }}>
          {description}
        </p>
      </div>
    </Link>
  );
}

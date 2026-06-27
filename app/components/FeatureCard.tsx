'use client';

import Link from 'next/link';

interface FeatureCardProps {
  href: string;
  emoji: string;
  title: string;
  description: string;
}

export function FeatureCard({ href, emoji, title, description }: FeatureCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: 'transparent',
          padding: '2rem',
          border: '2px solid rgba(246, 130, 29, 0.3)',
          color: 'var(--color-text-inverse)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          height: '100%'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(246, 130, 29, 0.15)';
          e.currentTarget.style.borderColor = 'rgba(246, 130, 29, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(246, 130, 29, 0.3)';
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{emoji}</div>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text-inverse)'
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '0.9375rem',
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: '1.6',
          margin: 0
        }}>
          {description}
        </p>
      </div>
    </Link>
  );
}

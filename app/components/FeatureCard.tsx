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
          background: isHovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          padding: '1.75rem',
          borderRadius: '1rem',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          cursor: 'pointer',
          transition: 'transform 0.2s, background 0.2s',
          height: '100%',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{emoji}</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ fontSize: '0.9375rem', opacity: 0.9, lineHeight: '1.6', margin: 0 }}>
          {description}
        </p>
      </div>
    </Link>
  );
}

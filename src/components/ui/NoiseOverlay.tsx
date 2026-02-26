import React from 'react';

export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="noise-overlay pointer-events-none fixed inset-0 z-40 opacity-35 mix-blend-soft-light"
      style={{
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\' viewBox=\'0 0 160 160\'%3E%3Cfilter id=\'n\' x=\'0\' y=\'0\' width=\'100%25\' height=\'100%25\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.35\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
        willChange: 'opacity, transform',
        transform: 'translateZ(0)',
      }}
    />
  );
}


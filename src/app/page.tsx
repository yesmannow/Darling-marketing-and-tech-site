import React from 'react';

import DiagnosticEngine from '@/components/immersive/DiagnosticEngine';
import Hero from '@/components/immersive/Hero';
import Philosophy from '@/components/immersive/Philosophy';
import ServicesBento from '@/components/immersive/ServicesBento';
import VaultCarousel from '@/components/immersive/VaultCarousel';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Hero />
      <ServicesBento />
      <VaultCarousel />
      <Philosophy />
      <DiagnosticEngine />
      <NoiseOverlay />
    </main>
  );
}


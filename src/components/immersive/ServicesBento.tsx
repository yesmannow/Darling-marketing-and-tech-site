"use client";

import type { MotionValue } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

import BentoCard from '@/components/ui/BentoCard';

type ServiceCardConfig = {
  id: string;
  title: string;
  subtitle: string;
};

const SERVICES: readonly ServiceCardConfig[] = [
  {
    id: 'fractional-cmo',
    title: 'Fractional CMO & Strategy',
    subtitle: 'The 90-Day Growth Roadmap',
  },
  {
    id: 'paid-media',
    title: 'Paid Media Architecture',
    subtitle: 'The Budget Efficiency Audit',
  },
  {
    id: 'seo-content',
    title: 'SEO & Content Syndication',
    subtitle: 'The Authority Gap Analysis',
  },
  {
    id: 'ai-implementation',
    title: 'AI Implementation',
    subtitle: 'Efficiency Gains Breakdown',
  },
] as const;

export default function ServicesBento() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const ySlow: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yBase: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yFast: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yFastest: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 px-6 pb-28 pt-6 md:px-14 lg:px-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-icySilver/60">
              Services / Operating System
            </p>
            <h2 className="font-heading text-xl tracking-heading text-icySilver/90 sm:text-2xl">
              Architectures that compound advantage.
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[10px] uppercase tracking-[0.28em] text-icySilver/40 md:block">
            <p>Lenis-Linked Parallax Grid</p>
            <p>Scroll to Inspect</p>
          </div>
        </header>

        <div className="grid gap-5 md:grid-cols-2 lg:auto-rows-[minmax(160px,1fr)] lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <BentoCard
              title={SERVICES[0].title}
              subtitle={SERVICES[0].subtitle}
              y={yBase}
            />
          </div>

          <div className="lg:col-span-2">
            <BentoCard
              title={SERVICES[1].title}
              subtitle={SERVICES[1].subtitle}
              y={yFast}
            />
          </div>

          <div className="md:col-span-1 lg:col-span-1 lg:translate-y-6">
            <BentoCard
              title={SERVICES[2].title}
              subtitle={SERVICES[2].subtitle}
              y={ySlow}
            />
          </div>

          <div className="md:col-span-1 lg:col-span-3 lg:-translate-y-4">
            <BentoCard
              title={SERVICES[3].title}
              subtitle={SERVICES[3].subtitle}
              y={yFastest}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


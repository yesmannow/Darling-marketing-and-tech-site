"use client";

import { motion, useMotionValue } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import VaultCard from '@/components/ui/VaultCard';

type VaultCaseStudy = {
  id: string;
  context: string;
  pivot: string;
  metric: string;
};

export default function VaultCarousel() {
  const caseStudies: readonly VaultCaseStudy[] = useMemo(
    () => [
      {
        id: 'b2b-saas-growth',
        context: 'B2B SaaS Growth',
        pivot: 'Multi-Segment Funnel Rebuild',
        metric: '14% reduction in CAC',
      },
      {
        id: 'local-retail-automation',
        context: 'Local Retail Automation',
        pivot: 'Workflow + Offer Orchestration',
        metric: '32% lift in qualified inbound',
      },
      {
        id: 'service-based-scaling',
        context: 'Service-Based Scaling',
        pivot: 'Capacity-Aware Demand Shaping',
        metric: '3.1x increase in booked sessions',
      },
    ],
    [],
  );

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragBounds, setDragBounds] = useState<{ left: number; right: number }>(
    () => ({ left: 0, right: 0 }),
  );

  const x = useMotionValue(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const updateBounds = () => {
      const viewportWidth = viewport.getBoundingClientRect().width;
      const trackWidth = track.scrollWidth;
      const maxDrag = Math.max(0, trackWidth - viewportWidth);
      setDragBounds({ left: -maxDrag, right: 0 });
    };

    updateBounds();

    const ro = new ResizeObserver(() => updateBounds());
    ro.observe(viewport);
    ro.observe(track);

    return () => {
      ro.disconnect();
    };
  }, []);

  return (
    <section className="relative z-10 px-6 pb-28 pt-6 md:px-14 lg:px-24">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-icySilver/60">
              [ The Vault // Proof of Competence ]
            </p>
            <h2 className="font-heading text-2xl tracking-heading text-icySilver/95 sm:text-3xl">
              Results, Not Rhetoric.
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[10px] uppercase tracking-[0.28em] text-icySilver/40 md:block">
            <p>Click + Drag</p>
            <p>Horizontal Evidence Feed</p>
          </div>
        </header>

        <div
          ref={viewportRef}
          className="relative overflow-hidden rounded-[2rem] border border-plumNoir/60 bg-sapphire/40 px-3 py-6"
        >
          <motion.div
            ref={trackRef}
            className="flex cursor-grab gap-5 active:cursor-grabbing"
            style={{ x, willChange: 'transform' }}
            drag="x"
            dragConstraints={dragBounds}
            dragElastic={0.18}
            dragMomentum
            dragTransition={{ power: 0.28, timeConstant: 240 }}
          >
            {caseStudies.map((cs) => (
              <motion.div
                key={cs.id}
                className="shrink-0"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <VaultCard context={cs.context} pivot={cs.pivot} metric={cs.metric} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


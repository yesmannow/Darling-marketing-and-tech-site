"use client";

import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';

type Opinion = {
  id: string;
  title: string;
  body: string;
};

const OPINIONS: readonly Opinion[] = [
  {
    id: 'seo-video',
    title: 'SEO is dead without Video.',
    body:
      "If you aren't capturing attention visually, your text won't convert. We build holistic content ecosystems.",
  },
  {
    id: 'unit-economics',
    title: 'Traffic without unit economics is vanity.',
    body:
      "We don't care about page views. We care about Customer Acquisition Cost (CAC) and Lifetime Value (LTV).",
  },
  {
    id: 'ai-taste',
    title: "AI augments taste; it doesn't replace it.",
    body:
      'We deploy AI to handle the heavy lifting of data and automation, reserving human bandwidth for high-level creative strategy.',
  },
] as const;

export default function Philosophy() {
  const [activeId, setActiveId] = useState<string>(OPINIONS[0]?.id ?? '');

  const handleToggle = useCallback((id: string) => {
    setActiveId((current) => (current === id ? '' : id));
  }, []);

  return (
    <section className="relative z-10 px-6 pb-28 pt-6 md:px-14 lg:px-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row">
        {/* Strong Opinions Accordion */}
        <div className="md:w-1/2">
          <header className="mb-6 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-icySilver/60">
              Strong Opinions / Operating Principles
            </p>
            <h2 className="font-heading text-xl tracking-heading text-icySilver/90 sm:text-2xl">
              We&apos;re opinionated about what works.
            </h2>
          </header>

          <div className="space-y-3">
            {OPINIONS.map((opinion) => {
              const isActive = activeId === opinion.id;

              return (
                <article
                  key={opinion.id}
                  className="overflow-hidden rounded-2xl border border-plumNoir/70 bg-plumNoir/40"
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(opinion.id)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-7 w-0.5 rounded-full transition-colors ${
                          isActive ? 'bg-electricCyan' : 'bg-icySilver/30'
                        }`}
                      />
                      <span
                        className={`font-heading text-sm sm:text-base ${
                          isActive
                            ? 'text-icySilver'
                            : 'text-icySilver/60'
                        }`}
                      >
                        {opinion.title}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-icySilver/50">
                      {isActive ? 'Collapse' : 'Expand'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { height: 'auto', opacity: 1 },
                          collapsed: { height: 0, opacity: 0 },
                        }}
                        transition={{ duration: 0.24, ease: 'easeInOut' }}
                        className="overflow-hidden px-4 pb-4 sm:px-5 sm:pb-5"
                      >
                        <motion.p
                          initial={{ y: -4, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -4, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="font-mono text-[11px] leading-relaxed tracking-[0.02em] text-icySilver/80"
                        >
                          {opinion.body}
                        </motion.p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>

        {/* Founder & Vetted Network Manifesto */}
        <div className="md:w-1/2">
          <header className="mb-4 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-icySilver/60">
              Founder &amp; Network
            </p>
            <h2 className="font-heading text-xl tracking-heading text-icySilver/95 sm:text-2xl">
              The Solo-Led / Network-Backed Model.
            </h2>
          </header>

          <div className="space-y-5 rounded-3xl border border-plumNoir/70 bg-plumNoir/40 p-6 text-sm text-icySilver/85 sm:p-7 sm:text-base">
            <p className="font-body leading-relaxed tracking-body">
              You work directly with a single strategic founder who owns your
              market narrative, unit economics, and roadmap end-to-end. No
              handoffs to anonymous account managers; no disappearing partners
              once the proposal is signed.
            </p>
            <p className="font-body leading-relaxed tracking-body">
              Surrounding that founder is a vetted network of elite operators:
              media buyers, CRO specialists, marketing engineers, and technical
              implementers who have shipped in the real world. The bench
              expands and contracts around the exact problems your brand needs
              to solve.
            </p>
            <p className="font-body leading-relaxed tracking-body">
              Every collaborator is selected for taste, not just talent. We
              show our work, surface trade-offs, and give you visibility into
              who&apos;s touching your account.{' '}
              <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-electricCyan/90">
                Transparency is a premium trait.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import gsap from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';

import MagneticButton from '@/components/ui/MagneticButton';

const HEADLINE_WORDS = ['We', 'Engineer', 'Market', 'Dominance.'] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const targets = wordRefs.current.filter(
        (el): el is HTMLSpanElement => el !== null,
      );

      gsap.set(targets, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 1,
      });

      gsap.to(targets, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.15,
        ease: 'power3.out',
        stagger: 0.09,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 pb-24 pt-28 md:px-14 lg:px-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row">
        <div className="flex-1">
          <div className="mb-8 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-icySilver/60">
            <span className="h-px w-10 bg-electricCyan/60" />
            <span>Darling Marketing &amp; Technology</span>
          </div>

          <h1 className="font-heading text-4xl leading-[0.82] tracking-heading sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="flex flex-wrap gap-x-3 gap-y-1">
              {HEADLINE_WORDS.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  ref={(el) => {
                    wordRefs.current[index] = el;
                  }}
                  className="relative inline-block overflow-hidden align-baseline"
                  style={{ willChange: 'clip-path' }}
                >
                  <span className="inline-block" style={{ transform: 'translateZ(0)' }}>
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <div className="ml-16 mt-5 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-electricCyan/80">
            <span className="h-px w-10 bg-electricCyan/50" />
            <span>Strategy Engineered. Systems Deployed.</span>
          </div>
        </div>

        <div className="mt-6 flex w-full flex-col items-start justify-between md:mt-10 md:w-[34%] md:items-end">
          <p className="max-w-xs font-mono text-[11px] uppercase tracking-[0.3em] text-icySilver/70">
            [ Strategy // Paid Media // AI Architecture ]
          </p>

          <div className="mt-10 md:mt-16">
            <MagneticButton>Initialize Growth</MagneticButton>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-24 bottom-10 hidden h-48 w-48 rounded-full border border-electricCyan/25 blur-3xl md:block" />
      <div className="pointer-events-none absolute left-4 top-10 h-10 w-10 border border-electricCyan/30" />
    </section>
  );
}


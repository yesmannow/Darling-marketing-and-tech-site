"use client";

import clsx from 'clsx';
import { motion, type MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';
import React from 'react';

type BentoCardProps = {
  title: string;
  subtitle: string;
  y?: MotionValue<number>;
  className?: string;
  footer?: ReactNode;
};

export default function BentoCard({
  title,
  subtitle,
  y,
  className,
  footer,
}: BentoCardProps) {
  return (
    <motion.article
      style={{ y, willChange: 'transform' }}
      className={clsx(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl',
        'border border-plumNoir/60 bg-plumNoir/40 text-icySilver',
        'px-6 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8',
        'shadow-[0_22px_60px_rgba(15,23,42,0.75)] backdrop-blur-md',
        'transition-colors duration-200 hover:border-electricCyan/70',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-45 mix-blend-soft-light"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\' viewBox=\'0 0 160 160\'%3E%3Cfilter id=\'n\' x=\'0\' y=\'0\' width=\'100%25\' height=\'100%25\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.28\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />

      <div className="space-y-4">
        <h3 className="font-heading text-xl tracking-heading sm:text-2xl lg:text-3xl">
          {title}
        </h3>
        <p className="max-w-xs font-mono text-[11px] uppercase tracking-[0.28em] text-icySilver/70">
          {subtitle}
        </p>
      </div>

      <div className="mt-6">
        {footer ?? (
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.26em] text-icySilver/40">
            <span>Service Primitive</span>
            <span className="h-px w-10 bg-electricCyan/70" />
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 -z-20 rounded-3xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100">
        <div className="h-full w-full rounded-3xl bg-electricCyan/18" />
      </div>
    </motion.article>
  );
}


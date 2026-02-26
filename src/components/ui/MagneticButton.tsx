"use client";

import clsx from 'clsx';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';
import React, { useCallback } from 'react';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const MAGNET_RADIUS_PX = 80;

export default function MagneticButton({
  children,
  className,
  onClick,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.5 });

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < MAGNET_RADIUS_PX) {
        const strength = 1 - distance / MAGNET_RADIUS_PX;
        x.set(deltaX * 0.4 * strength);
        y.set(deltaY * 0.4 * strength);
        return;
      }

      x.set(0);
      y.set(0);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div
      className="inline-flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        type="button"
        onClick={onClick}
        style={{ x: springX, y: springY, willChange: 'transform' }}
        className={clsx(
          'relative inline-flex items-center justify-center rounded-full px-9 py-3',
          'border border-electricCyan/70 bg-plumNoir/40 text-icySilver',
          'font-body text-xs uppercase tracking-[0.26em]',
          'shadow-[0_0_0_1px_rgba(15,23,42,0.95)] backdrop-blur-sm',
          'transition-colors duration-200 hover:border-electricCyan hover:bg-plumNoir/80',
          'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-full',
          'before:bg-electricCyan/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electricCyan focus-visible:ring-offset-2 focus-visible:ring-offset-sapphire',
          className,
        )}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    </div>
  );
}


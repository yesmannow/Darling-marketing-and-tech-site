import React from 'react';

type VaultCardProps = {
  context: string;
  pivot: string;
  metric: string;
};

export default function VaultCard({ context, pivot, metric }: VaultCardProps) {
  return (
    <article
      className="
        flex h-full w-[280px] flex-col justify-between
        rounded-3xl border border-plumNoir/60 bg-plumNoir/40
        px-5 py-5 text-icySilver
        shadow-[0_18px_50px_rgba(15,23,42,0.8)]
        backdrop-blur-md
      "
    >
      <div className="space-y-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-icySilver/60">
          {context}
        </p>

        <h3 className="font-heading text-lg tracking-heading sm:text-xl">
          {pivot}
        </h3>

        <p className="font-heading text-base tracking-heading text-electricCyan sm:text-lg">
          {metric}
        </p>
      </div>

      <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-sapphire via-plumNoir to-electricCyan/40" />
    </article>
  );
}


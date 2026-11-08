"use client";

import { useEffect, useState } from "react";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(target: number): Remaining {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

// A hora atual só é lida no navegador (useEffect), nunca durante a geração da
// página no servidor; antes disso mostramos "--".
// `compact` mantém o tamanho de celular em qualquer tela (útil em prévias).
export function Countdown({ target, compact = false }: { target: string; compact?: boolean }) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const targetMs = new Date(target).getTime();
    const tick = () => setRemaining(getRemaining(targetMs));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: [keyof Remaining, string][] = [
    ["days", "dias"],
    ["hours", "horas"],
    ["minutes", "min"],
    ["seconds", "seg"],
  ];

  return (
    <div
      className={`flex justify-center gap-2 ${compact ? "" : "min-[360px]:gap-3 sm:gap-6"}`}
      aria-label="Contagem regressiva"
    >
      {units.map(([key, label]) => (
        <div
          key={key}
          className={`flex w-14 flex-col items-center rounded-lg bg-primary py-3 text-white ${compact ? "" : "min-[360px]:w-16 sm:w-24"}`}
        >
          <span className={`font-serif text-2xl tabular-nums ${compact ? "" : "sm:text-4xl"}`}>
            {remaining ? String(remaining[key]).padStart(2, "0") : "--"}
          </span>
          <span className={`text-xs uppercase tracking-widest ${compact ? "" : "sm:text-sm"}`}>{label}</span>
        </div>
      ))}
    </div>
  );
}

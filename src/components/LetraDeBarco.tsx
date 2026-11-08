// Letreiro no estilo dos abridores de letras, a pintura de letras dos barcos
// ribeirinhos da Amazônia: letra grossa com serifa, degradê com faixa de
// brilho, filete claro, contorno escuro e sombra projetada que dá volume.
// Feito com cópias do texto empilhadas (CSS grid na mesma célula); só a última
// camada é lida por leitores de tela.
import { Ultra } from "next/font/google";
import type { CSSProperties } from "react";

const ultra = Ultra({ subsets: ["latin"], weight: "400" });

const INK = "#575C60";
const PAPER = "#F6F7F9";

// Degradê de cima para baixo com uma faixa de brilho no meio, como nas letras pintadas.
const FILL = `linear-gradient(180deg, #BFDDF3 0%, #BFDDF3 44%, ${PAPER} 46%, ${PAPER} 48%, #98AEC3 50%, #667588 100%)`;

const extrusion = Array.from({ length: 8 }, (_, i) => `${((i + 1) * 0.01).toFixed(3)}em ${((i + 1) * 0.01).toFixed(3)}em 0 ${INK}`).join(", ");

// Os contornos são centrados na borda da letra; mantidos finos (e as letras
// um pouco espaçadas, ver tracking abaixo) para não fecharem o miolo de "o", "e", "a".
const layers: CSSProperties[] = [
  // Sombra projetada (volume)
  { color: INK, WebkitTextStroke: `0.12em ${INK}`, textShadow: extrusion },
  // Filete claro em volta da letra
  { color: PAPER, WebkitTextStroke: `0.085em ${PAPER}` },
  // Contorno fino escuro
  { color: INK, WebkitTextStroke: `0.035em ${INK}` },
  // Preenchimento em degradê
  { backgroundImage: FILL, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" },
];

export function LetraDeBarco({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`${ultra.className} inline-grid leading-tight tracking-[0.04em] ${className}`}>
      {layers.map((style, i) => (
        <span key={i} aria-hidden={i < layers.length - 1 || undefined} className="[grid-area:1/1]" style={style}>
          {children}
        </span>
      ))}
    </span>
  );
}

// Floreio horizontal, como os que os abridores pintam em volta do nome do barco.
export function Floreio({ className = "w-48 text-ink" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M100 4 L108 12 L100 20 L92 12 Z" fill="currentColor" />
      <path d="M88 12 H42 M112 12 H158" />
      <path d="M42 12 C31 12 27 4 33 2 C38 0 40 6 36 8" />
      <path d="M42 12 C31 12 27 20 33 22 C38 24 40 18 36 16" />
      <path d="M158 12 C169 12 173 4 167 2 C162 0 160 6 164 8" />
      <path d="M158 12 C169 12 173 20 167 22 C162 24 160 18 164 16" />
      <circle cx="18" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="182" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

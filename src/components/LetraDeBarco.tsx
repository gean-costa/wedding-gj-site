// Letreiro no estilo dos abridores de letras, a pintura de letras dos barcos
// ribeirinhos da Amazônia, inspirado na família de fontes "Muita Onda":
// letra toscana (Sancreek, com serifas bifurcadas), preenchimento em duas metades,
// estrelinhas de brilho e sombra 3D subindo para a direita.
// Feito com cópias do texto empilhadas (CSS grid na mesma célula); só a última
// camada é lida por leitores de tela.
import { Sancreek } from "next/font/google";
import type { CSSProperties } from "react";

const sancreek = Sancreek({ subsets: ["latin"], weight: "400" });

const INK = "#575C60";
const DARK = "#667588";

// Estrelinhas de brilho de 4 pontas, repetidas dentro da letra.
const sparkles = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><g fill='#F6F7F9'>` +
    `<path d='M11 4 L12.4 9.6 L18 11 L12.4 12.4 L11 18 L9.6 12.4 L4 11 L9.6 9.6 Z'/>` +
    `<path d='M30 24 L30.9 27.1 L34 28 L30.9 28.9 L30 32 L29.1 28.9 L26 28 L29.1 27.1 Z'/>` +
    `</g></svg>`,
)}")`;

// Metade de cima clara, metade de baixo média, separadas por uma fenda, como as
// camadas "base superior" e "base inferior" da fonte de referência.
// Tudo é medido por linha (1lh, com line-height fixo de 1.25em), então cada
// linha de um título que quebra tem as suas duas metades e a sua fenda.
// SPLIT = centro da fenda a partir do topo da linha, medido para a Sancreek em
// maiúsculas (meio da altura das letras).
const SPLIT = "0.575em";
const GAP = "max(2px, 0.04em)";
const split = `linear-gradient(180deg, #BFDDF3 0, #BFDDF3 ${SPLIT}, #98AEC3 ${SPLIT}, #98AEC3 100%)`;

// Máscara da fenda: corta todas as camadas (preenchimento, contorno e sombra)
// na mesma faixa, deixando aparecer o fundo da página.
const slitTop = `calc(${SPLIT} - ${GAP} / 2)`;
const slitBottom = `calc(${SPLIT} + ${GAP} / 2)`;
const slitMask = `linear-gradient(180deg, #000 0, #000 ${slitTop}, transparent ${slitTop}, transparent ${slitBottom}, #000 ${slitBottom}, #000 100%)`;
const slit: CSSProperties = {
  lineHeight: 1.25,
  WebkitMaskImage: slitMask,
  maskImage: slitMask,
  WebkitMaskSize: "100% 1lh",
  maskSize: "100% 1lh",
  WebkitMaskRepeat: "repeat",
  maskRepeat: "repeat",
};

// Sombra 3D: blocos subindo para a direita, com a última camada mais escura
// fazendo a borda do volume. `depth` = quantidade de camadas (comprimento).
function extrusion(depth: number) {
  return Array.from({ length: depth }, (_, i) => {
    const d = ((i + 1) * 0.011).toFixed(3);
    return `${d}em -${d}em 0 ${i === depth - 1 ? INK : DARK}`;
  }).join(", ");
}

// Preenchimento em duas metades + estrelinhas, com contorno bem fino.
const fill: CSSProperties = {
  backgroundImage: `${sparkles}, ${split}`,
  backgroundSize: "0.55em 0.55em, 100% 1lh",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextStroke: `0.018em ${INK}`,
};

// `shallow` encurta a sombra 3D, para textos pequenos continuarem legíveis.
// `fontClassName` permite testar outras fontes (ver /estilos/letreiro).
export function LetraDeBarco({
  children,
  className = "",
  shallow = false,
  fontClassName = sancreek.className,
}: {
  children: string;
  className?: string;
  shallow?: boolean;
  fontClassName?: string;
}) {
  const layers: CSSProperties[] = [{ color: DARK, textShadow: extrusion(shallow ? 4 : 9) }, fill];
  return (
    // px: a máscara recorta tudo fora da caixa; o respiro lateral evita cortar
    // a sombra 3D, que sai um pouco para a direita.
    <span className={`${fontClassName} inline-grid px-[0.12em] uppercase tracking-[0.03em] ${className}`} style={slit}>
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

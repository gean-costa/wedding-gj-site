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

// Metade de cima clara, metade de baixo média, separadas por uma fenda em
// zigue-zague, como as camadas "base superior" e "base inferior" da fonte de
// referência.
// Os dois desenhos abaixo (cores e máscara da fenda) são ladrilhos SVG de
// 0.3em x 1lh (line-height fixo de 1.25em) repetidos: cada linha de um título
// que quebra tem as suas duas metades e a sua fenda. Unidades do SVG: 100 = 1em.
const TILE_W = 30; // largura de um "dente" do zigue-zague (0.3em)
const LINE_H = 125; // altura da linha (1.25em)
const MID = 57.5; // centro da fenda a partir do topo da linha: meio da altura das letras na Sancreek em maiúsculas
const AMP = 3.5; // amplitude do zigue-zague (para cima e para baixo do centro)
const HALF_GAP = 1.1; // meia espessura da fenda
const EDGE = 2.4; // espessura do contorno da metade de baixo, logo abaixo da fenda

// Região acima da linha em zigue-zague deslocada `dy` do centro (a linha fica
// alta nas bordas do ladrilho e baixa no meio).
const above = (dy: number) =>
  `M0 0 H${TILE_W} V${MID - AMP + dy} L${TILE_W / 2} ${MID + AMP + dy} L0 ${MID - AMP + dy} Z`;
// Região abaixo da mesma linha.
const below = (dy: number) =>
  `M0 ${MID - AMP + dy} L${TILE_W / 2} ${MID + AMP + dy} L${TILE_W} ${MID - AMP + dy} V${LINE_H} H0 Z`;

const svgUrl = (body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${TILE_W} ${LINE_H}' preserveAspectRatio='none'>${body}</svg>`,
  )}")`;

// Linha em zigue-zague deslocada `dy` do centro. Começa e termina meio dente
// fora do ladrilho para emendar sem falhas com o ladrilho vizinho.
const zigLine = (dy: number) =>
  `M${-TILE_W / 2} ${MID + AMP + dy} L0 ${MID - AMP + dy} L${TILE_W / 2} ${MID + AMP + dy} L${TILE_W} ${MID - AMP + dy} L${(TILE_W * 3) / 2} ${MID + AMP + dy}`;

// Cores: metade de cima clara até o zigue-zague, metade de baixo média, com o
// contorno escuro da metade de baixo encostado na borda inferior da fenda.
const split = svgUrl(
  `<path d='${above(0)}' fill='#BFDDF3'/><path d='${below(0)}' fill='#98AEC3'/>` +
    `<path d='${zigLine(HALF_GAP + EDGE / 2)}' fill='none' stroke='${INK}' stroke-width='${EDGE}' stroke-linejoin='miter'/>`,
);

// Máscara da fenda: opaco acima e abaixo da faixa em zigue-zague, transparente
// nela. Corta todas as camadas (preenchimento, contorno e sombra) ao mesmo
// tempo, deixando aparecer o fundo da página.
const slitMask = svgUrl(`<path d='${above(-HALF_GAP)}'/><path d='${below(HALF_GAP)}'/>`);

const TILE_SIZE = "0.3em 1lh";

// Respiro lateral do letreiro: a máscara recorta tudo fora da caixa, e a sombra
// 3D sai um pouco para a direita. A máscara começa na borda externa (com o
// respiro) e as cores começam onde o texto começa; por isso a máscara é
// deslocada em PAD, para a fenda cair exatamente no encaixe das duas metades.
const PAD = "0.12em";

const slit: CSSProperties = {
  lineHeight: 1.25,
  paddingInline: PAD,
  WebkitMaskImage: slitMask,
  maskImage: slitMask,
  WebkitMaskSize: TILE_SIZE,
  maskSize: TILE_SIZE,
  WebkitMaskPosition: `${PAD} 0`,
  maskPosition: `${PAD} 0`,
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
  backgroundSize: `0.55em 0.55em, ${TILE_SIZE}`,
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
    <span className={`${fontClassName} inline-grid uppercase tracking-[0.03em] ${className}`} style={slit}>
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

// Ilustrações de Belém (pontos turísticos, garças e urubus) em SVG, nas cores
// da paleta. Cada desenho aceita três estilos:
//   "linha"    - traço fino, sem preenchimento (gravura / caderno de viagem)
//   "silhueta" - formas chapadas, com os detalhes vazados
//   "aquarela" - traço fino com uma mancha de cor clara por trás
// Os desenhos são estilizados (simplificados), não retratos fiéis.

export type IlustracaoVariant = "linha" | "silhueta" | "aquarela";
type Tone = "main" | "dark" | "light";

const COLORS: Record<Tone, string> = { main: "#667588", dark: "#575C60", light: "#98AEC3" };
const PAPER = "#F6F7F9";

type Props = { variant?: IlustracaoVariant; className?: string };

// Formas principais (paredes, telhados, corpos).
function body(variant: IlustracaoVariant, tone: Tone = "main") {
  return variant === "silhueta"
    ? { fill: COLORS[tone], stroke: "none" }
    : { fill: "none", stroke: COLORS.main, strokeWidth: 1.6, strokeLinejoin: "round" as const };
}

// Detalhes (janelas, arcos): vazados na silhueta, traço fino nos outros.
function detail(variant: IlustracaoVariant) {
  return variant === "silhueta"
    ? { fill: PAPER, stroke: "none" }
    : { fill: "none", stroke: COLORS.main, strokeWidth: 1.1, strokeLinejoin: "round" as const };
}

// Linhas que são sempre traço (pescoço e pernas das aves, mastros, cruzes).
function line(variant: IlustracaoVariant, tone: Tone = "main", width = 1.6) {
  return {
    fill: "none",
    stroke: variant === "silhueta" ? COLORS[tone] : COLORS.main,
    strokeWidth: variant === "silhueta" ? width * 1.5 : width,
    strokeLinecap: "round" as const,
  };
}

// Mancha de cor clara por trás do desenho (estilo aquarela).
function Wash({ variant, d }: { variant: IlustracaoVariant; d: string }) {
  if (variant !== "aquarela") return null;
  return <path d={d} fill="#BFDDF3" opacity="0.7" />;
}

function Water({ variant, y, width }: { variant: IlustracaoVariant; y: number; width: number }) {
  const waves = Array.from({ length: Math.ceil(width / 20) }, (_, i) => `M${i * 20} ${y} q5 -3 10 0 t10 0`).join(" ");
  return <path d={waves} {...line(variant, "light", 1.1)} />;
}

/* ---------------------------------------------------------------- Pontos */

// Mercado de Ferro do Ver-o-Peso: corpo baixo com arcos e quatro torrinhas pontudas.
export function VerOPeso({ variant = "linha", className }: Props) {
  const turrets = [16, 78, 142, 204];
  return (
    <svg viewBox="0 0 220 118" className={className} aria-hidden>
      <Wash variant={variant} d="M8 70 C20 30 90 22 120 30 C170 20 214 40 212 80 C210 108 30 112 8 70 Z" />
      <rect x="10" y="56" width="200" height="6" {...body(variant, "dark")} />
      <rect x="15" y="62" width="190" height="40" {...body(variant)} />
      {turrets.map((x) => (
        <g key={x}>
          <rect x={x - 8} y="38" width="16" height="24" {...body(variant)} />
          <path d={`M${x - 10} 38 L${x} 14 L${x + 10} 38 Z`} {...body(variant, "dark")} />
          <path d={`M${x} 14 V6`} {...line(variant, "dark", 1.2)} />
          <rect x={x - 3} y="44" width="6" height="10" rx="3" {...detail(variant)} />
        </g>
      ))}
      {Array.from({ length: 9 }, (_, i) => 22 + i * 20.5).map((x) => (
        <path key={x} d={`M${x} 98 V80 A7 7 0 0 1 ${x + 14} 80 V98 Z`} {...detail(variant)} />
      ))}
      <path d="M4 102 H216" {...line(variant, "dark", 1.4)} />
      <Water variant={variant} y={110} width={220} />
    </svg>
  );
}

// Theatro da Paz: fachada neoclássica com colunas, frontão e cúpula ao fundo.
export function TheatroDaPaz({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 220 112" className={className} aria-hidden>
      <Wash variant={variant} d="M14 80 C10 40 70 10 120 16 C180 12 216 50 206 86 C196 112 24 112 14 80 Z" />
      <path d="M82 42 Q110 8 138 42 Z" {...body(variant, "light")} />
      <rect x="105" y="12" width="10" height="9" {...body(variant, "dark")} />
      <rect x="20" y="62" width="32" height="32" {...body(variant)} />
      <rect x="168" y="62" width="32" height="32" {...body(variant)} />
      {[26, 38, 174, 186].map((x) => (
        <path key={x} d={`M${x} 88 V74 A4 4 0 0 1 ${x + 8} 74 V88 Z`} {...detail(variant)} />
      ))}
      <path d="M52 52 L110 28 L168 52 Z" {...body(variant, "dark")} />
      <circle cx="110" cy="43" r="4" {...detail(variant)} />
      <rect x="50" y="52" width="120" height="8" {...body(variant)} />
      {[62, 81, 100, 120, 139, 158].map((x) => (
        <rect key={x} x={x - 4} y="60" width="8" height="34" {...body(variant)} />
      ))}
      <rect x="15" y="94" width="190" height="5" {...body(variant, "dark")} />
      <rect x="10" y="99" width="200" height="5" {...body(variant)} />
    </svg>
  );
}

// Basílica de Nazaré: frontão central com rosácea e portal, entre duas torres.
export function BasilicaNazare({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden>
      <Wash variant={variant} d="M18 100 C8 50 50 6 100 10 C160 6 196 50 184 104 C176 136 26 138 18 100 Z" />
      {[30, 138].map((x) => (
        <g key={x}>
          <rect x={x} y="34" width="32" height="96" {...body(variant)} />
          <path d={`M${x - 2} 34 Q${x + 16} 10 ${x + 34} 34 Z`} {...body(variant, "dark")} />
          <path d={`M${x + 16} 14 V2 M${x + 11} 6 H${x + 21}`} {...line(variant, "dark", 1.2)} />
          <path d={`M${x + 10} 64 V50 A6 6 0 0 1 ${x + 22} 50 V64 Z`} {...detail(variant)} />
          <path d={`M${x + 10} 100 V86 A6 6 0 0 1 ${x + 22} 86 V100 Z`} {...detail(variant)} />
        </g>
      ))}
      <path d="M62 130 V62 L100 34 L138 62 V130 Z" {...body(variant, "light")} />
      <path d="M100 34 V22 M95 27 H105" {...line(variant, "dark", 1.2)} />
      <circle cx="100" cy="66" r="10" {...detail(variant)} />
      <path d="M86 130 V104 A14 14 0 0 1 114 104 V130 Z" {...detail(variant)} />
      <path d="M20 130 H180" {...line(variant, "dark", 1.4)} />
    </svg>
  );
}

// Farol de Belém, no Mangal das Garças: torre-mirante alta e esguia.
export function FarolBelem({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 80 160" className={className} aria-hidden>
      <Wash variant={variant} d="M14 120 C4 70 20 20 42 18 C66 18 76 80 66 130 C60 156 20 156 14 120 Z" />
      <path d="M30 150 L34 52 H46 L50 150 Z" {...body(variant)} />
      <rect x="26" y="36" width="28" height="14" {...body(variant, "light")} />
      <path d="M24 36 L40 22 L56 36 Z" {...body(variant, "dark")} />
      <path d="M40 22 V10" {...line(variant, "dark", 1.2)} />
      <path d="M20 51 H60" {...line(variant, "dark", 1.6)} />
      {[66, 88, 110, 132].map((y) => (
        <rect key={y} x="37.5" y={y} width="5" height="8" {...detail(variant)} />
      ))}
      <rect x="31" y="40" width="5" height="7" {...detail(variant)} />
      <rect x="44" y="40" width="5" height="7" {...detail(variant)} />
      <rect x="20" y="149" width="40" height="5" {...body(variant, "dark")} />
    </svg>
  );
}

/* ------------------------------------------------------------------ Aves */

// Garça em pé, olhando para a esquerda.
export function GarcaEmPe({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 60 100" className={className} aria-hidden>
      <Wash variant={variant} d="M8 40 C10 14 40 10 50 30 C60 54 48 80 30 78 C12 76 6 60 8 40 Z" />
      <path d="M22 50 C24 40 42 38 50 44 C54 48 50 56 38 58 C30 60 22 58 22 50 Z" {...body(variant, "light")} />
      <path d="M24 48 C14 40 28 30 19 20" {...line(variant, "light", 2.2)} />
      <circle cx="19" cy="18" r="2.6" {...body(variant, "light")} />
      <path d="M17 18 L5 20" {...line(variant, "dark", 1.3)} />
      <path d="M31 58 L29 96 M36 58 L38 96" {...line(variant, "dark", 1.2)} />
    </svg>
  );
}

// Garça voando, asas abertas, pescoço recolhido e pernas para trás.
export function GarcaVoando({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 100 50" className={className} aria-hidden>
      <Wash variant={variant} d="M6 22 C20 4 70 2 94 12 C100 30 70 44 44 42 C22 40 2 36 6 22 Z" />
      <path d="M48 26 Q30 4 2 8 Q24 18 42 30 Z" {...body(variant, "light")} />
      <path d="M56 26 Q74 6 98 4 Q80 18 60 30 Z" {...body(variant, "light")} />
      <path d="M40 28 C44 24 60 24 66 28 C60 32 46 32 40 28 Z" {...body(variant, "light")} />
      <path d="M41 28 C36 30 36 24 33 26" {...line(variant, "light", 1.8)} />
      <path d="M33 26 L24 27" {...line(variant, "dark", 1.2)} />
      <path d="M65 29 L86 33" {...line(variant, "dark", 1.1)} />
    </svg>
  );
}

// Urubu pousado, encurvado, cabeça pequena e careca.
export function UrubuPousado({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 50 72" className={className} aria-hidden>
      <Wash variant={variant} d="M6 40 C6 14 40 8 46 32 C52 58 40 70 24 68 C10 66 6 56 6 40 Z" />
      <path d="M14 62 C8 42 16 24 28 24 C38 24 44 40 38 62 Z" {...body(variant, "dark")} />
      <path d="M38 62 L44 68 L34 66 Z" {...body(variant, "dark")} />
      <circle cx="24" cy="19" r="4.5" {...body(variant, "light")} />
      <path d="M20 19 C16 19 15 22 17 23" {...line(variant, "dark", 1.3)} />
      <path d="M22 62 V69 M30 62 V69 M6 70 H46" {...line(variant, "dark", 1.2)} />
    </svg>
  );
}

// Urubu planando: asas largas e retas com as pontas "em dedos".
export function UrubuVoando({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 110 40" className={className} aria-hidden>
      <Wash variant={variant} d="M4 20 C14 4 96 2 106 18 C110 32 70 38 54 36 C30 34 0 32 4 20 Z" />
      <path
        d="M55 17 L22 13 L10 14 L4 11 L7 16 L1 17 L7 20 L22 22 L48 23 L55 30 L62 23 L88 22 L103 20 L109 17 L103 16 L106 11 L100 14 L88 13 Z"
        {...body(variant, "dark")}
      />
      <circle cx="55" cy="14" r="3" {...body(variant, "light")} />
    </svg>
  );
}

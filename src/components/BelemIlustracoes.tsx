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

// Arco (janela/porta): base em y, topo semicircular, largura w.
const arch = (cx: number, y: number, w: number, h: number) =>
  `M${cx - w / 2} ${y} V${y - h + w / 2} A${w / 2} ${w / 2} 0 0 1 ${cx + w / 2} ${y - h + w / 2} V${y} Z`;

// Mercado de Ferro do Ver-o-Peso, visto da baía: corpo baixo com uma fileira de
// janelas em arco e telhado de quatro águas; quatro torres quadradas com flechas
// altas e esguias (as duas de trás aparecem menores, atrás do telhado).
export function VerOPeso({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 260 150" className={className} aria-hidden>
      <Wash variant={variant} d="M12 110 C4 50 70 12 130 18 C200 10 256 60 248 118 C240 148 22 148 12 110 Z" />

      {/* Torres de trás */}
      {[96, 164].map((x) => (
        <g key={x}>
          <path d={`M${x - 7} 52 L${x} 26 L${x + 7} 52 Z`} {...body(variant, "dark")} />
          <path d={`M${x} 26 V18`} {...line(variant, "dark", 1)} />
          <rect x={x - 8} y="52" width="16" height="40" {...body(variant)} />
          <path d={arch(x, 70, 6, 12)} {...detail(variant)} />
        </g>
      ))}

      {/* Telhado de quatro águas e corpo com janelas em arco */}
      <path d="M52 98 L66 86 H194 L208 98 Z" {...body(variant, "light")} />
      <rect x="48" y="98" width="164" height="6" {...body(variant, "dark")} />
      <rect x="52" y="104" width="156" height="28" {...body(variant)} />
      {Array.from({ length: 11 }, (_, i) => 60 + i * 14).map((x) => (
        <path key={x} d={arch(x + 4, 128, 9, 18)} {...detail(variant)} />
      ))}

      {/* Torres da frente: fuste com nervuras, óculo, janela em arco e flecha alta */}
      {[38, 222].map((x) => (
        <g key={x}>
          <path d={`M${x - 13} 50 L${x} 6 L${x + 13} 50 Z`} {...body(variant, "dark")} />
          <path d={`M${x - 5} 50 L${x} 36 L${x + 5} 50 Z`} {...detail(variant)} />
          <path d={`M${x} 6 V0`} {...line(variant, "dark", 1.2)} />
          <rect x={x - 15} y="50" width="30" height="4" {...body(variant, "dark")} />
          <rect x={x - 13} y="54" width="26" height="78" {...body(variant)} />
          <path d={`M${x - 9} 58 V128 M${x + 9} 58 V128`} {...line(variant, "light", 0.8)} />
          <circle cx={x} cy="72" r="5" {...detail(variant)} />
          <path d={arch(x, 124, 10, 30)} {...detail(variant)} />
        </g>
      ))}

      {/* Cais e água */}
      <rect x="14" y="132" width="232" height="5" {...body(variant, "dark")} />
      <Water variant={variant} y={144} width={260} />
    </svg>
  );
}

// Theatro da Paz: térreo com cinco arcos; sacada com balaustrada e estátuas;
// andar superior com seis colunas, janelas em arco e medalhões ovais; faixa com
// o nome, frontão triangular; alas laterais com pilastras.
export function TheatroDaPaz({ variant = "linha", className }: Props) {
  const columns = [54, 80, 106, 134, 160, 186];
  const bays = [67, 93, 120, 147, 173];
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden>
      <Wash variant={variant} d="M10 112 C0 52 60 12 120 16 C190 12 240 62 228 118 C220 148 20 150 10 112 Z" />

      {/* Frontão */}
      <path d="M46 44 L120 16 L194 44 Z" {...body(variant, "dark")} />
      <path d="M66 41 L120 22 L174 41 Z" {...detail(variant)} />
      <path d="M108 36 Q120 28 132 36 Q120 33 108 36 Z" {...body(variant, "light")} />

      {/* Faixa com o nome */}
      <rect x="44" y="44" width="152" height="8" {...body(variant)} />
      <path d="M92 48 H148" {...line(variant, "light", 1.4)} />

      {/* Alas laterais */}
      {[12, 192].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="42" width="40" height="5" {...body(variant, "dark")} />
          <rect x={x} y="47" width="36" height="53" {...body(variant)} />
          <path d={`M${x + 4} 50 V98 M${x + 32} 50 V98`} {...line(variant, "light", 0.9)} />
          <path d={arch(x + 18, 90, 14, 28)} {...detail(variant)} />
          <rect x={x + 11} y="110" width="14" height="24" {...detail(variant)} />
        </g>
      ))}

      {/* Andar superior: colunas, janelas em arco e medalhões */}
      <rect x="48" y="52" width="144" height="42" {...body(variant, "light")} />
      {bays.map((c) => (
        <g key={c}>
          <ellipse cx={c} cy="63" rx="5" ry="6" {...detail(variant)} />
          <path d={arch(c, 92, 12, 20)} {...detail(variant)} />
        </g>
      ))}
      {columns.map((x) => (
        <g key={x}>
          <rect x={x - 3} y="54" width="6" height="40" {...body(variant)} />
          <rect x={x - 4.5} y="52" width="9" height="3" {...body(variant, "dark")} />
        </g>
      ))}

      {/* Sacada: balaustrada e estátuas */}
      <rect x="46" y="94" width="148" height="7" {...body(variant, "dark")} />
      {Array.from({ length: 23 }, (_, i) => 51 + i * 6).map((x) => (
        <rect key={x} x={x} y="95.5" width="2" height="4" {...detail(variant)} />
      ))}
      {[50, 190].map((x) => (
        <g key={x}>
          <path d={`M${x - 2.5} 94 V86 Q${x} 82 ${x + 2.5} 86 V94 Z`} {...body(variant, "dark")} />
          <circle cx={x} cy="80" r="2" {...body(variant, "dark")} />
        </g>
      ))}

      {/* Térreo com cinco arcos e base */}
      <rect x="48" y="101" width="144" height="39" {...body(variant)} />
      <path d="M48 112 H192 M48 124 H192" {...line(variant, "light", 0.7)} />
      {bays.map((c) => (
        <path key={c} d={arch(c, 140, 16, 32)} {...detail(variant)} />
      ))}
      <rect x="10" y="100" width="38" height="40" {...body(variant)} />
      <rect x="192" y="100" width="38" height="40" {...body(variant)} />
      <rect x="21" y="110" width="14" height="24" {...detail(variant)} />
      <rect x="203" y="110" width="14" height="24" {...detail(variant)} />
      <rect x="6" y="140" width="228" height="5" {...body(variant, "dark")} />
    </svg>
  );
}

// Basílica de Nazaré: duas torres com relógio, campanário em arco e cúpula com
// lanterna; no centro, frontão com mosaico e cruz, faixas de inscrição,
// rosácea, balaustrada e pórtico com quatro colunas e portal central.
export function BasilicaNazare({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden>
      <Wash variant={variant} d="M14 160 C0 80 40 14 100 12 C166 10 202 80 188 166 C178 214 24 216 14 160 Z" />

      {/* Torres */}
      {[12, 148].map((x) => (
        <g key={x}>
          <path d={`M${x + 8} 42 Q${x + 20} 20 ${x + 32} 42 Z`} {...body(variant)} />
          <rect x={x + 16} y="14" width="8" height="8" {...body(variant, "dark")} />
          <path d={`M${x + 20} 14 V4`} {...line(variant, "dark", 1.1)} />
          <rect x={x + 4} y="42" width="32" height="3" {...body(variant, "dark")} />
          <rect x={x + 6} y="45" width="28" height="23" {...body(variant, "light")} />
          <path d={arch(x + 20, 68, 12, 20)} {...detail(variant)} />
          <rect x={x} y="68" width="40" height="4" {...body(variant, "dark")} />
          <rect x={x + 2} y="72" width="36" height="24" {...body(variant)} />
          <circle cx={x + 20} cy="84" r="6" {...detail(variant)} />
          <rect x={x} y="96" width="40" height="114" {...body(variant)} />
          <path d={arch(x + 20, 146, 12, 24)} {...detail(variant)} />
          <path d={`M${x} 168 H${x + 40} M${x} 178 H${x + 40} M${x} 188 H${x + 40} M${x} 198 H${x + 40}`} {...line(variant, "light", 0.8)} />
        </g>
      ))}

      {/* Frontão com mosaico e cruz */}
      <path d="M52 78 L100 50 L148 78 Z" {...body(variant)} />
      <path d="M64 75 L100 55 L136 75 Z" {...body(variant, "light")} />
      <path d="M100 50 V32 M93 39 H107" {...line(variant, "dark", 1.6)} />
      <rect x="52" y="78" width="96" height="6" {...body(variant, "dark")} />

      {/* Andar superior: rosácea, janelas e balaustrada */}
      <rect x="52" y="84" width="96" height="44" {...body(variant)} />
      <circle cx="100" cy="99" r="11" {...detail(variant)} />
      {Array.from({ length: 8 }, (_, i) => i * 22.5).map((a) => (
        <path key={a} d="M100 90 V108" transform={`rotate(${a} 100 99)`} {...line(variant, "main", 0.6)} />
      ))}
      <path d={arch(72, 112, 10, 20)} {...detail(variant)} />
      <path d={arch(128, 112, 10, 20)} {...detail(variant)} />
      <rect x="56" y="115" width="88" height="9" {...detail(variant)} />
      <rect x="48" y="128" width="104" height="6" {...body(variant, "dark")} />

      {/* Pórtico com quatro colunas e portais */}
      <rect x="52" y="134" width="96" height="66" {...body(variant)} />
      <path d={arch(100, 200, 20, 44)} {...detail(variant)} />
      <rect x="70" y="170" width="10" height="30" {...detail(variant)} />
      <rect x="120" y="170" width="10" height="30" {...detail(variant)} />
      {[62, 86, 114, 138].map((x) => (
        <g key={x}>
          <rect x={x - 4} y="140" width="8" height="60" {...body(variant, "light")} />
          <rect x={x - 6} y="134" width="12" height="6" {...body(variant, "dark")} />
        </g>
      ))}

      {/* Escadaria */}
      <rect x="44" y="200" width="112" height="5" {...body(variant, "dark")} />
      <rect x="36" y="205" width="128" height="5" {...body(variant)} />
      <path d="M0 210 H200" {...line(variant, "dark", 1.4)} />
    </svg>
  );
}

// Palmeira: tronco curvo e folhas em leque a partir do topo.
function Palmeira({ variant, x, h, lean }: { variant: IlustracaoVariant; x: number; h: number; lean: number }) {
  const tx = x + lean;
  const ty = 104 - h;
  const fronds = ["q-10 -8 -22 -2", "q-6 -12 -16 -14", "q4 -12 14 -14", "q10 -6 22 0", "q-4 2 -14 12", "q4 2 14 12"];
  return (
    <g>
      <path d={`M${x} 104 Q${x + lean / 2} ${104 - h / 2} ${tx} ${ty}`} {...line(variant, "dark", 2)} />
      {fronds.map((f) => (
        <path key={f} d={`M${tx} ${ty} ${f}`} {...line(variant, "main", 1.6)} />
      ))}
    </g>
  );
}

// Mangal das Garças: o viveiro em cúpula de vidro à beira do lago, com
// palmeiras e o deque de madeira.
export function MangalDasGarcas({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 220 132" className={className} aria-hidden>
      <Wash variant={variant} d="M8 96 C4 44 60 14 110 18 C170 14 216 52 210 100 C204 130 16 132 8 96 Z" />

      {/* Lago */}
      <path d="M8 106 Q110 92 212 106 Q212 128 110 130 Q8 128 8 106 Z" {...body(variant, "light")} />
      <Water variant={variant} y={116} width={220} />

      {/* Cúpula de vidro com a malha de ferro */}
      <path d="M44 96 C44 56 72 36 106 36 C142 36 168 56 168 96 Z" {...body(variant)} />
      {[58, 74, 90, 106, 122, 138, 154].map((x) => (
        <path key={x} d={`M${x} 96 Q${x + (106 - x) * 0.25} 52 106 36`} {...line(variant, "light", 0.8)} />
      ))}
      <path d="M50 80 Q106 66 162 80 M58 64 Q106 50 154 64 M74 48 Q106 40 138 48" {...line(variant, "light", 0.8)} />
      <rect x="40" y="96" width="132" height="5" {...body(variant, "dark")} />

      {/* Palmeiras */}
      <Palmeira variant={variant} x={28} h={50} lean={-4} />
      <Palmeira variant={variant} x={188} h={56} lean={6} />
      <Palmeira variant={variant} x={176} h={38} lean={-3} />

      {/* Deque */}
      <path d="M124 106 H134 L160 132 H146 Z" {...body(variant, "dark")} />
      <path d="M131 111 H138 M136 117 H144 M141 123 H150" {...line(variant, "light", 0.8)} />
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

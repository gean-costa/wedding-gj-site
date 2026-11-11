// Ilustrações dos pontos turísticos de Belém em SVG, nas cores
// da paleta, desenhadas a partir de fotos reais (simplificadas). Cada desenho
// aceita quatro estilos:
//   "linha"    - traço fino, sem preenchimento (gravura / caderno de viagem)
//   "silhueta" - formas chapadas, com os detalhes vazados
//   "aquarela" - traço fino com uma mancha de cor clara por trás
//   "selo"     - cores chapadas claras com traço fino escuro, como nos selos
//                dos Correios (use dentro de <SeloPostal>)

export type IlustracaoVariant = "linha" | "silhueta" | "aquarela" | "selo";
type Tone = "main" | "dark" | "light";

const COLORS: Record<Tone, string> = { main: "#667588", dark: "#575C60", light: "#98AEC3" };
const SELO: Record<Tone, string> = { main: "#BFDDF3", dark: "#98AEC3", light: "#E3EAF1" };
const INK = "#575C60";
const PAPER = "#F6F7F9";

type Props = { variant?: IlustracaoVariant; className?: string };

// Formas principais (paredes, telhados, corpos).
function body(variant: IlustracaoVariant, tone: Tone = "main") {
  if (variant === "silhueta") return { fill: COLORS[tone], stroke: "none" };
  if (variant === "selo") return { fill: SELO[tone], stroke: INK, strokeWidth: 0.9, strokeLinejoin: "round" as const };
  return { fill: "none", stroke: COLORS.main, strokeWidth: 1.6, strokeLinejoin: "round" as const };
}

// Detalhes (janelas, arcos): vazados na silhueta, escuros no selo, traço fino nos outros.
function detail(variant: IlustracaoVariant) {
  if (variant === "silhueta") return { fill: PAPER, stroke: "none" };
  if (variant === "selo") return { fill: COLORS.main, stroke: INK, strokeWidth: 0.6, strokeLinejoin: "round" as const };
  return { fill: "none", stroke: COLORS.main, strokeWidth: 1.1, strokeLinejoin: "round" as const };
}

// Linhas que são sempre traço (pescoço e pernas das aves, mastros, cruzes).
function line(variant: IlustracaoVariant, tone: Tone = "main", width = 1.6) {
  const stroke = variant === "silhueta" ? COLORS[tone] : variant === "selo" ? INK : COLORS.main;
  return {
    fill: "none",
    stroke,
    strokeWidth: variant === "silhueta" ? width * 1.5 : variant === "selo" ? width * 0.7 : width,
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

// Arco (janela/porta): base em y, topo semicircular, largura w, altura total h.
const arch = (cx: number, y: number, w: number, h: number) =>
  `M${cx - w / 2} ${y} V${y - h + w / 2} A${w / 2} ${w / 2} 0 0 1 ${cx + w / 2} ${y - h + w / 2} V${y} Z`;

// Palmeira: tronco curvo e folhas em leque a partir do topo.
function Palmeira({ variant, x, base, h, lean }: { variant: IlustracaoVariant; x: number; base: number; h: number; lean: number }) {
  const tx = x + lean;
  const ty = base - h;
  const fronds = ["q-10 -8 -22 -2", "q-6 -12 -16 -14", "q4 -12 14 -14", "q10 -6 22 0", "q-4 2 -14 12", "q4 2 14 12"];
  return (
    <g>
      <path d={`M${x} ${base} Q${x + lean / 2} ${base - h / 2} ${tx} ${ty}`} {...line(variant, "dark", 2)} />
      {fronds.map((f) => (
        <path key={f} d={`M${tx} ${ty} ${f}`} {...line(variant, "main", 1.6)} />
      ))}
    </g>
  );
}

/* ---------------------------------------------------------------- Pontos */

// Água-furtada: janelinha com telhado de duas águas no meio da flecha.
function Lucarna({ variant, x, y }: { variant: IlustracaoVariant; x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 4} ${y} L${x} ${y - 4} L${x + 4} ${y} Z`} {...body(variant, "dark")} />
      <rect x={x - 3} y={y} width="6" height="6" {...detail(variant)} />
    </g>
  );
}

// Mercado de Ferro do Ver-o-Peso, visto da baía: quatro torres quadradas com
// flechas altas e águas-furtadas; telhado em dois níveis com lanternim; na
// fachada, frontão curvo no centro, faixa com círculos, janelas em leque,
// toldo escuro sobre as aberturas e o cais de madeira.
export function VerOPeso({ variant = "linha", className }: Props) {
  const fans = Array.from({ length: 10 }, (_, i) => 58 + i * 16);
  return (
    <svg viewBox="0 0 260 170" className={className} aria-hidden>
      <Wash variant={variant} d="M12 124 C4 56 70 14 130 20 C200 12 256 64 248 132 C240 164 22 164 12 124 Z" />

      {/* Torres de trás */}
      {[90, 170].map((x) => (
        <g key={x}>
          <path d={`M${x - 10} 60 L${x} 16 L${x + 10} 60 Z`} {...body(variant, "dark")} />
          <path d={`M${x} 16 V8`} {...line(variant, "dark", 1)} />
          <Lucarna variant={variant} x={x} y={44} />
          <rect x={x - 11} y="60" width="22" height="40" {...body(variant)} />
          <path d={arch(x, 92, 10, 22)} {...detail(variant)} />
        </g>
      ))}

      {/* Telhado em dois níveis com lanternim */}
      <path d="M54 100 L78 82 H182 L206 100 Z" {...body(variant, "light")} />
      <rect x="104" y="72" width="52" height="10" {...body(variant, "dark")} />
      <path d="M100 72 L116 60 H144 L160 72 Z" {...body(variant, "light")} />

      {/* Fachada: frontão curvo, faixa com círculos e janelas em leque */}
      <rect x="48" y="100" width="164" height="30" {...body(variant)} />
      <path d="M100 100 Q130 78 160 100 Z" {...body(variant)} />
      <path d="M112 100 Q130 86 148 100" {...line(variant, "light", 0.9)} />
      {Array.from({ length: 13 }, (_, i) => 56 + i * 12.3).map((x) => (
        <circle key={x} cx={x} cy="106" r="1.8" {...detail(variant)} />
      ))}
      {fans.map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 7} 125 A7 7 0 0 1 ${cx + 7} 125 Z`} {...detail(variant)} />
          <path d={`M${cx} 125 V118 M${cx} 125 L${cx - 5} 120 M${cx} 125 L${cx + 5} 120`} {...line(variant, "light", 0.6)} />
        </g>
      ))}

      {/* Toldo escuro e aberturas do térreo */}
      <path d="M40 128 H220 L228 137 H32 Z" {...body(variant, "dark")} />
      <rect x="44" y="137" width="172" height="17" {...detail(variant)} />
      {Array.from({ length: 13 }, (_, i) => 44 + i * 14.3).map((x) => (
        <path key={x} d={`M${x} 137 V154`} {...line(variant, "dark", 1.2)} />
      ))}

      {/* Torres da frente: flecha com águas-furtadas, fuste com janela em arco */}
      {[30, 230].map((x) => (
        <g key={x}>
          <path d={`M${x - 15} 58 L${x} 4 L${x + 15} 58 Z`} {...body(variant, "dark")} />
          <path d={`M${x} 4 V0`} {...line(variant, "dark", 1.2)} />
          <Lucarna variant={variant} x={x - 4} y={44} />
          <Lucarna variant={variant} x={x + 5} y={36} />
          <rect x={x - 17} y="58" width="34" height="5" {...body(variant, "dark")} />
          <rect x={x - 15} y="63" width="30" height="91" {...body(variant)} />
          <circle cx={x} cy="76" r="4" {...detail(variant)} />
          <path d={arch(x - 6, 120, 8, 30)} {...detail(variant)} />
          <path d={arch(x + 6, 120, 8, 30)} {...detail(variant)} />
        </g>
      ))}

      {/* Cais de madeira e água */}
      <rect x="10" y="154" width="240" height="6" {...body(variant, "dark")} />
      {Array.from({ length: 16 }, (_, i) => 18 + i * 15).map((x) => (
        <path key={x} d={`M${x} 154 V160`} {...line(variant, "light", 0.7)} />
      ))}
      <Water variant={variant} y={167} width={260} />
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

      <path d="M46 44 L120 16 L194 44 Z" {...body(variant, "dark")} />
      <path d="M66 41 L120 22 L174 41 Z" {...detail(variant)} />
      <path d="M108 36 Q120 28 132 36 Q120 33 108 36 Z" {...body(variant, "light")} />

      <rect x="44" y="44" width="152" height="8" {...body(variant)} />
      <path d="M92 48 H148" {...line(variant, "light", 1.4)} />

      {[12, 192].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="42" width="40" height="5" {...body(variant, "dark")} />
          <rect x={x} y="47" width="36" height="53" {...body(variant)} />
          <path d={`M${x + 4} 50 V98 M${x + 32} 50 V98`} {...line(variant, "light", 0.9)} />
          <path d={arch(x + 18, 90, 14, 28)} {...detail(variant)} />
          <rect x={x + 11} y="110" width="14" height="24" {...detail(variant)} />
        </g>
      ))}

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

// Basílica de Nazaré: duas torres com relógio, campanário em arco, balaustrada
// e templete redondo com colunas, cúpula e lanterna; no centro, frontão com
// mosaico, cruz e anjos, faixas de inscrição, rosácea, balaustrada e pórtico
// com quatro colunas.
export function BasilicaNazare({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden>
      <Wash variant={variant} d="M14 170 C0 90 40 14 100 12 C166 10 202 90 188 178 C178 232 24 236 14 170 Z" />

      {[12, 148].map((x) => (
        <g key={x}>
          {/* Templete redondo: cúpula, lanterna e colunas */}
          <path d={`M${x + 20} 12 V2`} {...line(variant, "dark", 1.1)} />
          <rect x={x + 17} y="12" width="6" height="6" {...body(variant, "dark")} />
          <path d={`M${x + 8} 31 Q${x + 20} 14 ${x + 32} 31 Z`} {...body(variant)} />
          <rect x={x + 9} y="31" width="22" height="15" {...body(variant, "light")} />
          <path d={`M${x + 13} 32 V45 M${x + 20} 32 V45 M${x + 27} 32 V45`} {...line(variant, "main", 0.9)} />
          {/* Balaustrada, campanário e relógio */}
          <rect x={x + 5} y="46" width="30" height="5" {...body(variant, "dark")} />
          <rect x={x + 4} y="51" width="32" height="30" {...body(variant)} />
          <path d={arch(x + 20, 79, 12, 24)} {...detail(variant)} />
          <rect x={x} y="81" width="40" height="3" {...body(variant, "dark")} />
          <rect x={x + 2} y="84" width="36" height="18" {...body(variant)} />
          <circle cx={x + 20} cy="93" r="5" {...detail(variant)} />
          {/* Corpo da torre */}
          <rect x={x} y="102" width="40" height="120" {...body(variant)} />
          <rect x={x + 8} y="112" width="24" height="30" {...detail(variant)} />
          <path d={`M${x} 176 H${x + 40} M${x} 186 H${x + 40} M${x} 196 H${x + 40} M${x} 206 H${x + 40}`} {...line(variant, "light", 0.8)} />
        </g>
      ))}

      {/* Frontão com mosaico, cruz e anjos */}
      <path d="M52 86 L100 58 L148 86 Z" {...body(variant)} />
      <path d="M64 83 L100 63 L136 83 Z" {...body(variant, "light")} />
      <path d="M100 58 V40 M93 47 H107" {...line(variant, "dark", 1.6)} />
      {[56, 144].map((x) => (
        <g key={x}>
          <path d={`M${x - 3} 86 V76 Q${x} 72 ${x + 3} 76 V86 Z`} {...body(variant, "light")} />
          <path d={`M${x} 76 L${x - 8} 68 M${x} 76 L${x + 8} 68`} {...line(variant, "light", 1.4)} />
        </g>
      ))}
      <rect x="52" y="86" width="96" height="6" {...body(variant, "dark")} />

      {/* Andar superior: rosácea, janelas e balaustrada */}
      <rect x="52" y="92" width="96" height="44" {...body(variant)} />
      <circle cx="100" cy="107" r="11" {...detail(variant)} />
      {Array.from({ length: 8 }, (_, i) => i * 22.5).map((a) => (
        <path key={a} d="M100 98 V116" transform={`rotate(${a} 100 107)`} {...line(variant, variant === "selo" ? "light" : "main", 0.6)} />
      ))}
      <path d={arch(72, 120, 10, 20)} {...detail(variant)} />
      <path d={arch(128, 120, 10, 20)} {...detail(variant)} />
      <rect x="56" y="123" width="88" height="9" {...body(variant, "light")} />
      <path d="M60 127.5 H140" {...line(variant, "main", 0.6)} />
      <rect x="48" y="136" width="104" height="6" {...body(variant, "dark")} />

      {/* Pórtico com quatro colunas e portais */}
      <rect x="52" y="142" width="96" height="80" {...body(variant)} />
      <path d={arch(100, 222, 20, 48)} {...detail(variant)} />
      <rect x="70" y="190" width="10" height="32" {...detail(variant)} />
      <rect x="120" y="190" width="10" height="32" {...detail(variant)} />
      {[62, 86, 114, 138].map((x) => (
        <g key={x}>
          <rect x={x - 4} y="148" width="8" height="74" {...body(variant, "light")} />
          <rect x={x - 6} y="142" width="12" height="6" {...body(variant, "dark")} />
        </g>
      ))}

      <rect x="44" y="222" width="112" height="5" {...body(variant, "dark")} />
      <rect x="36" y="227" width="128" height="5" {...body(variant)} />
      <path d="M0 232 H200" {...line(variant, "dark", 1.4)} />
    </svg>
  );
}

// Forte do Presépio (Forte do Castelo): muralhas baixas e maciças de pedra,
// levemente inclinadas, com o baluarte em quina mais alto, parapeito no alto,
// portão em arco com moldura clara à esquerda, guarita ao fundo e o fosso em
// rampa embaixo.
export function FortePresepio({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 240 124" className={className} aria-hidden>
      <Wash variant={variant} d="M8 96 C4 48 70 20 130 26 C200 20 236 60 230 102 C224 124 14 126 8 96 Z" />

      {/* Muralha da esquerda, baluarte e muralha que recua à direita */}
      {/* Pedra escura nas muralhas; parapeito mais claro no alto */}
      <path d="M150 94 V56 L226 66 L228 94 Z" {...body(variant, "dark")} />
      <path d="M150 56 L226 66 V62 L150 52 Z" {...body(variant, "light")} />
      <path d="M18 94 L24 50 H130 L132 94 Z" {...body(variant, "dark")} />
      <rect x="23" y="45" width="108" height="5" {...body(variant, "light")} />
      <path d="M128 94 L131 42 H151 L154 94 Z" {...body(variant, "dark")} />
      <rect x="130" y="38" width="22" height="5" {...body(variant, "light")} />

      {/* Fiadas de pedra */}
      <path d="M22 62 H130 M21 74 H131 M20 86 H132 M131 58 H152 M131 72 H153 M132 86 H153 M150 70 L227 78 M150 82 L227 88" {...line(variant, "main", 0.6)} />

      {/* Portão em arco com moldura */}
      <rect x="34" y="54" width="20" height="40" {...body(variant, "light")} />
      <rect x="32" y="51" width="24" height="4" {...body(variant, "light")} />
      <path d={arch(44, 94, 10, 30)} {...detail(variant)} />

      {/* Guarita na ponta da muralha */}
      <rect x="220" y="56" width="7" height="9" {...body(variant, "light")} />
      <path d="M219 56 Q223.5 50 228 56 Z" {...body(variant, "dark")} />

      {/* Fosso em rampa e gramado */}
      <path d="M0 116 L18 94 H228 L240 116 Z" {...body(variant, "light")} />
      <path d="M0 116 H240" {...line(variant, "dark", 1.4)} />
    </svg>
  );
}

// Casa das Onze Janelas: sobrado neoclássico de dois andares com onze janelas
// em cada; em cima, janelas altas com sacadas de ferro e cornijas; embaixo,
// janelas com moldura e grade e uma porta; pilastras nas pontas, faixa entre os
// andares e telhado de telhas com beiral.
export function CasaOnzeJanelas({ variant = "linha", className }: Props) {
  const xs = Array.from({ length: 11 }, (_, i) => 30 + i * 20);
  return (
    <svg viewBox="0 0 260 122" className={className} aria-hidden>
      <Wash variant={variant} d="M6 96 C2 44 70 14 130 18 C200 14 258 52 252 100 C246 124 12 124 6 96 Z" />

      {/* Telhado e cornija */}
      <path d="M4 32 L18 20 H242 L256 32 Z" {...body(variant, "dark")} />
      <rect x="6" y="32" width="248" height="5" {...body(variant, "light")} />

      {/* Paredes, pilastras e faixa entre os andares */}
      <rect x="10" y="37" width="240" height="73" {...body(variant)} />
      <rect x="10" y="37" width="9" height="73" {...body(variant, "light")} />
      <rect x="241" y="37" width="9" height="73" {...body(variant, "light")} />
      <rect x="10" y="72" width="240" height="4" {...body(variant, "light")} />

      {xs.map((x, i) => (
        <g key={x}>
          {/* Andar de cima: cornija, janela alta e sacada */}
          <rect x={x - 7} y="41" width="14" height="3" {...body(variant, "dark")} />
          <rect x={x - 5} y="45" width="10" height="20" {...detail(variant)} />
          <path d={`M${x - 7} 64 H${x + 7} M${x - 7} 69 H${x + 7} M${x - 5} 64 V69 M${x} 64 V69 M${x + 5} 64 V69`} {...line(variant, "dark", 0.8)} />
          {/* Térreo: moldura e janela com grade, ou a porta */}
          <rect x={x - 7} y="80" width="14" height="24" {...body(variant, "light")} />
          {i === 9 ? (
            <rect x={x - 5} y="82" width="10" height="22" {...detail(variant)} />
          ) : (
            <>
              <rect x={x - 5} y="83" width="10" height="16" {...detail(variant)} />
              <path d={`M${x - 2} 83 V99 M${x + 2} 83 V99`} {...line(variant, "light", 0.5)} />
            </>
          )}
        </g>
      ))}

      <rect x="6" y="110" width="248" height="5" {...body(variant, "dark")} />
      <path d="M0 115 H260" {...line(variant, "dark", 1.4)} />
    </svg>
  );
}

// Estação das Docas: os guindastes de pórtico na orla (cabine sobre um pórtico
// em arco e lança treliçada com o cabo e o gancho), a palmeira, o galpão com
// cobertura metálica e o guarda-corpo da beira do rio.
export function EstacaoDasDocas({ variant = "linha", className }: Props) {
  const crane = (x: number, s: number) => (
    <g transform={`translate(${x} ${140 - 140 * s}) scale(${s})`}>
      {/* Lança treliçada, cabo e gancho */}
      <path d="M44 62 L104 6 L110 10 L54 68 Z" {...body(variant, "dark")} />
      <path d="M52 62 L58 54 L64 52 L70 44 L76 42 L82 34 L88 32 L94 24 L100 22" {...line(variant, "light", 0.8)} />
      <path d="M108 10 V64" {...line(variant, "dark", 0.8)} />
      <path d="M105 64 H111 L109 70 H107 Z" {...body(variant, "dark")} />
      {/* Cabine */}
      <rect x="20" y="56" width="38" height="26" {...body(variant)} />
      <rect x="18" y="52" width="42" height="4" {...body(variant, "dark")} />
      <rect x="34" y="62" width="16" height="12" {...detail(variant)} />
      {/* Pórtico em arco */}
      <path d="M12 140 V96 Q12 84 24 84 H56 Q68 84 68 96 V140 H58 V100 Q58 94 52 94 H28 Q22 94 22 100 V140 Z" {...body(variant)} />
    </g>
  );
  return (
    <svg viewBox="0 0 220 150" className={className} aria-hidden>
      <Wash variant={variant} d="M8 116 C0 56 60 6 120 10 C190 6 220 70 210 122 C202 150 18 150 8 116 Z" />

      {/* Galpão com cobertura metálica */}
      <path d="M0 140 V104 L30 92 L60 104 V140 Z" {...body(variant, "light")} />
      <path d="M6 104 L30 95 L54 104 M10 112 H50 M10 120 H50" {...line(variant, "main", 0.8)} />

      <Palmeira variant={variant} x={70} base={140} h={96} lean={-4} />

      {crane(118, 0.62)}
      {crane(84, 1)}

      {/* Orla: piso, guarda-corpo e rio */}
      <rect x="0" y="140" width="220" height="5" {...body(variant, "dark")} />
      <path d="M176 140 V128 M188 140 V128 M200 140 V128 M212 140 V128 M170 128 H220 M170 134 H220" {...line(variant, "main", 1)} />
      <Water variant={variant} y={149} width={220} />
    </svg>
  );
}

// Relógio da Praça do Relógio, junto ao Ver-o-Peso: base octogonal em degraus,
// pedestal, coluna de ferro com painéis e medalhão, cabeça com mostrador e
// cúpula bulbosa com cata-vento.
export function RelogioVerOPeso({ variant = "linha", className }: Props) {
  return (
    <svg viewBox="0 0 80 200" className={className} aria-hidden>
      <Wash variant={variant} d="M8 150 C0 90 20 20 40 18 C62 18 80 100 72 160 C66 196 14 196 8 150 Z" />

      {/* Cata-vento, cúpula e cornija */}
      <path d="M40 30 V12 M35 18 H45 M40 12 L46 14 L40 16" {...line(variant, "dark", 1.1)} />
      <path d="M29 50 Q28 38 34 34 Q40 28 46 34 Q52 38 51 50 Z" {...body(variant, "dark")} />
      <path d="M34 50 Q34 40 40 34 M46 50 Q46 40 40 34" {...line(variant, "light", 0.7)} />
      <rect x="26" y="50" width="28" height="4" {...body(variant, "dark")} />
      <path d="M27 50 V46 M53 50 V46" {...line(variant, "dark", 1)} />

      {/* Cabeça do relógio */}
      <rect x="28" y="54" width="24" height="24" {...body(variant, "light")} />
      <circle cx="40" cy="66" r="8.5" {...body(variant)} />
      <path d="M40 66 V60 M40 66 L44 68" {...line(variant, "dark", 1)} />
      <rect x="27" y="78" width="26" height="4" {...body(variant, "dark")} />

      {/* Coluna com painéis e medalhão */}
      <rect x="32" y="82" width="16" height="58" {...body(variant)} />
      <rect x="35" y="88" width="4" height="22" {...detail(variant)} />
      <rect x="41" y="88" width="4" height="22" {...detail(variant)} />
      <circle cx="40" cy="122" r="4" {...body(variant, "light")} />
      <rect x="29" y="140" width="22" height="4" {...body(variant, "dark")} />

      {/* Pedestal e base octogonal em degraus */}
      <path d="M26 144 L23 172 H57 L54 144 Z" {...body(variant, "light")} />
      <rect x="31" y="152" width="18" height="14" {...detail(variant)} />
      <path d="M18 172 H62 L66 182 H14 Z" {...body(variant, "dark")} />
      <path d="M10 182 H70 L76 194 H4 Z" {...body(variant, "dark")} />
    </svg>
  );
}

// Mercado de São Brás: prédio longo de dois andares com pavilhão central
// saliente (relógio sob coroamento curvo, grande portão em arco ladeado por
// pilastras com águias); térreo rusticado com portas em arco sobre rodapé
// escuro; andar de cima com janelas e balaustrada; telhado metálico com lanternim.
export function MercadoSaoBras({ variant = "linha", className }: Props) {
  const wingDoors = [24, 46, 68, 90, 170, 192, 214, 236];
  const windows = [20, 33, 46, 59, 72, 85, 98, 162, 175, 188, 201, 214, 227, 240];
  return (
    <svg viewBox="0 0 260 128" className={className} aria-hidden>
      <Wash variant={variant} d="M8 100 C2 48 70 14 130 18 C200 14 258 52 252 104 C246 128 14 128 8 100 Z" />

      {/* Telhado metálico com lanternim */}
      <path d="M12 46 L38 30 H222 L248 46 Z" {...body(variant, "light")} />
      <rect x="86" y="24" width="88" height="6" {...body(variant, "dark")} />
      <path d="M50 38 H210" {...line(variant, "main", 0.6)} />

      {/* Andar de cima: cornija, janelas e balaustrada */}
      <rect x="6" y="44" width="248" height="4" {...body(variant, "dark")} />
      <rect x="10" y="48" width="240" height="24" {...body(variant)} />
      {windows.map((x) => (
        <rect key={x} x={x - 3.5} y="52" width="7" height="11" {...detail(variant)} />
      ))}
      <rect x="10" y="66" width="240" height="6" {...body(variant, "light")} />
      {Array.from({ length: 40 }, (_, i) => 13 + i * 6).filter((x) => x < 104 || x > 156).map((x) => (
        <rect key={x} x={x} y="67.5" width="2" height="3" {...detail(variant)} />
      ))}

      {/* Térreo rusticado com portas em arco e rodapé escuro */}
      <rect x="10" y="72" width="240" height="40" {...body(variant)} />
      <path d="M10 80 H250 M10 88 H250 M10 96 H250 M10 104 H250" {...line(variant, "light", 0.6)} />
      {wingDoors.map((c) => (
        <path key={c} d={arch(c, 112, 12, 30)} {...detail(variant)} />
      ))}
      <rect x="8" y="112" width="244" height="6" {...body(variant, "dark")} />

      {/* Pavilhão central: coroamento com relógio, pilastras com águias e portão em arco */}
      <rect x="106" y="40" width="48" height="72" {...body(variant, "light")} />
      <path d="M108 40 Q130 18 152 40 Z" {...body(variant)} />
      <path d="M130 22 V14" {...line(variant, "dark", 1.1)} />
      <circle cx="130" cy="33" r="5" {...detail(variant)} />
      <rect x="108" y="44" width="7" height="68" {...body(variant)} />
      <rect x="145" y="44" width="7" height="68" {...body(variant)} />
      {[111.5, 148.5].map((x) => (
        <path key={x} d={`M${x - 5} 84 Q${x} 74 ${x + 5} 84 L${x} 80 Z`} {...body(variant, "dark")} />
      ))}
      <path d={arch(130, 112, 22, 52)} {...detail(variant)} />
      <path d="M124 112 V78 M130 112 V72 M136 112 V78 M120 92 H140" {...line(variant, "light", 0.6)} />

      <path d="M0 118 H260" {...line(variant, "dark", 1.4)} />
    </svg>
  );
}

/* ------------------------------------------------------------- Selo postal */

// Selo de carta, inspirado no selo dos Correios do Theatro da Paz (1978):
// borda picotada nos quatro lados (máscara `picote`), margem branca, ilustração, faixa com local e valor, legenda
// e crédito na vertical. As bolinhas da borda deixam ver o fundo da página.
// `small` é a versão reduzida (sem crédito vertical), para colar na carta.
// `uniforme`: legenda só com o nome e sempre com altura de duas linhas, para
// que selos com legendas de tamanhos diferentes fiquem com a mesma altura.
export function SeloPostal({
  title,
  children,
  rotate = 0,
  small = false,
  uniforme = false,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  rotate?: number;
  small?: boolean;
  uniforme?: boolean;
  className?: string;
}) {
  return (
    // A sombra fica num invólucro: se ficasse no mesmo elemento da máscara,
    // a máscara cortaria a sombra junto.
    <div
      className={`inline-block drop-shadow-md ${className}`}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      <div className="h-full bg-white p-[6px]" style={picote}>
        <div className={`relative flex h-full flex-col bg-white ${small ? "px-1.5 pb-1 pt-1.5" : "px-3 pb-2 pt-3"}`}>
          {!small && (
            <span className="absolute left-0.5 top-3 rotate-180 text-[7px] uppercase tracking-widest text-stone [writing-mode:vertical-rl]">
              Juliana &amp; Gean · 2027
            </span>
          )}
          <div className={`flex flex-1 items-end justify-center bg-river/60 ${small ? "px-1 pt-1" : "px-2 pt-2"}`}>{children}</div>
          <div className={`flex items-baseline justify-between gap-2 whitespace-nowrap bg-primary text-white ${small ? "mt-1 px-1 py-0.5" : "mt-2 px-2 py-1"}`}>
            <span className={`font-bold tracking-wide ${small ? "text-[9px]" : "text-sm"}`}>Belém 27</span>
            <span className={`font-bold ${small ? "text-[9px]" : "text-sm"}`}>13,11</span>
          </div>
          <p
            className={`mt-1 text-center uppercase text-ink ${small ? "text-[5px] tracking-[0.15em]" : "text-[8px] tracking-[0.2em]"} ${uniforme ? "h-[2lh] leading-[1.35]" : ""}`}
          >
            {uniforme ? title : `${title} · Belém — Pará`}
          </p>
        </div>
      </div>
    </div>
  );
}

// Picote do selo nos quatro lados: uma máscara com meias-bolinhas "furando"
// cada borda (uma camada por lado, combinadas com intersect). O `round` ajusta
// o espaçamento (~12px) para caber um número inteiro de furos em cada lado,
// então os furos ficam simétricos qualquer que seja o tamanho do selo.
const furo = "transparent 3.6px, #000 4.1px";
const picote: React.CSSProperties = {
  maskImage: [
    `radial-gradient(circle at 50% 0, ${furo})`,
    `radial-gradient(circle at 50% 100%, ${furo})`,
    `radial-gradient(circle at 0 50%, ${furo})`,
    `radial-gradient(circle at 100% 50%, ${furo})`,
  ].join(", "),
  maskSize: "12px 100%, 12px 100%, 100% 12px, 100% 12px",
  maskRepeat: "round no-repeat, round no-repeat, no-repeat round, no-repeat round",
  maskComposite: "intersect",
};

// Carimbo do correio: círculo duplo com a cidade e a data, e linhas onduladas.
export function Carimbo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" className={className} aria-hidden>
      <g fill="none" stroke={INK} strokeWidth="1.4" opacity="0.75">
        <circle cx="35" cy="35" r="30" />
        <circle cx="35" cy="35" r="22" />
        <path d="M66 20 q8 -5 16 0 t16 0 t16 0 M66 30 q8 -5 16 0 t16 0 t16 0 M66 40 q8 -5 16 0 t16 0 t16 0 M66 50 q8 -5 16 0 t16 0 t16 0" />
      </g>
      <text x="35" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill={INK} opacity="0.8">BELÉM</text>
      <text x="35" y="43" textAnchor="middle" fontSize="7" fill={INK} opacity="0.8">13 NOV 2027</text>
    </svg>
  );
}

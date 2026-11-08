// Catálogo de desenhos de azulejo (área 100x100). Cada um é desenhado para que
// as bordas continuem no azulejo vizinho ao serem repetidos lado a lado.
// O site usa TileFlor com rejunte (ver Azulejo.tsx); os demais ficam guardados
// para uso futuro e podem ser vistos em /estilos/azulejo-novo.
import type { ComponentType } from "react";

const INK = "#575C60";
const DARK = "#667588";
const MID = "#98AEC3";
const LIGHT = "#BFDDF3";
const PAPER = "#F6F7F9";

const rot = (n: number, step: number, offset = 0) => Array.from({ length: n }, (_, i) => offset + i * step);
const quarters = [0, 90, 180, 270];
const corners = [[0, 0], [100, 0], [0, 100], [100, 100]];

/* ---------------------------------------------------------------------------
 * A) Instituto Histórico e Geográfico do Pará (Cidade Velha)
 * Medalhão com rosácea; a moldura são 4 arcos que, no meio de cada lado, viram
 * um "canal" reto até a borda e continuam no azulejo vizinho. Estrela nos cantos.
 * ------------------------------------------------------------------------- */
export function TileInstituto() {
  // Círculo r=44: nas linhas x=43 e x=57 ele fica em y≈6.56.
  const frameQuarter = "M43 -1 V6.56 A44 44 0 0 0 6.56 43 H-1";
  // Zigue-zague da coroa: pontas externas (r=23.5) e internas (r=19) alternadas.
  const zigzag = rot(32, 11.25)
    .map((a, i) => {
      const r = i % 2 === 0 ? 19 : 23.5;
      const rad = (a * Math.PI) / 180;
      return `${(50 + r * Math.sin(rad)).toFixed(2)} ${(50 - r * Math.cos(rad)).toFixed(2)}`;
    })
    .join(" L ");

  return (
    <>
      <rect width="100" height="100" fill={PAPER} />

      {quarters.map((a) => (
        <path key={`f${a}`} d={frameQuarter} fill="none" stroke={DARK} strokeWidth="3" transform={`rotate(${a} 50 50)`} />
      ))}

      {corners.map(([x, y]) => (
        <g key={`s${x}${y}`} transform={`translate(${x} ${y})`}>
          {rot(4, 90, 45).map((a) => (
            <path key={a} d="M0 0 Q4 -6 0 -17 Q-4 -6 0 0 Z" fill={LIGHT} stroke={DARK} strokeWidth="1" transform={`rotate(${a})`} />
          ))}
          {quarters.map((a) => (
            <path key={a} d="M-2 0 L0 -13 L2 0 Z" fill={DARK} transform={`rotate(${a})`} />
          ))}
        </g>
      ))}

      {/* Anel do medalhão */}
      <circle cx="50" cy="50" r="32" fill="none" stroke={LIGHT} strokeWidth="4.6" />
      <circle cx="50" cy="50" r="34.4" fill="none" stroke={MID} strokeWidth="0.9" />
      <circle cx="50" cy="50" r="29.6" fill="none" stroke={MID} strokeWidth="0.9" />

      {/* Coroa: triângulos na borda, zigue-zague e gotas apontando ao centro */}
      {rot(16, 22.5, 11.25).map((a) => (
        <path key={`t${a}`} d="M50 21.3 L52.6 26.8 L47.4 26.8 Z" fill={DARK} transform={`rotate(${a} 50 50)`} />
      ))}
      <path d={`M ${zigzag} Z`} fill="none" stroke={DARK} strokeWidth="1.5" strokeLinejoin="round" />
      {rot(8, 45).map((a) => (
        <path key={`g${a}`} d="M50 37.5 C47.4 35 47 31.5 50 31 C53 31.5 52.6 35 50 37.5 Z" fill={DARK} transform={`rotate(${a} 50 50)`} />
      ))}

      {/* Rosácea central */}
      {rot(8, 45, 22.5).map((a) => (
        <ellipse key={`p${a}`} cx="50" cy="40" rx="3.6" ry="8" fill={LIGHT} transform={`rotate(${a} 50 50)`} />
      ))}
      {quarters.map((a) => (
        <path key={`r${a}`} d="M50 30.5 L51 43 L49 43 Z" fill={DARK} transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="7" fill={PAPER} stroke={MID} strokeWidth="1.3" />
    </>
  );
}

/* ---------------------------------------------------------------------------
 * B) Octógono (matriz, linha 1 coluna 4)
 * Faixa pontilhada em octógono cujas pontas seguem retas até a borda e se ligam
 * às do vizinho; flor de 8 pétalas no centro; ornamentos nos cantos.
 * ------------------------------------------------------------------------- */
export function TileOctogono() {
  const octagon = "M36 11 H64 L89 36 V64 L64 89 H36 L11 64 V36 Z";
  const stubs = "M36 11 V-1 M64 11 V-1 M89 36 H101 M89 64 H101 M64 89 V101 M36 89 V101 M11 64 H-1 M11 36 H-1";
  const band = (stroke: string, width: number, extra = {}) => (
    <g fill="none" stroke={stroke} strokeWidth={width} strokeLinejoin="miter" {...extra}>
      <path d={octagon} />
      <path d={stubs} />
    </g>
  );

  return (
    <>
      <rect width="100" height="100" fill={PAPER} />

      {/* Ornamentos dos cantos (cada canto mostra um quarto do desenho) */}
      {corners.map(([x, y]) => (
        <g key={`c${x}${y}`} transform={`translate(${x} ${y})`}>
          {quarters.map((a) => (
            <g key={a} transform={`rotate(${a})`}>
              <path d="M0 0 Q9 1.5 16 16 Q1.5 9 0 0 Z" fill={DARK} />
              <path d="M5 21 C2 13 7 8 13 9.5" fill="none" stroke={DARK} strokeWidth="2.6" strokeLinecap="round" />
              <path d="M21 5 C13 2 8 7 9.5 13" fill="none" stroke={DARK} strokeWidth="2.6" strokeLinecap="round" />
              <circle cx="20" cy="20" r="1.8" fill={DARK} />
            </g>
          ))}
        </g>
      ))}

      {/* Meia-lua entre as faixas no meio de cada lado (fecha com o vizinho) */}
      {quarters.map((a) => (
        <g key={`m${a}`} transform={`rotate(${a} 50 50)`}>
          <path d="M43 -1 Q50 8 57 -1 Z" fill={DARK} />
          <circle cx="50" cy="-0.5" r="1.6" fill={PAPER} />
        </g>
      ))}

      {/* Faixa: contorno escuro, faixa média e pontinhos claros */}
      {band(DARK, 8.4)}
      {band(MID, 6.6)}
      {band(PAPER, 1.5, { strokeDasharray: "0 3.6", strokeLinecap: "round" })}

      {[[36, 20], [64, 20], [80, 36], [80, 64], [64, 80], [36, 80], [20, 64], [20, 36]].map(([x, y]) => (
        <circle key={`d${x}${y}`} cx={x} cy={y} r="1.6" fill={DARK} />
      ))}

      {/* Flor de 8 pétalas */}
      {rot(8, 45).map((a) => (
        <g key={`p${a}`} transform={`rotate(${a} 50 50)`}>
          <path d="M50 23 L54.5 28 L54.5 35 L50 41 L45.5 35 L45.5 28 Z" fill={DARK} stroke={LIGHT} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M50 27 V38.5 M47.4 30.5 L50 32.5 L52.6 30.5 M47.8 34.3 L50 36 L52.2 34.3" fill="none" stroke={PAPER} strokeWidth="1.1" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="50" cy="50" r="7" fill={PAPER} />
      {[0, 45].map((a) => (
        <rect key={`q${a}`} x="45.5" y="45.5" width="9" height="9" fill="none" stroke={MID} strokeWidth="1.1" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="1.8" fill={DARK} />
    </>
  );
}

/* ---------------------------------------------------------------------------
 * C) Arabescos (matriz, linha 3 coluna 4)
 * Fundo claro com volutas finas; medalhão pequeno sobre uma estrela clara no
 * centro; flores-de-lis e margaridas que se completam nos cantos.
 * ------------------------------------------------------------------------- */
function Daisy({ cx, cy, r = 3 }: { cx: number; cy: number; r?: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {rot(6, 60).map((a) => (
        <ellipse key={a} cx="0" cy={-r} rx={r * 0.42} ry={r * 0.75} fill={DARK} transform={`rotate(${a})`} />
      ))}
      <circle r={r * 0.35} fill={PAPER} />
    </g>
  );
}

function FleurDeLis({ color }: { color: string }) {
  // Flor-de-lis apontando para cima, base em (0,0).
  return (
    <g fill={color}>
      <path d="M0 -12 C2.6 -8 2.6 -3.5 0 0 C-2.6 -3.5 -2.6 -8 0 -12 Z" />
      <path d="M0 -1 C3 -3 6.5 -4 7 -8.5 C8.8 -5 6.5 -1 1.5 0.5 Z" />
      <path d="M0 -1 C-3 -3 -6.5 -4 -7 -8.5 C-8.8 -5 -6.5 -1 -1.5 0.5 Z" />
      <rect x="-3.5" y="0.5" width="7" height="1.6" rx="0.8" />
    </g>
  );
}

// Rejunte entre azulejos + brilho do esmalte na borda de cada peça. Desenhado
// por cima do azulejo: o traço na borda é cortado ao meio, então cada lado da
// junta mostra metade e os dois vizinhos juntos formam a junta inteira.
export function TileJoint() {
  return (
    <g fill="none">
      <rect width="100" height="100" stroke="#D9D9D9" strokeWidth="3.2" />
      <rect width="100" height="100" stroke="#898788" strokeWidth="0.8" opacity="0.5" />
      <rect x="1.9" y="1.9" width="96.2" height="96.2" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.9" />
      <rect x="2.6" y="2.6" width="94.8" height="94.8" stroke="#575C60" strokeWidth="0.4" opacity="0.15" />
    </g>
  );
}

export function TileArabesco() {
  return (
    <>
      <rect width="100" height="100" fill={PAPER} />

      {/* Estrela clara e medalhão central */}
      <path d="M50 22 Q55 45 78 50 Q55 55 50 78 Q45 55 22 50 Q45 45 50 22 Z" fill={LIGHT} />
      <path d="M50 30 Q53 47 70 50 Q53 53 50 70 Q47 53 30 50 Q47 47 50 30 Z" fill={MID} opacity="0.45" />
      <circle cx="50" cy="50" r="10" fill={PAPER} stroke={DARK} strokeWidth="1.8" />
      {quarters.map((a) => (
        <path key={`h${a}`} d="M50 50 C46 47 46 42.5 50 42 C54 42.5 54 47 50 50" fill="none" stroke={DARK} strokeWidth="1.2" transform={`rotate(${a + 45} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="1.4" fill={DARK} />

      {quarters.map((a) => (
        <g key={`q${a}`} transform={`rotate(${a} 50 50)`}>
          {/* Volutas na ponta de cada braço da estrela */}
          <path d="M50 23 C45 22 42.5 17.5 45.5 15 C47.5 13.5 49.5 15.5 48 17" fill="none" stroke={DARK} strokeWidth="2" strokeLinecap="round" />
          <path d="M50 23 C55 22 57.5 17.5 54.5 15 C52.5 13.5 50.5 15.5 52 17" fill="none" stroke={DARK} strokeWidth="2" strokeLinecap="round" />

          {/* Volutas grandes em "C" no quadrante superior esquerdo */}
          <path d="M37 33 C31 35 27 31 29 27 C30.5 24.5 33.5 25.5 33 28" fill="none" stroke={DARK} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M9 34 C6 20 20 6 34 9" fill="none" stroke={DARK} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M34 9 C38.5 10 39 15 35.5 15.5" fill="none" stroke={DARK} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M9 34 C10 38.5 15 39 15.5 35.5" fill="none" stroke={DARK} strokeWidth="2.4" strokeLinecap="round" />

          {/* Flor-de-lis clara na diagonal, pontinhos rumo ao centro */}
          <g transform="translate(25 25) rotate(-45)">
            <FleurDeLis color={MID} />
          </g>
          {[33.5, 37, 40.5].map((p) => (
            <circle key={p} cx={p} cy={p} r="0.9" fill={DARK} />
          ))}

          {/* Margaridas perto da borda */}
          <Daisy cx={20} cy={4} r={2.6} />
          <Daisy cx={4} cy={20} r={2.6} />
        </g>
      ))}

      {/* Flor-de-lis escura em cada canto (forma uma flor de 4 lírios com os vizinhos) */}
      {corners.map(([x, y]) => (
        <g key={`c${x}${y}`} transform={`translate(${x} ${y})`}>
          {rot(4, 90, 45).map((a) => (
            <g key={a} transform={`rotate(${a + 180}) translate(0 -2)`}>
              <FleurDeLis color={DARK} />
            </g>
          ))}
        </g>
      ))}

      {/* Meio de cada lado: pequena flor-de-lis que encontra a do vizinho */}
      {quarters.map((a) => (
        <g key={`e${a}`} transform={`rotate(${a} 50 50) translate(50 1) rotate(180) scale(0.7)`}>
          <FleurDeLis color={INK} />
        </g>
      ))}
    </>
  );
}

/* ---------------------------------------------------------------------------
 * D) Flor simples (primeira versão usada no site)
 * Quatro pétalas em cruz, miolo e círculos nos cantos. Desenhada em 64x64 e
 * escalada para 100x100.
 * ------------------------------------------------------------------------- */
export function TileFlor() {
  return (
    <g transform="scale(1.5625)">
      <rect width="64" height="64" fill={PAPER} />
      {quarters.map((a) => (
        <ellipse key={a} cx="32" cy="18" rx="6" ry="11" fill={LIGHT} transform={`rotate(${a} 32 32)`} />
      ))}
      {rot(4, 90, 45).map((a) => (
        <path key={a} d="M32 14 l3 6 -3 3 -3 -3 Z" fill={DARK} transform={`rotate(${a} 32 32)`} />
      ))}
      <circle cx="32" cy="32" r="6" fill={DARK} />
      <circle cx="32" cy="32" r="2.5" fill={PAPER} />
      {[[0, 0], [64, 0], [0, 64], [64, 64]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="11" fill="none" stroke={DARK} strokeWidth="2.5" />
      ))}
    </g>
  );
}

// Os desenhos acima não têm rejunte; esta função cria a versão com rejunte.
export function withJoint(Tile: ComponentType): ComponentType {
  function TileWithJoint() {
    return (
      <>
        <Tile />
        <TileJoint />
      </>
    );
  }
  return TileWithJoint;
}

export const TileArabescoComRejunte = withJoint(TileArabesco);
export const TileFlorComRejunte = withJoint(TileFlor);

type Design = { id: string; name: string; source: string; Tile: ComponentType; TileComRejunte: ComponentType };

export const azulejoDesigns: Design[] = [
  { id: "flor", name: "Flor simples (em uso, com rejunte)", source: "Primeira versão usada no site", Tile: TileFlor, TileComRejunte: TileFlorComRejunte },
  { id: "arabesco", name: "Arabescos", source: "Matriz de azulejos, linha 3 coluna 4", Tile: TileArabesco, TileComRejunte: TileArabescoComRejunte },
  { id: "instituto", name: "Instituto Histórico", source: "Fachada do Instituto Histórico e Geográfico do Pará", Tile: TileInstituto, TileComRejunte: withJoint(TileInstituto) },
  { id: "octogono", name: "Octógono", source: "Matriz de azulejos, linha 1 coluna 4", Tile: TileOctogono, TileComRejunte: withJoint(TileOctogono) },
];

// Desenhos dos bichos da família (gatos e o cachorro), pensados para o rodapé.
// Cada bicho é um SVG sentado de frente; as manchas e listras são desenhadas
// "recortadas" pelo contorno do corpo (clipPath), então basta pintar por cima.
import type { ReactNode } from "react";

const INK = "#575C60";
const HALO = "#D8B44A";

// chapado: cores cheias, sem contorno.
// contorno: cores cheias com contorno escuro por fora (livro infantil).
// aquarela: cores mais suaves, traço fino por cima e mancha azul clara atrás.
export type BichoEstilo = "chapado" | "contorno" | "aquarela";

export type Bicho = {
  id: string;
  nome: string;
  label: string; // descrição (usada pelos leitores de tela)
  especie: "gato" | "cachorro";
  base: string; // cor principal do pelo
  pata: string; // cor das patinhas (usada no modo "espiando")
  olhos: string;
  traco: string; // cor dos traços do rosto (boca, bigodes)
  nariz: string;
  orelha?: string; // parte de dentro da orelha
  marcas?: ReactNode; // manchas/listras, recortadas pelo corpo
  halo?: boolean;
};

// ---------- Formas do gato (grade 0..100, cabeça em y≈38, chão em y≈108) ----------
const GATO = {
  cauda: "M72 100 C92 104 100 84 91 70 C89 67 84 68 85 72 C91 84 87 95 72 92 Z",
  corpo: "M33 50 C21 68 19 94 25 104 L75 104 C81 94 79 68 67 50 Z",
  orelhaE: "M29 28 L27 4 L47 19 Z",
  orelhaD: "M71 28 L73 4 L53 19 Z",
  dentroE: "M32 23 L31 10 L41 18 Z",
  dentroD: "M68 23 L69 10 L59 18 Z",
};

function GatoFormas() {
  return (
    <>
      <path d={GATO.cauda} />
      <path d={GATO.corpo} />
      <path d={GATO.orelhaE} />
      <path d={GATO.orelhaD} />
      <ellipse cx="50" cy="38" rx="24" ry="21" />
      <ellipse cx="40" cy="103" rx="9" ry="5.5" />
      <ellipse cx="60" cy="103" rx="9" ry="5.5" />
    </>
  );
}

// Formas soltas (sem <g>) para poderem ir dentro de <clipPath>.
function GatoSilhueta(props: React.SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <GatoFormas />
    </g>
  );
}

function GatoRosto({ b }: { b: Bicho }) {
  return (
    <g>
      {[41, 59].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="38" rx="3.6" ry="4.2" fill={b.olhos} />
          <ellipse cx={x} cy="38.3" rx="1.2" ry="3.2" fill="#1d1d20" />
          <circle cx={x + 1.1} cy="36.4" r="0.8" fill="#fff" />
        </g>
      ))}
      <path d="M47 45.5 H53 L50 49 Z" fill={b.nariz} />
      <path d="M50 49 Q47.5 52.5 45 50.5 M50 49 Q52.5 52.5 55 50.5" fill="none" stroke={b.traco} strokeWidth="1" strokeLinecap="round" />
      <path d="M38 48 L24 46 M38 51 L25 53.5 M62 48 L76 46 M62 51 L75 53.5" stroke={b.traco} strokeWidth="0.7" strokeLinecap="round" opacity="0.75" />
      <path d="M37 104.5 V108 M43 104.5 V108 M57 104.5 V108 M63 104.5 V108" stroke={b.traco} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    </g>
  );
}

// ---------- Formas do cachorro ----------
const CAO = {
  cauda: "M70 98 C88 98 96 84 93 72 C92 68 87 69 87 73 C88 84 82 91 70 91 Z",
  corpo: "M36 48 C26 64 24 92 28 104 L72 104 C76 92 74 64 64 48 Z",
  orelhaE: "M35 22 C22 20 15 40 20 52 C23 57 30 53 31 45 C32 37 34 31 37 27 Z",
  orelhaD: "M65 22 C78 20 85 40 80 52 C77 57 70 53 69 45 C68 37 66 31 63 27 Z",
};

function CaoFormas() {
  return (
    <>
      <path d={CAO.cauda} />
      <path d={CAO.corpo} />
      <ellipse cx="50" cy="36" rx="19" ry="18" />
      <path d={CAO.orelhaE} />
      <path d={CAO.orelhaD} />
      <ellipse cx="40" cy="103" rx="8.5" ry="5.5" />
      <ellipse cx="60" cy="103" rx="8.5" ry="5.5" />
    </>
  );
}

function CaoSilhueta(props: React.SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <CaoFormas />
    </g>
  );
}

function CaoRosto({ b }: { b: Bicho }) {
  return (
    <g>
      {[42, 58].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="28.5" rx="2.6" ry="1.5" fill="#F1DDB8" />
          <circle cx={x} cy="34" r="2.8" fill={b.olhos} />
          <circle cx={x + 0.9} cy="33.1" r="0.8" fill="#fff" />
        </g>
      ))}
      <ellipse cx="50" cy="46" rx="10" ry="7.5" fill="#F1DDB8" />
      <path d="M48 49.5 Q50 56 52 49.5 Z" fill="#E48A8A" />
      <ellipse cx="50" cy="42.5" rx="3.8" ry="2.7" fill={b.nariz} />
      <path d="M50 45 V48.5 M50 48.5 Q47 51.5 44.5 49.5 M50 48.5 Q53 51.5 55.5 49.5" fill="none" stroke={b.traco} strokeWidth="1" strokeLinecap="round" />
      <path d="M50 92 V104" stroke={b.traco} strokeWidth="0.8" opacity="0.5" />
      <path d="M37 104.5 V108 M43 104.5 V108 M57 104.5 V108 M63 104.5 V108" stroke={b.traco} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    </g>
  );
}

// Listras de gato tigrado (testa em "M", bochechas, corpo e anéis na cauda).
function Listras({ cor, so = "tudo" }: { cor: string; so?: "tudo" | "cabeca" }) {
  return (
    <g stroke={cor} strokeWidth="2.6" strokeLinecap="round" fill="none">
      <path d="M43 20 L45.5 29 M50 18 V29 M57 20 L54.5 29" />
      <path d="M26 38 H34 M26.5 44 H34.5 M66 38 H74 M65.5 44 H73.5" />
      {so === "tudo" && (
        <>
          <path d="M29 64 Q38 68 36 77 M71 64 Q62 68 64 77 M25 82 Q35 86 33 95 M75 82 Q65 86 67 95" />
          <path d="M85 74 L94 72 M87 84 L97 84 M80 94 L88 99" />
        </>
      )}
    </g>
  );
}

// ---------- A família (em ordem de idade) ----------
const PRETO = "#2A2A2E";
const BRANCO = "#F7F4EE";

export const familia: Bicho[] = [
  {
    id: "tricolor",
    nome: "Lolla",
    label: "Gata tricolor",
    especie: "gato",
    base: BRANCO,
    pata: BRANCO,
    olhos: "#C9A93E",
    traco: INK,
    nariz: "#D98F8F",
    orelha: "#E8B4B0",
    marcas: (
      <>
        <path d="M18 -2 H49 V27 C40 31 30 38 18 44 Z" fill="#E0904A" />
        <path d="M55 -2 H82 V36 C72 31 63 26 55 18 Z" fill={PRETO} />
        <ellipse cx="33" cy="80" rx="12" ry="15" fill="#E0904A" />
        <ellipse cx="68" cy="70" rx="10" ry="12" fill={PRETO} />
        <ellipse cx="93" cy="80" rx="9" ry="14" fill={PRETO} />
        <ellipse cx="78" cy="97" rx="7" ry="6" fill="#E0904A" />
      </>
    ),
  },
  {
    id: "frajola-1",
    nome: "Elise",
    label: "Gata frajola",
    especie: "gato",
    base: PRETO,
    pata: BRANCO,
    olhos: "#B9C95A",
    traco: "#9A9AA0",
    nariz: "#D98F8F",
    orelha: "#5A4448",
    marcas: (
      <>
        <path d="M50 30 C45 38 37 43 38 53 C42 60 58 60 62 53 C63 43 55 38 50 30 Z" fill={BRANCO} />
        <ellipse cx="50" cy="78" rx="12" ry="22" fill={BRANCO} />
        <ellipse cx="40" cy="103" rx="9" ry="5.5" fill={BRANCO} />
        <ellipse cx="60" cy="103" rx="9" ry="5.5" fill={BRANCO} />
      </>
    ),
  },
  {
    id: "preta-1",
    nome: "Jade",
    label: "Gata preta",
    especie: "gato",
    base: PRETO,
    pata: PRETO,
    olhos: "#E2B842",
    traco: "#8E8E94",
    nariz: "#4A3E40",
    orelha: "#4A3A3E",
  },
  {
    id: "frajola-2",
    nome: "Bartô",
    label: "Gato frajola",
    especie: "gato",
    base: PRETO,
    pata: BRANCO,
    olhos: "#8FBF5A",
    traco: "#9A9AA0",
    nariz: "#D98F8F",
    orelha: "#5A4448",
    marcas: (
      <>
        <path d="M20 43 C30 41 40 40 50 40 C60 40 70 41 80 43 V70 H20 Z" fill={BRANCO} />
        <path d="M34 60 C30 76 30 92 34 104 H66 C70 92 70 76 66 60 Z" fill={BRANCO} />
        <ellipse cx="40" cy="103" rx="9" ry="5.5" fill={BRANCO} />
        <ellipse cx="60" cy="103" rx="9" ry="5.5" fill={BRANCO} />
        <ellipse cx="91" cy="72" rx="6" ry="5" fill={BRANCO} />
      </>
    ),
  },
  {
    id: "preta-2",
    nome: "Mia",
    label: "Gata preta",
    especie: "gato",
    base: PRETO,
    pata: PRETO,
    olhos: "#9CC65E",
    traco: "#8E8E94",
    nariz: "#4A3E40",
    orelha: "#4A3A3E",
  },
  {
    id: "tigrada",
    nome: "Maya",
    label: "Gata tigrada",
    especie: "gato",
    base: "#A27E58",
    pata: "#A27E58",
    olhos: "#B9C95A",
    traco: "#4E3A27",
    nariz: "#C97C72",
    orelha: "#D9A79A",
    marcas: (
      <>
        <Listras cor="#5C432C" />
        <ellipse cx="50" cy="49" rx="11" ry="7" fill="#E9DCC8" />
        <ellipse cx="50" cy="80" rx="9" ry="16" fill="#C9AE8C" />
      </>
    ),
  },
  {
    id: "siamesa",
    nome: "Pompom",
    label: "Gata siamesa",
    especie: "gato",
    base: "#F0E6D4",
    pata: "#5A463A",
    olhos: "#6FA8DC",
    traco: "#3A2C26",
    nariz: "#3A2C26",
    halo: true,
    marcas: (
      <>
        <ellipse cx="50" cy="45" rx="14" ry="12" fill="#5A463A" opacity="0.9" />
        <ellipse cx="50" cy="44" rx="18" ry="16" fill="#5A463A" opacity="0.25" />
        <path d={GATO.orelhaE} fill="#5A463A" />
        <path d={GATO.orelhaD} fill="#5A463A" />
        <ellipse cx="40" cy="103" rx="9" ry="5.5" fill="#5A463A" />
        <ellipse cx="60" cy="103" rx="9" ry="5.5" fill="#5A463A" />
        <path d={GATO.cauda} fill="#5A463A" />
      </>
    ),
  },
  {
    id: "tigrada-cinza",
    nome: "Masha",
    label: "Gata tigrada cinza",
    especie: "gato",
    base: "#9A9DA3",
    pata: "#9A9DA3",
    olhos: "#D8B850",
    traco: "#3E4046",
    nariz: "#C98A8A",
    orelha: "#D9AFAF",
    marcas: (
      <>
        <Listras cor="#55585E" />
        <ellipse cx="50" cy="49" rx="11" ry="7" fill="#DCDDE0" />
        <ellipse cx="50" cy="80" rx="9" ry="16" fill="#C2C4C8" />
      </>
    ),
  },
  {
    id: "tigrada-branca",
    nome: "Romena",
    label: "Gata tigrada branca",
    especie: "gato",
    base: BRANCO,
    pata: BRANCO,
    olhos: "#8FBF5A",
    traco: INK,
    nariz: "#D98F8F",
    orelha: "#E8B4B0",
    marcas: (
      <>
        <path d="M18 -2 H82 V33 C70 28 60 27 50 27 C40 27 30 28 18 33 Z" fill="#BDB6AA" />
        <ellipse cx="72" cy="72" rx="9" ry="13" fill="#BDB6AA" />
        <path d="M84 66 H100 V110 H80 Z" fill="#BDB6AA" />
        <Listras cor="#8A8378" so="cabeca" />
        <path d="M68 62 L76 64 M66 72 L77 73 M68 82 L76 81 M85 74 L94 72 M87 84 L97 84 M80 94 L88 99" stroke="#8A8378" strokeWidth="2.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: "laranja",
    nome: "Laranja",
    label: "Gato laranja",
    especie: "gato",
    base: "#E39A4F",
    pata: "#E39A4F",
    olhos: "#B9C95A",
    traco: "#7A4317",
    nariz: "#D9857A",
    orelha: "#F2B8A8",
    marcas: (
      <>
        <Listras cor="#B8692A" />
        <ellipse cx="50" cy="49" rx="11" ry="7" fill="#F6D7AE" />
        <ellipse cx="50" cy="80" rx="9" ry="16" fill="#F2C48E" />
      </>
    ),
  },
  {
    id: "viralata",
    nome: "Yoshi",
    label: "Cachorro vira-lata",
    especie: "cachorro",
    base: "#C98A4B",
    pata: "#F1DDB8",
    olhos: "#2A2422",
    traco: "#5A3A20",
    nariz: "#2A2422",
    halo: true,
    marcas: (
      <>
        <path d={CAO.orelhaE} fill="#A0652F" />
        <path d={CAO.orelhaD} fill="#A0652F" />
        <ellipse cx="50" cy="72" rx="9" ry="17" fill="#F1DDB8" />
        <ellipse cx="40" cy="103" rx="8.5" ry="5.5" fill="#F1DDB8" />
        <ellipse cx="60" cy="103" rx="8.5" ry="5.5" fill="#F1DDB8" />
      </>
    ),
  },
];

function Halo() {
  return (
    <g fill="none">
      <ellipse cx="50" cy="-6" rx="16" ry="4.5" stroke="#F3E3A6" strokeWidth="6" opacity="0.55" />
      <ellipse cx="50" cy="-6" rx="16" ry="4.5" stroke={HALO} strokeWidth="2.4" />
    </g>
  );
}

type Props = {
  bicho: Bicho;
  uid: string; // id único na página (para o clipPath)
  estilo?: BichoEstilo;
  espiando?: boolean; // só cabeça e patinhas, para apoiar numa borda
  className?: string;
  style?: React.CSSProperties;
};

export function BichoDesenho({ bicho: b, uid, estilo = "chapado", espiando = false, className, style }: Props) {
  const Silhueta = b.especie === "gato" ? GatoSilhueta : CaoSilhueta;
  const Formas = b.especie === "gato" ? GatoFormas : CaoFormas;
  const Rosto = b.especie === "gato" ? GatoRosto : CaoRosto;
  const clip = `${uid}-corpo`;
  const corte = `${uid}-corte`;
  const viewBox = espiando ? "0 -16 100 80" : "0 -16 100 126";
  const suave = estilo === "aquarela";

  return (
    <svg viewBox={viewBox} className={className} style={style} role="img" aria-label={`${b.nome}, ${b.label.toLowerCase()}${b.halo ? " (com auréola)" : ""}`}>
      <defs>
        <clipPath id={clip}>
          <Formas />
        </clipPath>
        <clipPath id={corte}>
          <rect x="-10" y="-20" width="120" height="78" />
        </clipPath>
      </defs>

      {suave && !espiando && <ellipse cx="52" cy="62" rx="46" ry="46" fill="#BFDDF3" opacity="0.4" />}
      {suave && espiando && <ellipse cx="50" cy="36" rx="40" ry="30" fill="#BFDDF3" opacity="0.4" />}

      <g clipPath={espiando ? `url(#${corte})` : undefined}>
        {estilo === "contorno" && <Silhueta fill={INK} stroke={INK} strokeWidth="3.4" strokeLinejoin="round" />}
        <g opacity={suave ? 0.8 : 1}>
          <Silhueta fill={b.base} />
          <g clipPath={`url(#${clip})`}>{b.marcas}</g>
          {b.orelha && (
            <g fill={b.orelha} opacity="0.85">
              <path d={GATO.dentroE} />
              <path d={GATO.dentroD} />
            </g>
          )}
        </g>
        {suave && <Silhueta fill="none" stroke={INK} strokeWidth="1" strokeLinejoin="round" />}
        <Rosto b={b} />
      </g>

      {espiando && (
        <g>
          {[36, 64].map((x) => (
            <g key={x}>
              {estilo === "contorno" && <ellipse cx={x} cy="58" rx="9" ry="5.5" fill={INK} stroke={INK} strokeWidth="3.4" />}
              <ellipse
                cx={x}
                cy="58"
                rx="9"
                ry="5.5"
                fill={b.pata}
                opacity={suave ? 0.85 : 1}
                stroke={suave ? INK : "none"}
                strokeWidth="1"
              />
              <path d={`M${x - 3} 59.5 V63 M${x + 3} 59.5 V63`} stroke={b.traco} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
            </g>
          ))}
        </g>
      )}

      {b.halo && <Halo />}
    </svg>
  );
}

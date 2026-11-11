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
  extra?: ReactNode; // detalhes desenhados por cima do rosto (ex.: mancha no nariz)
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
// `so` limita onde elas aparecem; `largura` e `opacidade` deixam mais suaves.
function Listras({
  cor,
  so = "tudo",
  largura = 2.6,
  opacidade = 1,
}: {
  cor: string;
  so?: "tudo" | "cabeca" | "cabeca-rabo";
  largura?: number;
  opacidade?: number;
}) {
  return (
    <g stroke={cor} strokeWidth={largura} strokeLinecap="round" fill="none" opacity={opacidade}>
      <path d="M43 20 L45.5 29 M50 18 V29 M57 20 L54.5 29" />
      <path d="M26 38 H34 M26.5 44 H34.5 M66 38 H74 M65.5 44 H73.5" />
      {so !== "cabeca" && <path d="M85 74 L94 72 M87 84 L97 84 M80 94 L88 99" />}
      {so === "tudo" && <path d="M29 64 Q38 68 36 77 M71 64 Q62 68 64 77 M25 82 Q35 86 33 95 M75 82 Q65 86 67 95" />}
    </g>
  );
}

// Peito, queixo e patinhas brancos (Maya, Masha).
function PeitoBranco({ cor = BRANCO }: { cor?: string }) {
  return (
    <g fill={cor}>
      <ellipse cx="50" cy="52" rx="10" ry="6.5" />
      <path d="M38 55 C35 70 40 86 50 93 C60 86 65 70 62 55 Z" />
      <ellipse cx="40" cy="103" rx="9" ry="5.5" />
      <ellipse cx="60" cy="103" rx="9" ry="5.5" />
    </g>
  );
}

// ---------- A família (em ordem de idade) ----------
// Desenhos feitos a partir das fotos, vistos de frente (esquerda/direita
// são as de quem olha a foto).
const PRETO = "#2A2A2E";
const BRANCO = "#F7F4EE";
// Maya e Masha têm a mesma cor; só a nitidez das listras muda.
const TIGRADA = { pelo: "#A1968A", rosto: "#C9AC92", listra: "#3A3632" };

export const familia: Bicho[] = [
  {
    // Rosto branco; orelha esquerda laranja; faixa preta no alto da cabeça
    // descendo pelo lado direito; laranja acima do olho direito; mancha preta
    // no nariz e boca ("bigodinho") e pinta laranja na bochecha.
    id: "tricolor",
    nome: "Lolla",
    label: "Gata tricolor",
    especie: "gato",
    base: BRANCO,
    pata: BRANCO,
    olhos: "#C9C46E",
    traco: INK,
    nariz: PRETO,
    orelha: "#E8B4B0",
    marcas: (
      <>
        <path d="M18 -2 H37 L41 20 C34 22 28 26 24 32 L18 32 Z" fill="#DE9B5A" />
        <path d="M33 26 C38 20 46 17 52 17 L52 -2 H82 V50 C76 48 70 44 67 38 C66 33 63 29 58 27 C52 26 47 27 44 30 C40 31 36 30 33 26 Z" fill={PRETO} />
        <ellipse cx="57.5" cy="31" rx="6.5" ry="4.5" fill="#DE9B5A" />
        <path d="M44.5 45 C47 42.5 53 42.5 55.5 45 C56.5 49.5 53 52.5 50 51.5 C47 52.5 43.5 49.5 44.5 45 Z" fill={PRETO} />
        <ellipse cx="57.5" cy="50.5" rx="4.5" ry="3.5" fill="#DE9B5A" />
        <ellipse cx="70" cy="49" rx="2.6" ry="3.4" fill="#DE9B5A" />
        <ellipse cx="31" cy="80" rx="11" ry="15" fill="#DE9B5A" />
        <ellipse cx="69" cy="70" rx="10" ry="13" fill={PRETO} />
        <ellipse cx="93" cy="80" rx="9" ry="14" fill={PRETO} />
        <ellipse cx="78" cy="97" rx="7" ry="6" fill="#DE9B5A" />
      </>
    ),
  },
  {
    // Frajola: listra branca fina subindo pela testa, focinho e peito
    // brancos, nariz todo rosa.
    id: "frajola-1",
    nome: "Elise",
    label: "Gata frajola",
    especie: "gato",
    base: PRETO,
    pata: BRANCO,
    olhos: "#C9D46A",
    traco: "#9A9AA0",
    nariz: "#E8A0A8",
    orelha: "#5A4448",
    marcas: (
      <>
        <path d="M48.8 19 C48.4 27 47.5 33 44.5 39 C38 43 36 50 38 56 C42 61 58 61 62 56 C64 50 62 43 55.5 39 C52.5 33 51.6 27 51.2 19 Z" fill={BRANCO} />
        <ellipse cx="50" cy="78" rx="13" ry="23" fill={BRANCO} />
        <ellipse cx="40" cy="103" rx="9" ry="5.5" fill={BRANCO} />
        <ellipse cx="60" cy="103" rx="9" ry="5.5" fill={BRANCO} />
      </>
    ),
  },
  {
    // Toda preta, olhos verdes.
    id: "preta-1",
    nome: "Jade",
    label: "Gata preta",
    especie: "gato",
    base: PRETO,
    pata: PRETO,
    olhos: "#8FC45A",
    traco: "#8E8E94",
    nariz: "#3E3436",
    orelha: "#4A3A3E",
  },
  {
    // Frajola como a Elise, mas com uma mancha preta no nariz.
    id: "frajola-2",
    nome: "Bartô",
    label: "Gato frajola",
    especie: "gato",
    base: PRETO,
    pata: BRANCO,
    olhos: "#C6D29A",
    traco: "#9A9AA0",
    nariz: "#E8A0A8",
    orelha: "#5A4448",
    marcas: (
      <>
        <path d="M48.6 22 C48.2 29 47 34 43.5 39.5 C37 43 35 50 37 56 C41 62 59 62 63 56 C65 50 63 43 56.5 39.5 C53 34 51.8 29 51.4 22 Z" fill={BRANCO} />
        <path d="M36 58 C40 53 60 53 64 58 C70 76 70 92 66 104 H34 C30 92 30 76 36 58 Z" fill={BRANCO} />
        <ellipse cx="40" cy="103" rx="9" ry="5.5" fill={BRANCO} />
        <ellipse cx="60" cy="103" rx="9" ry="5.5" fill={BRANCO} />
      </>
    ),
    // Nariz rosa com uma mancha preta no meio, escorrendo até a boca.
    extra: <path d="M48 46.6 C48.8 45.9 50.9 46 51.3 47 L50.3 50.4 C49.4 50 48.2 48.5 48 46.6 Z" fill={PRETO} />,
  },
  {
    // Preta com uma pintinha branca no peito e olhos amarelos.
    id: "preta-2",
    nome: "Mia",
    label: "Gata preta",
    especie: "gato",
    base: PRETO,
    pata: PRETO,
    olhos: "#E6C23A",
    traco: "#8E8E94",
    nariz: "#3E3436",
    orelha: "#4A3A3E",
    marcas: <path d="M48.3 61 L50 57.5 L51.7 61 L50 65.5 Z" fill={BRANCO} />,
  },
  {
    // Tigrada com as listras quase apagadas; peito, queixo e patas brancos;
    // olhos verde-claros.
    id: "tigrada",
    nome: "Maya",
    label: "Gata tigrada",
    especie: "gato",
    base: TIGRADA.pelo,
    pata: BRANCO,
    olhos: "#D2E2B8",
    traco: "#2F2C29",
    nariz: "#D88E8A",
    orelha: "#D9A79A",
    marcas: (
      <>
        <ellipse cx="50" cy="42" rx="17" ry="12" fill={TIGRADA.rosto} opacity="0.45" />
        <Listras cor={TIGRADA.listra} largura={2.4} opacidade={0.3} />
        <PeitoBranco />
      </>
    ),
  },
  {
    // Siamesa: corpo bege, máscara, orelhas, patas e rabo marrom-escuros.
    id: "siamesa",
    nome: "Pompom",
    label: "Gata siamesa",
    especie: "gato",
    base: "#EBDDC6",
    pata: "#4A372C",
    olhos: "#7FB2E5",
    traco: "#2E241E",
    nariz: "#2E241E",
    halo: true,
    marcas: (
      <>
        <ellipse cx="50" cy="66" rx="30" ry="14" fill="#D9C3A2" opacity="0.6" />
        <ellipse cx="50" cy="44" rx="18" ry="16" fill="#4A372C" opacity="0.3" />
        <ellipse cx="50" cy="45" rx="14" ry="12" fill="#4A372C" opacity="0.9" />
        <path d={GATO.orelhaE} fill="#4A372C" />
        <path d={GATO.orelhaD} fill="#4A372C" />
        <ellipse cx="40" cy="103" rx="9" ry="5.5" fill="#4A372C" />
        <ellipse cx="60" cy="103" rx="9" ry="5.5" fill="#4A372C" />
        <path d={GATO.cauda} fill="#4A372C" />
      </>
    ),
  },
  {
    // Mesma cor da Maya, mas com as listras bem nítidas; peito, queixo e
    // patas brancos; olhos cor de mel.
    id: "tigrada-cinza",
    nome: "Masha",
    label: "Gata tigrada cinza",
    especie: "gato",
    base: TIGRADA.pelo,
    pata: BRANCO,
    olhos: "#B99C48",
    traco: "#2F2C29",
    nariz: "#C98A80",
    orelha: "#E3B0AA",
    marcas: (
      <>
        <ellipse cx="50" cy="42" rx="17" ry="12" fill={TIGRADA.rosto} opacity="0.45" />
        <Listras cor={TIGRADA.listra} largura={2.8} />
        <PeitoBranco />
      </>
    ),
  },
  {
    // Siamesa de pontas tigradas: corpo creme, máscara e orelhas
    // bege-acinzentadas com listrinhas, rabo listrado, olhos azuis.
    id: "tigrada-branca",
    nome: "Romena",
    label: "Gata siamesa de pontas tigradas",
    especie: "gato",
    base: "#F4EFE7",
    pata: "#F4EFE7",
    olhos: "#8DB3DE",
    traco: "#6E6256",
    nariz: "#E0A0A0",
    orelha: "#E8C2BC",
    marcas: (
      <>
        <path d={GATO.orelhaE} fill="#C7B49E" />
        <path d={GATO.orelhaD} fill="#C7B49E" />
        <ellipse cx="50" cy="47" rx="10" ry="7.5" fill="#CDB89E" opacity="0.85" />
        <path d={GATO.cauda} fill="#D3C3AE" />
        <Listras cor="#A08D79" so="cabeca-rabo" largura={1.8} />
        <path d="M37 35.5 L31 33.5 M63 35.5 L69 33.5" stroke="#A08D79" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    // Laranja com listras suaves, focinho e queixo clarinhos, olhos verde-claros.
    id: "laranja",
    nome: "Laranja",
    label: "Gato laranja",
    especie: "gato",
    base: "#E5A260",
    pata: "#E5A260",
    olhos: "#C8D9A0",
    traco: "#7A4317",
    nariz: "#E39C8E",
    orelha: "#F2B8A8",
    marcas: (
      <>
        <Listras cor="#C47A3A" largura={2.2} />
        <ellipse cx="50" cy="50" rx="11" ry="7" fill="#F6DDB8" />
        <ellipse cx="50" cy="80" rx="9" ry="16" fill="#F2CFA0" />
      </>
    ),
  },
  {
    // Ainda sem fotos: vira-lata caramelo provisório.
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
        {b.extra}
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

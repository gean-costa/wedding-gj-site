// Página TEMPORÁRIA (não publicar): estilos de ilustração de Belém e formas de
// distribuí-las na página de confirmação de presença.
import type { Metadata } from "next";
import {
  BarcoRegional,
  BasilicaNazare,
  EstacaoDasDocas,
  GarcaEmPe,
  GarcaVoando,
  CasaOnzeJanelas,
  FortePresepio,
  RelogioVerOPeso,
  SeloPostal,
  TheatroDaPaz,
  UrubuPousado,
  UrubuVoando,
  VerOPeso,
  type IlustracaoVariant,
} from "@/components/BelemIlustracoes";

export const metadata: Metadata = { title: "Ilustrações de Belém" };

const variants: { id: IlustracaoVariant; name: string; note: string }[] = [
  { id: "linha", name: "A. Traço fino", note: "Linhas em #667588, sem preenchimento, como uma gravura ou um caderno de viagem." },
  { id: "silhueta", name: "B. Silhuetas chapadas", note: "Formas cheias em #575C60, #667588 e #98AEC3, com janelas e arcos vazados, como recortes de papel." },
  { id: "aquarela", name: "C. Traço + mancha de cor", note: "O traço fino com uma mancha clara (#BFDDF3) por trás, lembrando aquarela." },
];

const landmarks = [
  { name: "Ver-o-Peso (Mercado de Ferro)", C: VerOPeso, w: "w-64" },
  { name: "Theatro da Paz", C: TheatroDaPaz, w: "w-64" },
  { name: "Basílica de Nazaré", C: BasilicaNazare, w: "w-40" },
  { name: "Estação das Docas", C: EstacaoDasDocas, w: "w-60" },
  { name: "Relógio (Praça do Relógio)", C: RelogioVerOPeso, w: "w-16" },
  { name: "Forte do Presépio", C: FortePresepio, w: "w-60" },
  { name: "Casa das Onze Janelas", C: CasaOnzeJanelas, w: "w-64" },
];

const extras = [
  { name: "Garça em pé", C: GarcaEmPe, w: "w-14" },
  { name: "Garça voando", C: GarcaVoando, w: "w-28" },
  { name: "Urubu pousado", C: UrubuPousado, w: "w-12" },
  { name: "Urubu voando", C: UrubuVoando, w: "w-32" },
  { name: "Barco regional (opcional)", C: BarcoRegional, w: "w-36" },
];

// Selos do estilo D: cada um com a ilustração e a legenda.
const selos = [
  { title: "Mercado de Ferro", C: VerOPeso, w: "w-56", rotate: -2 },
  { title: "Theatro da Paz", C: TheatroDaPaz, w: "w-56", rotate: 1.5 },
  { title: "Basílica de Nazaré", C: BasilicaNazare, w: "w-32", rotate: -1 },
  { title: "Estação das Docas", C: EstacaoDasDocas, w: "w-52", rotate: 2 },
  { title: "Praça do Relógio", C: RelogioVerOPeso, w: "w-16", rotate: -1.5 },
  { title: "Forte do Presépio", C: FortePresepio, w: "w-52", rotate: 1 },
  { title: "Casa das Onze Janelas", C: CasaOnzeJanelas, w: "w-56", rotate: -2 },
];

export default function IlustracoesPage() {
  return (
    <main className="flex-1 bg-paper">
      <header className="border-b border-mist px-4 py-4 text-center">
        <p className="font-medium">Ilustrações de Belém para a confirmação de presença (página temporária)</p>
        <p className="text-sm text-stone">Parte 1: estilos. Parte 2: formas de distribuir pela página.</p>
      </header>

      <h2 className="bg-ink px-4 py-2 text-center text-sm font-semibold text-white">Parte 1 · Estilos de ilustração</h2>
      {variants.map((v) => (
        <section key={v.id} className="border-b border-mist px-4 py-10">
          <p className="text-center font-semibold">{v.name}</p>
          <p className="mx-auto mb-8 max-w-xl text-center text-sm text-stone">{v.note}</p>
          <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-center gap-x-8 gap-y-6">
            {landmarks.map(({ name, C, w }) => (
              <figure key={name} className="flex flex-col items-center gap-2">
                <C variant={v.id} className={w} />
                <figcaption className="text-xs text-stone">{name}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-end justify-center gap-x-10 gap-y-6">
            {extras.map(({ name, C, w }) => (
              <figure key={name} className="flex flex-col items-center gap-2">
                <C variant={v.id} className={w} />
                <figcaption className="text-xs text-stone">{name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      <section className="border-b border-mist px-4 py-10">
        <p className="text-center font-semibold">D. Selo postal</p>
        <p className="mx-auto mb-8 max-w-xl text-center text-sm text-stone">
          Inspirado no selo dos Correios do Theatro da Paz (1978): borda picotada, cores chapadas claras com traço fino
          escuro, faixa com o local e o valor, e legenda embaixo.
        </p>
        <div className="mx-auto flex max-w-6xl flex-wrap items-stretch justify-center gap-8">
          {selos.map(({ title, C, w, rotate }) => (
            <SeloPostal key={title} title={title} rotate={rotate}>
              <C variant="selo" className={w} />
            </SeloPostal>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-end justify-center gap-x-10 gap-y-6">
          {extras.map(({ name, C, w }) => (
            <figure key={name} className="flex flex-col items-center gap-2">
              <C variant="selo" className={w} />
              <figcaption className="text-xs text-stone">{name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <h2 className="bg-ink px-4 py-2 text-center text-sm font-semibold text-white">
        Parte 2 · Distribuição na página (miniaturas; 1 a 3 em traço fino, 4 com selos)
      </h2>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-2 xl:grid-cols-4">
        <Layout name="1. Paisagem + pássaros" note="Horizonte com os pontos turísticos na beira do rio, no rodapé; garças e urubus voando pela página e pousados perto do formulário.">
          <GarcaVoando className="absolute left-5 top-14 w-16" />
          <UrubuVoando className="absolute right-5 top-20 w-20" />
          <GarcaVoando className="absolute right-3 top-[44%] w-11" />
          <UrubuPousado className="absolute left-5 top-[56%] w-7" />
          <GarcaEmPe className="absolute right-5 top-[58%] w-9" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-0.5 px-1">
            <BasilicaNazare className="w-10" />
            <TheatroDaPaz className="w-[4.5rem]" />
            <RelogioVerOPeso className="w-4" />
            <VerOPeso className="w-[4.5rem]" />
            <EstacaoDasDocas className="w-16" />
          </div>
        </Layout>

        <Layout name="2. Um ponto por seção" note="Cada parte da página tem a sua ilustração ao lado; os pássaros fazem a ligação entre elas.">
          <VerOPeso className="absolute left-4 top-12 w-28" />
          <UrubuVoando className="absolute right-5 top-16 w-16" />
          <TheatroDaPaz className="absolute left-0.5 top-[44%] w-16" />
          <GarcaVoando className="absolute right-2 top-[38%] w-14" />
          <BasilicaNazare className="absolute right-1 top-[56%] w-14" />
          <GarcaEmPe className="absolute bottom-5 left-8 w-9" />
          <EstacaoDasDocas className="absolute bottom-2 right-6 w-28" />
        </Layout>

        <Layout name="3. Moldura de cartão-postal" note="As ilustrações contornam o formulário pelas bordas, como a moldura de um cartão-postal de Belém." framed>
          <VerOPeso className="absolute left-2 top-11 w-28" />
          <TheatroDaPaz className="absolute right-2 top-11 w-28" />
          <RelogioVerOPeso className="absolute left-4 top-[40%] w-6" />
          <UrubuPousado className="absolute right-4 top-[46%] w-8" />
          <BasilicaNazare className="absolute bottom-2 left-3 w-16" />
          <GarcaEmPe className="absolute bottom-3 left-[40%] w-8" />
          <EstacaoDasDocas className="absolute bottom-2 right-2 w-24" />
        </Layout>

        <Layout name="4. Carta selada" note="O formulário vira uma carta: selos de Belém no canto, carimbo do correio com a data do casamento e garças e urubus em volta." letter>
          <div className="absolute right-4 top-[33%] z-20 flex scale-[0.28] origin-top-right gap-2">
            <SeloPostal title="Mercado de Ferro" rotate={-4}>
              <VerOPeso variant="selo" className="w-48" />
            </SeloPostal>
            <SeloPostal title="Theatro da Paz" rotate={3}>
              <TheatroDaPaz variant="selo" className="w-48" />
            </SeloPostal>
          </div>
          <Carimbo className="absolute right-[5.5rem] top-[38%] z-30 w-14" />
          <GarcaVoando className="absolute left-5 top-14 w-16" />
          <UrubuVoando className="absolute right-6 top-16 w-20" />
          <UrubuPousado className="absolute left-4 top-[62%] w-7" />
          <div className="absolute bottom-3 left-3 z-20 scale-[0.38] origin-bottom-left">
            <SeloPostal title="Basílica de Nazaré" rotate={-3}>
              <BasilicaNazare variant="selo" className="w-32" />
            </SeloPostal>
          </div>
          <div className="absolute bottom-3 right-3 z-20 scale-[0.38] origin-bottom-right">
            <SeloPostal title="Estação das Docas" rotate={4}>
              <EstacaoDasDocas variant="selo" className="w-48" />
            </SeloPostal>
          </div>
          <GarcaEmPe className="absolute bottom-6 left-[46%] w-8" />
        </Layout>
      </div>
    </main>
  );
}

// Carimbo do correio: círculo duplo com a cidade e a data, e linhas onduladas.
function Carimbo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" className={className} aria-hidden>
      <g fill="none" stroke="#575C60" strokeWidth="1.4" opacity="0.75">
        <circle cx="35" cy="35" r="30" />
        <circle cx="35" cy="35" r="22" />
        <path d="M66 20 q8 -5 16 0 t16 0 t16 0 M66 30 q8 -5 16 0 t16 0 t16 0 M66 40 q8 -5 16 0 t16 0 t16 0 M66 50 q8 -5 16 0 t16 0 t16 0" />
      </g>
      <text x="35" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#575C60" opacity="0.8">BELÉM</text>
      <text x="35" y="43" textAnchor="middle" fontSize="7" fill="#575C60" opacity="0.8">13 NOV 2027</text>
    </svg>
  );
}

// Miniatura da página de confirmação: menu, título e o cartão do formulário.
// `letter` desenha o cartão como uma carta de correio aéreo (borda listrada).
function Layout({
  name,
  note,
  framed = false,
  letter = false,
  children,
}: {
  name: string;
  note: string;
  framed?: boolean;
  letter?: boolean;
  children: React.ReactNode;
}) {
  const airmail = {
    backgroundImage: "repeating-linear-gradient(135deg, #667588 0 8px, #ffffff 8px 16px, #98AEC3 16px 24px, #ffffff 24px 32px)",
  };
  return (
    <figure className="flex flex-col items-center gap-3">
      <div className="relative h-[600px] w-full max-w-[360px] overflow-hidden rounded-md border border-mist bg-paper shadow-md">
        <div className="h-8 border-b border-mist bg-white/70" />
        <p className="mt-24 text-center font-serif text-xl">Confirmação de presença</p>
        <div className={`relative z-10 mx-auto mt-6 w-[62%] rounded-lg ${letter ? "p-1.5" : ""}`} style={letter ? airmail : undefined}>
          <div className={`flex flex-col gap-2 rounded-md border border-mist bg-white p-3 ${framed ? "ring-4 ring-paper" : ""}`}>
            {["w-1/2", "w-full", "w-3/4", "w-full", "w-2/3"].map((w, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="h-1.5 w-1/3 rounded bg-mist" />
                <span className={`h-5 rounded border border-mist ${w}`} />
              </div>
            ))}
            <span className="mt-1 h-6 rounded-full bg-primary" />
          </div>
        </div>
        {children}
      </div>
      <figcaption className="max-w-[360px] text-center">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-stone">{note}</p>
      </figcaption>
    </figure>
  );
}

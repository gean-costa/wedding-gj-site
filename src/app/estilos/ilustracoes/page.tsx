// Página TEMPORÁRIA (não publicar): estilos de ilustração de Belém e formas de
// distribuí-las na página de confirmação de presença.
import type { Metadata } from "next";
import {
  BasilicaNazare,
  FarolBelem,
  GarcaEmPe,
  GarcaVoando,
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
  { name: "Ver-o-Peso", C: VerOPeso, w: "w-56" },
  { name: "Theatro da Paz", C: TheatroDaPaz, w: "w-56" },
  { name: "Basílica de Nazaré", C: BasilicaNazare, w: "w-40" },
  { name: "Farol (Mangal das Garças)", C: FarolBelem, w: "w-16" },
];

const birds = [
  { name: "Garça em pé", C: GarcaEmPe, w: "w-14" },
  { name: "Garça voando", C: GarcaVoando, w: "w-28" },
  { name: "Urubu pousado", C: UrubuPousado, w: "w-12" },
  { name: "Urubu voando", C: UrubuVoando, w: "w-32" },
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
            {birds.map(({ name, C, w }) => (
              <figure key={name} className="flex flex-col items-center gap-2">
                <C variant={v.id} className={w} />
                <figcaption className="text-xs text-stone">{name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      <h2 className="bg-ink px-4 py-2 text-center text-sm font-semibold text-white">
        Parte 2 · Distribuição na página (miniaturas, no estilo traço fino)
      </h2>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-3">
        <Layout name="1. Paisagem + pássaros" note="Horizonte com os pontos turísticos na beira do rio, no rodapé; garças e urubus voando pela página e pousados perto do formulário.">
          <GarcaVoando className="absolute left-5 top-14 w-16" />
          <UrubuVoando className="absolute right-5 top-20 w-20" />
          <GarcaVoando className="absolute right-3 top-[44%] w-11" />
          <UrubuPousado className="absolute left-5 top-[56%] w-7" />
          <GarcaEmPe className="absolute right-5 top-[58%] w-9" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 px-2">
            <BasilicaNazare className="w-16" />
            <TheatroDaPaz className="w-24" />
            <FarolBelem className="w-6" />
            <VerOPeso className="w-24" />
          </div>
        </Layout>

        <Layout name="2. Um ponto por seção" note="Cada parte da página tem a sua ilustração ao lado; os pássaros fazem a ligação entre elas.">
          <VerOPeso className="absolute left-4 top-12 w-28" />
          <UrubuVoando className="absolute right-5 top-16 w-16" />
          <TheatroDaPaz className="absolute left-0.5 top-[44%] w-16" />
          <GarcaVoando className="absolute right-2 top-[38%] w-14" />
          <BasilicaNazare className="absolute right-1 top-[58%] w-14" />
          <GarcaEmPe className="absolute bottom-5 left-8 w-9" />
          <FarolBelem className="absolute bottom-3 right-12 w-7" />
        </Layout>

        <Layout name="3. Moldura de cartão-postal" note="As ilustrações contornam o formulário pelas bordas, como a moldura de um cartão-postal de Belém." framed>
          <VerOPeso className="absolute left-2 top-11 w-28" />
          <TheatroDaPaz className="absolute right-2 top-11 w-28" />
          <FarolBelem className="absolute left-3 top-[42%] w-7" />
          <UrubuPousado className="absolute right-4 top-[46%] w-8" />
          <BasilicaNazare className="absolute bottom-2 left-3 w-20" />
          <GarcaEmPe className="absolute bottom-3 left-[40%] w-8" />
          <GarcaVoando className="absolute bottom-8 right-3 w-20" />
        </Layout>
      </div>
    </main>
  );
}

// Miniatura da página de confirmação: menu, título e o cartão do formulário.
function Layout({ name, note, framed = false, children }: { name: string; note: string; framed?: boolean; children: React.ReactNode }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <div className="relative h-[600px] w-full max-w-[360px] overflow-hidden rounded-md border border-mist bg-paper shadow-md">
        <div className="h-8 border-b border-mist bg-white/70" />
        <p className="mt-24 text-center font-serif text-xl">Confirmação de presença</p>
        <div className={`relative z-10 mx-auto mt-6 flex w-[62%] flex-col gap-2 rounded-lg border border-mist bg-white p-3 ${framed ? "ring-4 ring-paper" : ""}`}>
          {["w-1/2", "w-full", "w-3/4", "w-full", "w-2/3"].map((w, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="h-1.5 w-1/3 rounded bg-mist" />
              <span className={`h-5 rounded border border-mist ${w}`} />
            </div>
          ))}
          <span className="mt-1 h-6 rounded-full bg-primary" />
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

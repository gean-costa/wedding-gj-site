// Página TEMPORÁRIA (não publicar): estilos de desenho dos bichos da família
// e formas de colocá-los no rodapé de todas as páginas.
import type { Metadata } from "next";
import { AzulejoBand, AzulejoIcon } from "@/components/Azulejo";
import { BichoDesenho, familia, type BichoEstilo } from "@/components/Bichos";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = { title: "Rodapé com os bichos" };

const estilos: { id: BichoEstilo; name: string; note: string }[] = [
  { id: "chapado", name: "A. Chapado", note: "Formas simples com cores cheias, sem contorno, como adesivos ou recortes de papel." },
  { id: "contorno", name: "B. Contorno", note: "As mesmas cores com um contorno escuro por fora, como num livro infantil. Fica mais nítido em tamanho pequeno." },
  { id: "aquarela", name: "C. Traço + aquarela", note: "Cores mais suaves, traço fino por cima e mancha azul clara atrás, como as ilustrações de Belém em traço + mancha." },
];

export default function RodapePage() {
  return (
    <main className="flex-1 bg-paper">
      <header className="border-b border-mist px-4 py-4 text-center">
        <p className="font-medium">Os bichos da família no rodapé (página temporária)</p>
        <p className="text-sm text-stone">
          Parte 1: estilos de desenho. Parte 2: formas de colocar no rodapé. Ordem por idade; o cachorro está no fim.
        </p>
      </header>

      <h2 className="bg-ink px-4 py-2 text-center text-sm font-semibold text-white">Parte 1 · Estilos de desenho</h2>
      {estilos.map((e) => (
        <section key={e.id} className="border-b border-mist px-4 py-10">
          <p className="text-center font-semibold">{e.name}</p>
          <p className="mx-auto mb-8 max-w-xl text-center text-sm text-stone">{e.note}</p>
          <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-center gap-x-4 gap-y-6">
            {familia.map((b, i) => (
              <figure key={b.id} className="flex w-24 flex-col items-center gap-2">
                <BichoDesenho bicho={b} uid={`p1-${e.id}-${i}`} estilo={e.id} className="w-24" />
                <figcaption className="text-center text-xs leading-tight text-stone">
                  {i + 1}. {b.label}
                  {b.halo && " ✦"}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-stone">Também espiando por cima de uma borda:</p>
          <div className="mx-auto mt-2 flex max-w-4xl flex-wrap justify-center gap-3">
            {familia.map((b, i) => (
              <div key={b.id} className="flex flex-col items-center">
                <BichoDesenho bicho={b} uid={`p1e-${e.id}-${i}`} estilo={e.id} espiando className="relative z-10 -mb-[3.6px] w-[60px]" />
                <div className="h-3 w-[72px] bg-primary" />
              </div>
            ))}
          </div>
        </section>
      ))}

      <h2 className="bg-ink px-4 py-2 text-center text-sm font-semibold text-white">
        Parte 2 · No rodapé (computador e celular). Qualquer estilo de desenho serve em qualquer formato.
      </h2>

      <Formato
        name="1. Sentados no muro"
        note="Os bichos sentados em fila em cima da linha do rodapé, como se estivessem num muro olhando o site."
      >
        {(mobile, uid) => <SentadosNoMuro mobile={mobile} uid={uid} estilo="chapado" />}
      </Formato>

      <Formato
        name="2. Espiando"
        note="Só as cabeças e as patinhas aparecem por cima de uma faixa azul, como gatos espiando da janela."
      >
        {(mobile, uid) => <Espiando mobile={mobile} uid={uid} estilo="contorno" />}
      </Formato>

      <Formato
        name="3. Sentados nos azulejos"
        note="Os bichos sentados em cima de uma faixa de azulejos, ligando o rodapé à identidade do site."
      >
        {(mobile, uid) => <SobreAzulejos mobile={mobile} uid={uid} estilo="contorno" />}
      </Formato>

      <Formato
        name="4. Um azulejo para cada um"
        note="Cada bicho num medalhão por cima de um azulejo, como uma galeria. No celular vira duas fileiras de cinco."
      >
        {(mobile, uid) => <UmAzulejoCada mobile={mobile} uid={uid} estilo="aquarela" />}
      </Formato>
    </main>
  );
}

function Formato({
  name,
  note,
  children,
}: {
  name: string;
  note: string;
  children: (mobile: boolean, uid: string) => React.ReactNode;
}) {
  const slug = name.slice(0, 1);
  return (
    <section className="border-b border-mist px-4 py-10">
      <p className="text-center font-semibold">{name}</p>
      <p className="mx-auto mb-6 max-w-xl text-center text-sm text-stone">{note}</p>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 xl:flex-row xl:items-end xl:justify-center">
        <div className="w-full max-w-4xl">
          <p className="mb-2 text-center text-xs text-stone">Computador</p>
          <Pagina>{children(false, `f${slug}d`)}</Pagina>
        </div>
        <div className="w-[375px] max-w-full shrink-0">
          <p className="mb-2 text-center text-xs text-stone">Celular (375px)</p>
          <Pagina>{children(true, `f${slug}m`)}</Pagina>
        </div>
      </div>
    </section>
  );
}

// Moldura simulando o fim de uma página do site.
function Pagina({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-mist bg-background shadow-sm">
      <div className="space-y-2 px-6 pb-6 pt-8">
        <div className="mx-auto h-2 w-2/3 rounded bg-mist" />
        <div className="mx-auto h-2 w-1/2 rounded bg-mist" />
      </div>
      {children}
    </div>
  );
}

function Assinatura({ claro = false }: { claro?: boolean }) {
  return (
    <div className={`px-4 pb-5 pt-3 text-center ${claro ? "text-white" : ""}`}>
      <p className="font-script text-3xl leading-none">{wedding.shortNames}</p>
      <p className={`mt-1 text-xs ${claro ? "text-white/80" : "text-stone"}`}>{wedding.dateLabel}</p>
      <p className={`mt-2 text-[11px] ${claro ? "text-white/70" : "text-stone"}`}>com a família toda ✦</p>
    </div>
  );
}

type FormatoProps = { mobile: boolean; uid: string; estilo: BichoEstilo };

function SentadosNoMuro({ mobile, uid, estilo }: FormatoProps) {
  const w = mobile ? "w-[31px]" : "w-14";
  return (
    <footer>
      <div className={`flex items-end justify-center px-2 ${mobile ? "gap-[2px]" : "gap-2"}`}>
        {familia.map((b, i) => (
          <BichoDesenho key={b.id} bicho={b} uid={`${uid}-${i}`} estilo={estilo} className={`${w} -mb-[2%]`} />
        ))}
      </div>
      <div className="border-t-2 border-primary">
        <Assinatura />
      </div>
    </footer>
  );
}

function Espiando({ mobile, uid, estilo }: FormatoProps) {
  // A faixa começa na linha y=58 do desenho (80 de altura): sobrepõe 6/80 da altura.
  const px = mobile ? 32 : 56;
  return (
    <footer className="pt-2">
      <div className={`flex justify-center px-2 ${mobile ? "gap-[2px]" : "gap-3"}`}>
        {familia.map((b, i) => (
          <BichoDesenho
            key={b.id}
            bicho={b}
            uid={`${uid}-${i}`}
            estilo={estilo}
            espiando
            className="relative z-10"
            style={{ width: px, marginBottom: -px * 0.06 }}
          />
        ))}
      </div>
      <div className="bg-primary">
        <Assinatura claro />
      </div>
    </footer>
  );
}

function SobreAzulejos({ mobile, uid, estilo }: FormatoProps) {
  const w = mobile ? "w-[31px]" : "w-14";
  return (
    <footer>
      <div className={`flex items-end justify-center px-2 ${mobile ? "gap-[2px]" : "gap-2"}`}>
        {familia.map((b, i) => (
          <BichoDesenho key={b.id} bicho={b} uid={`${uid}-${i}`} estilo={estilo} className={`${w} relative z-10 -mb-[3%]`} />
        ))}
      </div>
      <AzulejoBand id={`${uid}-band`} size={mobile ? 28 : 40} />
      <Assinatura />
    </footer>
  );
}

function UmAzulejoCada({ mobile, uid, estilo }: FormatoProps) {
  return (
    <footer className="border-t border-mist pt-5">
      <div className={`mx-auto grid w-fit gap-1.5 px-2 ${mobile ? "grid-cols-6" : "grid-cols-11"}`}>
        {familia.map((b, i) => (
          <div key={b.id} className={`relative ${mobile ? "h-16 w-16" : "h-[72px] w-[72px]"}`}>
            <AzulejoIcon className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-[14%] rounded-full border border-primary bg-paper" />
            <BichoDesenho bicho={b} uid={`${uid}-${i}`} estilo={estilo} className="absolute inset-x-[20%] bottom-[16%] w-[60%]" />
          </div>
        ))}
      </div>
      <Assinatura />
    </footer>
  );
}

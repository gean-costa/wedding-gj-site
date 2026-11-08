// Confirmação de presença como uma carta selada: o formulário fica dentro de
// uma carta de correio aéreo, endereçada aos noivos, com selos dos pontos
// turísticos de Belém colados no canto e o carimbo do correio. Os demais selos
// ficam espalhados nas laterais (computador) ou numa fileira abaixo (celular).
import type { Metadata } from "next";
import {
  BasilicaNazare,
  Carimbo,
  CasaOnzeJanelas,
  EstacaoDasDocas,
  FortePresepio,
  MercadoSaoBras,
  RelogioVerOPeso,
  SeloPostal,
  TheatroDaPaz,
  VerOPeso,
} from "@/components/BelemIlustracoes";
import { RsvpForm } from "@/components/RsvpForm";
import { SiteHeader } from "@/components/SiteHeader";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = {
  title: `Confirmar presença | ${wedding.shortNames}`,
  description: `Confirme sua presença no casamento de ${wedding.bride} e ${wedding.groom}.`,
};

// Borda listrada das cartas de correio aéreo, nas cores da paleta.
const airmail = {
  backgroundImage: "repeating-linear-gradient(135deg, #667588 0 14px, #ffffff 14px 28px, #98AEC3 28px 42px, #ffffff 42px 56px)",
};

// Selos espalhados em volta da carta (os do canto da carta são outros dois).
// `w` = largura do desenho nas laterais (telas largas); `wSmall` = na fileira
// abaixo da carta (telas menores).
const leftStamps = [
  { title: "Casa das Onze Janelas", C: CasaOnzeJanelas, w: "w-48", wSmall: "w-24", rotate: -4 },
  { title: "Basílica de Nazaré", C: BasilicaNazare, w: "w-28", wSmall: "w-14", rotate: 3 },
  { title: "Forte do Presépio", C: FortePresepio, w: "w-44", wSmall: "w-24", rotate: -2 },
];
const rightStamps = [
  { title: "Estação das Docas", C: EstacaoDasDocas, w: "w-44", wSmall: "w-24", rotate: 3 },
  { title: "Praça do Relógio", C: RelogioVerOPeso, w: "w-14", wSmall: "w-7", rotate: -3 },
  { title: "Mercado de São Brás", C: MercadoSaoBras, w: "w-48", wSmall: "w-24", rotate: 2 },
];

export default function ConfirmarPresencaPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 overflow-x-hidden px-4 pb-20 pt-28">
        <header className="mb-10 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl">Confirmação de presença</h1>
          <p className="mt-4 font-serif text-lg">
            {wedding.dateLabel} · {wedding.ceremony.name}, {wedding.ceremony.time}
          </p>
        </header>

        <div className="mx-auto flex max-w-6xl items-start justify-center gap-10">
          {/* Selos da esquerda (só em telas largas) */}
          <div className="hidden w-60 flex-col items-center gap-10 pt-10 xl:flex">
            {leftStamps.map(({ title, C, w, rotate }) => (
              <SeloPostal key={title} title={title} rotate={rotate}>
                <C variant="selo" className={w} />
              </SeloPostal>
            ))}
          </div>

          {/* Carta de correio aéreo */}
          <div className="w-full max-w-xl shrink-0 rounded-lg p-2.5 shadow-xl" style={airmail}>
            <div className="rounded-md bg-white px-5 pb-8 pt-5 sm:px-8">
              {/* Endereçamento e selos colados no canto */}
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-stone">Para</p>
                  <p className="whitespace-nowrap font-script text-4xl leading-tight text-primary sm:text-5xl">{wedding.shortNames}</p>
                  <p className="text-sm text-stone">{wedding.city.replace("PA", "Pará")}</p>
                </div>
                <div className="relative flex shrink-0">
                  {/* No celular só cabe um selo no canto */}
                  <span className="relative z-10 hidden sm:block">
                    <SeloPostal small title="Theatro da Paz" rotate={4}>
                      <TheatroDaPaz variant="selo" className="w-20" />
                    </SeloPostal>
                  </span>
                  <SeloPostal small title="Mercado de Ferro" rotate={-5} className="relative z-20 sm:-ml-3">
                    <VerOPeso variant="selo" className="w-20" />
                  </SeloPostal>
                  <Carimbo className="absolute -bottom-4 -left-10 z-30 w-24" />
                </div>
              </div>

              <RsvpForm />
            </div>
          </div>

          {/* Selos da direita (só em telas largas) */}
          <div className="hidden w-60 flex-col items-center gap-10 pt-16 xl:flex">
            {rightStamps.map(({ title, C, w, rotate }) => (
              <SeloPostal key={title} title={title} rotate={rotate}>
                <C variant="selo" className={w} />
              </SeloPostal>
            ))}
          </div>
        </div>

        {/* Em telas menores, os selos ficam numa fileira abaixo da carta */}
        <div className="mx-auto mt-12 flex max-w-xl flex-wrap justify-center gap-4 xl:hidden">
          {[...leftStamps, ...rightStamps].map(({ title, C, wSmall, rotate }) => (
            <SeloPostal key={title} small title={title} rotate={rotate / 2}>
              <C variant="selo" className={wSmall} />
            </SeloPostal>
          ))}
        </div>
      </main>
    </>
  );
}

// Confirmação de presença como uma carta selada: o formulário fica dentro de
// uma carta de correio aéreo, endereçada aos noivos, com selos dos pontos
// turísticos de Belém colados no canto e o carimbo do correio. Os demais selos
// ficam nas laterais (computador) ou numa grade abaixo (celular), e todos vão
// trocando de lugar entre si (veja SelosTrocando.tsx).
import type { Metadata } from "next";
import { Carimbo } from "@/components/BelemIlustracoes";
import { RsvpForm } from "@/components/RsvpForm";
import { SelosProvider, SeloTrocando } from "@/components/SelosTrocando";
import { SiteFooter } from "@/components/SiteFooter";
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

// Lugares dos selos em volta da carta (os lugares 0 e 1 ficam colados nela).
// As inclinações da direita espelham as da esquerda, para ficar simétrico.
const esquerda = [
  { slot: 2, rotate: -3 },
  { slot: 3, rotate: 2 },
  { slot: 4, rotate: -2 },
];
const direita = [
  { slot: 5, rotate: 3 },
  { slot: 6, rotate: -2 },
  { slot: 7, rotate: 2 },
];
// Em telas menores, os mesmos seis lugares numa grade (2 colunas no celular, 3 a partir de sm).
const grade = [
  { slot: 2, rotate: -2 },
  { slot: 3, rotate: 1.5 },
  { slot: 5, rotate: -1.5 },
  { slot: 4, rotate: 1.5 },
  { slot: 6, rotate: -1.5 },
  { slot: 7, rotate: 2 },
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

        <SelosProvider>
          <div className="mx-auto flex max-w-6xl justify-center gap-10">
            {/* Selos da esquerda (só em telas largas), distribuídos na altura da carta */}
            <div className="hidden w-60 flex-col items-center justify-around xl:flex">
              {esquerda.map(({ slot, rotate }) => (
                <SeloTrocando key={slot} slot={slot} tamanho="lateral" rotate={rotate} />
              ))}
            </div>

            {/* Carta de correio aéreo */}
            <div className="w-full max-w-xl shrink-0 rounded-lg p-2.5 shadow-xl" style={airmail}>
              <div className="rounded-md bg-white px-4 pb-8 pt-5 min-[375px]:px-5 sm:px-8">
                {/* Endereçamento e selos colados no canto */}
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="pt-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-stone">Para</p>
                    <p className="whitespace-nowrap font-script text-3xl leading-tight text-primary min-[375px]:text-4xl sm:text-5xl">{wedding.shortNames}</p>
                    <p className="text-sm text-stone">{wedding.city.replace("PA", "Pará")}</p>
                  </div>
                  <div className="relative flex shrink-0">
                    {/* No celular só cabe um selo no canto */}
                    <span className="relative z-10 hidden sm:block">
                      <SeloTrocando slot={0} tamanho="carta" rotate={3} />
                    </span>
                    <span className="relative z-20 sm:-ml-3">
                      <SeloTrocando slot={1} tamanho="carta" rotate={-3} />
                    </span>
                    <Carimbo className="absolute -bottom-4 -left-10 z-30 w-24" />
                  </div>
                </div>

                <RsvpForm />
              </div>
            </div>

            {/* Selos da direita (só em telas largas), distribuídos na altura da carta */}
            <div className="hidden w-60 flex-col items-center justify-around xl:flex">
              {direita.map(({ slot, rotate }) => (
                <SeloTrocando key={slot} slot={slot} tamanho="lateral" rotate={rotate} />
              ))}
            </div>
          </div>

          {/* Em telas menores, os selos ficam numa grade abaixo da carta */}
          <div className="mx-auto mt-12 grid w-fit grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-x-6 xl:hidden">
            {grade.map(({ slot, rotate }) => (
              <SeloTrocando key={slot} slot={slot} tamanho="grade" rotate={rotate} />
            ))}
          </div>
        </SelosProvider>
      </main>
      <SiteFooter />
    </>
  );
}

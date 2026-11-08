// Confirmação de presença com a identidade dos abridores de letras (pintura de
// letras dos barcos ribeirinhos): o topo é o casco do barco, com listras e o
// letreiro; o formulário é um bilhete de passagem.
import type { Metadata } from "next";
import { Floreio, LetraDeBarco } from "@/components/LetraDeBarco";
import { RsvpTicket } from "@/components/RsvpTicket";
import { SiteHeader } from "@/components/SiteHeader";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = {
  title: `Confirmar presença | ${wedding.shortNames}`,
  description: `Confirme sua presença no casamento de ${wedding.bride} e ${wedding.groom}.`,
};

// Listras pintadas no casco, de cima para baixo.
const hullStripes = ["h-3 bg-ink", "h-1.5 bg-paper", "h-2 bg-primary", "h-1 bg-paper", "h-1 bg-secondary"];

export default function ConfirmarPresencaPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-16">
        {/* Casco do barco */}
        <section className="relative bg-paper">
          {hullStripes.map((s) => (
            <div key={s} className={s} />
          ))}
          <div className="flex flex-col items-center gap-3 px-4 pb-24 pt-12 text-center sm:pt-16">
            <p className="text-xs uppercase tracking-[0.4em] text-stone sm:text-sm">Confirmação de presença</p>
            <h1 className="flex flex-col items-center">
              {/* Tamanhos acompanham a largura da tela para caber em celulares pequenos. */}
              <LetraDeBarco className="text-[clamp(1.75rem,13vw,4rem)]">Confirme sua</LetraDeBarco>
              <LetraDeBarco className="text-[clamp(2.75rem,18vw,8rem)]">Presença</LetraDeBarco>
            </h1>
            <Floreio className="mt-2 w-56 text-ink sm:w-72" />
            <p className="mt-2 max-w-xl font-serif text-lg sm:text-xl">
              Nossa viagem começa no dia {wedding.dateLabel}. Garanta seu lugar a bordo preenchendo o bilhete abaixo.
            </p>
          </div>

          {/* Linha d'água: ondas do rio */}
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-20" aria-hidden>
            <path d="M0 40 Q75 15 150 40 T300 40 T450 40 T600 40 T750 40 T900 40 T1050 40 T1200 40 V80 H0 Z" fill="#98AEC3" opacity="0.5" />
            <path d="M0 55 Q75 35 150 55 T300 55 T450 55 T600 55 T750 55 T900 55 T1050 55 T1200 55 V80 H0 Z" fill="var(--river)" />
          </svg>
        </section>

        {/* Rio, com o bilhete */}
        <section className="bg-river px-4 pb-20 pt-6">
          <RsvpTicket />
        </section>
      </main>
    </>
  );
}

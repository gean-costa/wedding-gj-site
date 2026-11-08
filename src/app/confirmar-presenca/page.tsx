// Confirmação de presença, em visual neutro (estilo base do site). A página
// ainda vai ganhar uma identidade própria.
import type { Metadata } from "next";
import { RsvpForm } from "@/components/RsvpForm";
import { SiteHeader } from "@/components/SiteHeader";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = {
  title: `Confirmar presença | ${wedding.shortNames}`,
  description: `Confirme sua presença no casamento de ${wedding.bride} e ${wedding.groom}.`,
};

export default function ConfirmarPresencaPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 pb-20 pt-28">
        <div className="mx-auto max-w-2xl">
          <header className="mb-10 text-center">
            <h1 className="font-serif text-4xl sm:text-5xl">Confirmação de presença</h1>
            <p className="mt-4 font-serif text-lg">
              {wedding.dateLabel} · {wedding.ceremony.name}, {wedding.ceremony.time}
            </p>
          </header>
          <RsvpForm />
        </div>
      </main>
    </>
  );
}

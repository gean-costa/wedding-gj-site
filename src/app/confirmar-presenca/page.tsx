// Confirmação de presença com a identidade dos abridores de letras (pintura de
// letras dos barcos ribeirinhos): o topo é o casco do barco e o formulário é um
// bilhete de passagem.
import type { Metadata } from "next";
import { CascoDeBarco } from "@/components/CascoDeBarco";
import { RsvpTicket } from "@/components/RsvpTicket";
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
      <main className="flex-1 pt-16">
        <CascoDeBarco eyebrow="Confirmação de presença" small="Confirme sua" big="Presença">
          Nossa viagem começa no dia {wedding.dateLabel}. Garanta seu lugar a bordo preenchendo o bilhete abaixo.
        </CascoDeBarco>

        {/* Rio, com o bilhete */}
        <section className="bg-river px-4 pb-20 pt-6">
          <RsvpTicket />
        </section>
      </main>
    </>
  );
}

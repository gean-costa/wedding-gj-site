// "Nossa história" como uma viagem de barco: o topo é o casco (identidade dos
// abridores de letras) e a linha do tempo é a rota no rio, com um porto para
// cada data importante. Os portos vêm de src/lib/historia.ts.
import type { Metadata } from "next";
import Link from "next/link";
import { CascoDeBarco } from "@/components/CascoDeBarco";
import { HistoriaIcon } from "@/components/HistoriaIcon";
import { LetraDeBarco } from "@/components/LetraDeBarco";
import { SiteHeader } from "@/components/SiteHeader";
import { portos, proximoPorto, type Porto } from "@/lib/historia";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = {
  title: `Nossa história | ${wedding.shortNames}`,
  description: `A viagem de ${wedding.bride} e ${wedding.groom} até o casamento.`,
};

export default function NossaHistoriaPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-16">
        <CascoDeBarco eyebrow="Uma viagem a dois" small="Nossa" big="História">
          Cada porto desta rota é um momento que vivemos juntos, até chegar ao próximo destino: o nosso casamento.
        </CascoDeBarco>

        <section className="bg-river px-4 pb-20 pt-8">
          <ol className="relative mx-auto max-w-4xl">
            {/* Rota do barco: linha tracejada descendo pelo rio */}
            <div
              aria-hidden
              className="absolute bottom-0 left-6 top-0 -translate-x-1/2 border-l-4 border-dashed border-secondary md:left-1/2"
            />
            {portos.map((porto, i) => (
              <PortoItem key={porto.title} porto={porto} index={i} />
            ))}
            <PortoItem porto={proximoPorto} index={portos.length} final />
          </ol>

          <div className="mt-4 flex justify-center">
            <Link
              href="/confirmar-presenca"
              className="rounded-md bg-ink px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary"
            >
              Confirme seu embarque
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

// No celular a rota fica à esquerda e os portos à direita dela. No computador
// a rota fica no centro e os portos alternam: pares à esquerda, ímpares à direita.
function PortoItem({ porto, index, final = false }: { porto: Porto; index: number; final?: boolean }) {
  const left = index % 2 === 0;
  return (
    <li className={`relative mb-12 pl-16 md:w-1/2 md:pl-0 ${left ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"}`}>
      {/* Boia que marca o porto sobre a rota */}
      <span
        className={`absolute left-6 top-4 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-paper shadow-md ${
          final ? "bg-ink text-white" : "bg-primary text-white"
        } ${left ? "md:left-auto md:right-0 md:translate-x-1/2" : "md:left-0"}`}
      >
        <HistoriaIcon name={porto.icon} />
      </span>

      {/* Placa do porto */}
      <article className={`rounded-lg bg-paper p-5 shadow-md ring-1 sm:p-6 ${final ? "ring-2 ring-primary" : "ring-mist"}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone">
          {final ? "Próximo porto" : `Porto ${index + 1}`} · {porto.date}
        </p>
        <h2 className="mt-2">
          <LetraDeBarco shallow className="text-2xl sm:text-3xl">
            {porto.title}
          </LetraDeBarco>
        </h2>
        <p className="mt-2 font-serif text-lg leading-relaxed">{porto.text}</p>
      </article>
    </li>
  );
}

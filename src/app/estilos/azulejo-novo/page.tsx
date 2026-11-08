// Página TEMPORÁRIA (não publicar): vitrine dos desenhos de azulejo guardados
// em src/components/AzulejoDesigns.tsx. O site usa o Arabescos.
import type { Metadata } from "next";
import { AzulejoBackground } from "@/components/Azulejo";
import { azulejoDesigns } from "@/components/AzulejoDesigns";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = { title: "Azulejos guardados" };

export default function AzulejoNovoPage() {
  return (
    <main className="flex-1">
      <header className="sticky top-0 z-20 border-b border-mist bg-paper/90 px-4 py-3 text-center backdrop-blur">
        <p className="mb-2 text-sm font-medium">Azulejos guardados (página temporária)</p>
        <ul className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
          {azulejoDesigns.map((d) => (
            <li key={d.id}>
              <a href={`#${d.id}`} className="block rounded-full border border-primary px-3 py-1 text-primary hover:bg-primary hover:text-white">
                {d.name}
              </a>
            </li>
          ))}
        </ul>
      </header>

      {azulejoDesigns.map(({ id, name, source, Tile }) => (
        <section key={id} id={id} className="scroll-mt-24 border-b-8 border-ink">
          <div className="bg-ink px-4 py-2 text-center text-white">
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-mist">Inspirado em: {source}</p>
          </div>

          <div className="grid items-center gap-8 bg-white px-4 py-10 md:grid-cols-2">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-medium">Um azulejo, ampliado</p>
              <svg viewBox="0 0 100 100" className="w-72 max-w-full shadow-md sm:w-96" aria-hidden>
                <Tile />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-medium">Parede (os desenhos continuam no vizinho)</p>
              <div className="relative h-72 w-72 max-w-full overflow-hidden shadow-md sm:h-96 sm:w-96">
                <AzulejoBackground id={`parede-${id}`} Tile={Tile} size={128} />
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[480px] items-center justify-center px-4 py-14">
            <AzulejoBackground id={`hero-${id}`} Tile={Tile} />
            <div className="relative flex w-full max-w-2xl flex-col items-center gap-4 rounded-sm border-4 border-double border-primary bg-paper px-4 py-10 text-center shadow-lg sm:px-14">
              <h2 className="whitespace-nowrap font-script text-[clamp(3rem,14vw,7rem)] leading-none text-primary">
                {wedding.brideFirstName} <span className="text-[0.7em]">&</span> {wedding.groomFirstName}
              </h2>
              <p className="font-serif text-lg sm:text-2xl">
                {wedding.dateLabel} · {wedding.city}
              </p>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

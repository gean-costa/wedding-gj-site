// Página TEMPORÁRIA (não publicar): vitrine dos desenhos de azulejo guardados
// em src/components/AzulejoDesigns.tsx, cada um sem e com rejunte.
// O site usa o Arabescos com rejunte.
import type { ComponentType } from "react";
import type { Metadata } from "next";
import { AzulejoBackground } from "@/components/Azulejo";
import { azulejoDesigns } from "@/components/AzulejoDesigns";

export const metadata: Metadata = { title: "Azulejos guardados" };

function Variant({ id, label, Tile }: { id: string; label: string; Tile: ComponentType }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">{label}</p>
      <svg viewBox="0 0 100 100" className="w-56 max-w-full shadow-md sm:w-64" aria-hidden>
        <Tile />
      </svg>
      <div className="relative h-64 w-full max-w-md overflow-hidden shadow-md sm:h-80">
        <AzulejoBackground id={id} Tile={Tile} size={112} />
      </div>
    </div>
  );
}

export default function AzulejoNovoPage() {
  return (
    <main className="flex-1">
      <header className="sticky top-0 z-20 border-b border-mist bg-paper/90 px-4 py-3 text-center backdrop-blur">
        <p className="mb-2 text-sm font-medium">Azulejos guardados, sem e com rejunte (página temporária)</p>
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

      {azulejoDesigns.map(({ id, name, source, Tile, TileComRejunte }) => (
        <section key={id} id={id} className="scroll-mt-24 border-b-8 border-ink">
          <div className="bg-ink px-4 py-2 text-center text-white">
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-mist">Inspirado em: {source}</p>
          </div>
          <div className="grid gap-10 bg-white px-4 py-10 md:grid-cols-2">
            <Variant id={`sem-${id}`} label="Sem rejunte" Tile={Tile} />
            <Variant id={`com-${id}`} label="Com rejunte" Tile={TileComRejunte} />
          </div>
        </section>
      ))}
    </main>
  );
}

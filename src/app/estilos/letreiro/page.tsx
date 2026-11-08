// Página TEMPORÁRIA (não publicar): compara fontes para o letreiro da página de
// confirmação de presença, inspirado na família "Muita Onda".
import type { Metadata } from "next";
import { Ewert, Rye, Sancreek, Smokum, Ultra } from "next/font/google";
import { Floreio, LetraDeBarco } from "@/components/LetraDeBarco";

export const metadata: Metadata = { title: "Comparar letreiros" };

const rye = Rye({ subsets: ["latin"], weight: "400" });
const sancreek = Sancreek({ subsets: ["latin"], weight: "400" });
const smokum = Smokum({ subsets: ["latin"], weight: "400" });
const ewert = Ewert({ subsets: ["latin"], weight: "400" });
const ultra = Ultra({ subsets: ["latin"], weight: "400" });

const options = [
  { name: "1. Rye", note: "Toscana larga, com esporas no meio das hastes. A mais próxima da Muita Onda.", font: rye.className },
  { name: "2. Sancreek", note: "Toscana estreita e ornamental, com serifas bifurcadas.", font: sancreek.className },
  { name: "3. Smokum", note: "Toscana condensada, com cara de cartaz antigo.", font: smokum.className },
  { name: "4. Ewert", note: "Bem decorativa, com recortes internos nas letras.", font: ewert.className },
  { name: "5. Ultra", note: "A anterior, para comparar.", font: ultra.className },
];

export default function LetreiroPage() {
  return (
    <main className="flex-1 bg-paper">
      <header className="border-b border-mist px-4 py-4 text-center">
        <p className="font-medium">Letreiro da confirmação de presença (página temporária)</p>
        <p className="text-sm text-stone">Mesmo efeito em todas: metades em duas cores, estrelinhas de brilho e sombra 3D.</p>
      </header>
      {options.map((o) => (
        <section key={o.name} className="flex flex-col items-center gap-3 border-b border-mist px-4 py-12 text-center">
          <p className="text-sm font-semibold">{o.name}</p>
          <p className="max-w-md text-xs text-stone">{o.note}</p>
          <h2 className="mt-4 flex flex-col items-center">
            <LetraDeBarco fontClassName={o.font} className="text-[clamp(1.75rem,8vw,3.75rem)]">Confirme sua</LetraDeBarco>
            <LetraDeBarco fontClassName={o.font} className="text-[clamp(2.75rem,14vw,7rem)]">Presença</LetraDeBarco>
          </h2>
          <Floreio className="w-56 text-ink" />
          <LetraDeBarco shallow fontClassName={o.font} className="mt-4 text-[clamp(1.5rem,6vw,2.5rem)]">Embarque Confirmado</LetraDeBarco>
        </section>
      ))}
    </main>
  );
}

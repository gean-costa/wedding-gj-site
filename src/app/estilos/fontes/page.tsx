// Página TEMPORÁRIA para comparar fontes. Apagar depois da escolha.
import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Cinzel,
  Cormorant_Garamond,
  EB_Garamond,
  Libre_Baskerville,
  Pinyon_Script,
} from "next/font/google";
import { AzulejoBackground } from "@/components/Azulejo";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = { title: "Comparar fontes" };

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500"] });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"] });
const ebGaramond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"] });
const baskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"] });
const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400" });

type Option = {
  id: string;
  label: string;
  description: string;
  names: string; // classes da fonte dos nomes
  text: string; // classes da fonte dos textos
  namesSize: string;
};

const options: Option[] = [
  {
    id: "cinzel",
    label: "1. Cinzel + Cormorant Garamond",
    description:
      "Letras maiúsculas inspiradas nas inscrições romanas, como as gravadas em fachadas de teatros e igrejas. Solene e monumental.",
    names: `${cinzel.className} uppercase tracking-[0.15em]`,
    text: cormorant.className,
    namesSize: "text-4xl sm:text-6xl",
  },
  {
    id: "cormorant",
    label: "2. Cormorant Garamond (itálico)",
    description:
      "Uma única família, com os nomes em itálico. É o clássico dos convites de casamento: delicado e romântico, sem ser manuscrito.",
    names: `${cormorant.className} italic font-medium`,
    text: cormorant.className,
    namesSize: "text-6xl sm:text-8xl",
  },
  {
    id: "pinyon",
    label: "3. Pinyon Script + Cormorant Garamond",
    description:
      "Caligrafia clássica, no estilo das cartas e convites antigos escritos a bico de pena. É mais tradicional que a manuscrita atual.",
    names: pinyon.className,
    text: cormorant.className,
    namesSize: "text-6xl sm:text-8xl",
  },
  {
    id: "bodoni",
    label: "4. Bodoni Moda + EB Garamond",
    description:
      "Contraste forte entre traços grossos e finos, típico de revistas de moda e de papelaria fina. Elegante e sofisticado.",
    names: `${bodoni.className} italic`,
    text: ebGaramond.className,
    namesSize: "text-5xl sm:text-7xl",
  },
  {
    id: "baskerville",
    label: "5. Libre Baskerville",
    description:
      "Serifa clássica de livros do século XVIII. Sóbria, firme e muito fácil de ler, inclusive no celular.",
    names: `${baskerville.className} italic`,
    text: baskerville.className,
    namesSize: "text-5xl sm:text-6xl",
  },
];

export default function FontesPage() {
  return (
    <main className="flex-1">
      <header className="sticky top-0 z-20 border-b border-mist bg-paper/90 px-4 py-3 backdrop-blur">
        <p className="mb-2 text-center text-sm font-medium">Compare as fontes (página temporária)</p>
        <ul className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
          {options.map((o) => (
            <li key={o.id}>
              <a href={`#${o.id}`} className="block rounded-full border border-primary px-3 py-1 text-primary hover:bg-primary hover:text-white">
                {o.label.split(" + ")[0]}
              </a>
            </li>
          ))}
        </ul>
      </header>

      {options.map((o) => (
        <section key={o.id} id={o.id} className="scroll-mt-24 border-b-8 border-ink">
          <div className="bg-ink px-4 py-3 text-center text-white">
            <p className="text-sm font-semibold">{o.label}</p>
            <p className="mx-auto max-w-2xl text-xs text-mist sm:text-sm">{o.description}</p>
          </div>

          <div className="relative flex min-h-[70svh] items-center justify-center px-4 py-16">
            <AzulejoBackground id={`azulejo-${o.id}`} />
            <div className="relative flex w-full max-w-xl flex-col items-center gap-6 rounded-sm border-4 border-double border-primary bg-paper px-6 py-12 text-center shadow-lg sm:px-14">
              <h2 className={`${o.names} ${o.namesSize} text-primary`}>
                {wedding.brideFirstName} & {wedding.groomFirstName}
              </h2>
              <p className={`${o.text} text-xl sm:text-2xl`}>
                {wedding.dateLabel} · {wedding.city}
              </p>
            </div>
          </div>

          <div className={`${o.text} bg-paper px-4 py-12 text-center`}>
            <h3 className="mb-4 text-3xl text-ink sm:text-4xl">Nossa história</h3>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed">
              Aqui vai o texto contando como tudo começou: como nos conhecemos, o primeiro encontro, o
              pedido de casamento e tudo o que vivemos até chegar a este dia.
            </p>
          </div>
        </section>
      ))}
    </main>
  );
}

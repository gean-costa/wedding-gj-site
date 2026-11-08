// Página TEMPORÁRIA para comparar fontes caligráficas. Apagar depois da escolha.
import type { Metadata } from "next";
import {
  Alex_Brush,
  Allura,
  Ballet,
  Corinthia,
  Cormorant_Garamond,
  Great_Vibes,
  Imperial_Script,
  Italianno,
  Luxurious_Script,
  Monsieur_La_Doulaise,
  MonteCarlo,
  Mrs_Saint_Delafield,
  Parisienne,
  Petit_Formal_Script,
  Pinyon_Script,
  Tangerine,
} from "next/font/google";
import { AzulejoBackground } from "@/components/Azulejo";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = { title: "Comparar fontes caligráficas" };

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"] });

// next/font exige uma constante por fonte, com as opções escritas na chamada.
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });
const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400" });
const petitFormal = Petit_Formal_Script({ subsets: ["latin"], weight: "400" });
const monsieur = Monsieur_La_Doulaise({ subsets: ["latin"], weight: "400" });
const mrsSaint = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400" });
const imperial = Imperial_Script({ subsets: ["latin"], weight: "400" });
const corinthia = Corinthia({ subsets: ["latin"], weight: "400" });
const monteCarlo = MonteCarlo({ subsets: ["latin"], weight: "400" });
const luxurious = Luxurious_Script({ subsets: ["latin"], weight: "400" });
const parisienne = Parisienne({ subsets: ["latin"], weight: "400" });
const alexBrush = Alex_Brush({ subsets: ["latin"], weight: "400" });
const allura = Allura({ subsets: ["latin"], weight: "400" });
const italianno = Italianno({ subsets: ["latin"], weight: "400" });
const tangerine = Tangerine({ subsets: ["latin"], weight: "400" });
const ballet = Ballet({ subsets: ["latin"], weight: "400" });

const fonts = [
  { name: "Great Vibes", note: "a atual, para referência", font: greatVibes, size: "text-5xl sm:text-6xl" },
  { name: "Pinyon Script", note: "bico de pena, tradicional", font: pinyon, size: "text-5xl sm:text-6xl" },
  { name: "Petit Formal Script", note: "caligrafia formal, bem legível", font: petitFormal, size: "text-4xl sm:text-5xl" },
  { name: "Monsieur La Doulaise", note: "floreios exagerados, muito ornamental", font: monsieur, size: "text-5xl sm:text-6xl" },
  { name: "Mrs Saint Delafield", note: "assinatura elegante, traço fino", font: mrsSaint, size: "text-5xl sm:text-7xl" },
  { name: "Imperial Script", note: "caligrafia clássica com laços", font: imperial, size: "text-5xl sm:text-6xl" },
  { name: "Corinthia", note: "copperplate leve e delicada", font: corinthia, size: "text-6xl sm:text-7xl" },
  { name: "MonteCarlo", note: "caligrafia de convite, alongada", font: monteCarlo, size: "text-5xl sm:text-6xl" },
  { name: "Luxurious Script", note: "ornamental, com maiúsculas marcantes", font: luxurious, size: "text-5xl sm:text-6xl" },
  { name: "Parisienne", note: "romântica, traço uniforme", font: parisienne, size: "text-4xl sm:text-5xl" },
  { name: "Alex Brush", note: "pincel, mais encorpada", font: alexBrush, size: "text-5xl sm:text-6xl" },
  { name: "Allura", note: "suave e arredondada", font: allura, size: "text-5xl sm:text-6xl" },
  { name: "Italianno", note: "italiana, fina e inclinada", font: italianno, size: "text-6xl sm:text-7xl" },
  { name: "Tangerine", note: "chancelaria, estreita e antiga", font: tangerine, size: "text-6xl sm:text-7xl" },
  { name: "Ballet", note: "caligrafia de traço largo, dramática", font: ballet, size: "text-4xl sm:text-5xl" },
];

export default function CaligrafiaPage() {
  return (
    <main className="relative flex-1">
      <AzulejoBackground id="azulejo-caligrafia" />
      <header className="sticky top-0 z-20 border-b border-mist bg-paper/90 px-4 py-3 text-center backdrop-blur">
        <p className="text-sm font-medium">Fontes caligráficas (página temporária)</p>
        <p className="text-xs text-stone">Nome da fonte e características abaixo de cada cartão. Textos em Cormorant Garamond.</p>
      </header>

      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2 xl:grid-cols-3">
        {fonts.map((f, i) => (
          <article key={f.name} className="flex flex-col overflow-hidden rounded-sm border-4 border-double border-primary bg-paper shadow-lg">
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-10 text-center">
              <h2 className={`${f.font.className} ${f.size} leading-tight text-primary`}>
                {wedding.brideFirstName} & {wedding.groomFirstName}
              </h2>
              <p className={`${cormorant.className} text-lg`}>{wedding.dateLabel}</p>
            </div>
            <div className="border-t border-mist bg-white px-4 py-2 text-center text-xs">
              <strong>
                {i + 1}. {f.name}
              </strong>{" "}
              · <span className="text-stone">{f.note}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

// Página TEMPORÁRIA para comparar estilos visuais. Apagar depois da escolha.
import type { Metadata } from "next";
import { AzulejoBackground } from "@/components/Azulejo";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = { title: "Comparar estilos" };

const styles = [
  { id: "classico", label: "1. Clássico", ref: "Theatro da Paz" },
  { id: "azulejo", label: "2. Azulejaria", ref: "Azulejos da Cidade Velha" },
  { id: "ferro", label: "3. Ferro Art Nouveau", ref: "Mercado de Ferro do Ver-o-Peso" },
  { id: "natureza", label: "4. Natureza amazônica", ref: "Mangueiras, rios e vitória-régia" },
  { id: "moderno", label: "5. Moderno", ref: "Estação das Docas" },
];

export default function EstilosPage() {
  return (
    <main className="flex-1">
      <header className="sticky top-0 z-10 border-b border-mist bg-paper/90 px-4 py-3 backdrop-blur">
        <p className="mb-2 text-center text-sm font-medium">Compare os estilos (página temporária)</p>
        <ul className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
          {styles.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="block rounded-full border border-primary px-3 py-1 text-primary hover:bg-primary hover:text-white">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <Palette />
      <Classico />
      <Azulejo />
      <Ferro />
      <Natureza />
      <Moderno />
    </main>
  );
}

function StyleLabel({ index, dark = false }: { index: number; dark?: boolean }) {
  const s = styles[index];
  return (
    <div className={`absolute left-3 top-3 z-10 rounded-md px-3 py-1 text-xs sm:text-sm ${dark ? "bg-white/90 text-ink" : "bg-ink/85 text-white"}`}>
      <strong>{s.label}</strong> · inspirado em: {s.ref}
    </div>
  );
}

function Palette() {
  const colors = [
    ["#575C60", "texto"],
    ["#667588", "principal"],
    ["#98AEC3", "principal clara"],
    ["#898788", "apoio"],
    ["#D9D9D9", "bordas/fundos"],
  ];
  return (
    <section className="flex flex-wrap justify-center gap-3 px-4 py-6">
      {colors.map(([hex, role]) => (
        <div key={hex} className="flex items-center gap-2 text-xs">
          <span className="h-8 w-8 rounded-full border border-black/10" style={{ background: hex }} />
          <span>
            {hex}
            <br />
            <span className="text-stone">{role}</span>
          </span>
        </div>
      ))}
    </section>
  );
}

/* 1. Clássico: fachada neoclássica em traço fino, simetria, serifas. */
function Classico() {
  return (
    <section id="classico" className="relative flex min-h-[85svh] scroll-mt-24 flex-col items-center justify-center gap-6 bg-paper px-4 py-20 text-center">
      <StyleLabel index={0} />
      <svg viewBox="0 0 400 170" className="w-64 text-primary sm:w-80" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M60 60 L200 15 L340 60 Z" />
        <circle cx="200" cy="42" r="8" />
        <rect x="55" y="60" width="290" height="12" />
        {[80, 120, 160, 240, 280, 320].map((x) => (
          <g key={x}>
            <rect x={x - 7} y="72" width="14" height="6" />
            <line x1={x - 4} y1="78" x2={x - 4} y2="140" />
            <line x1={x + 4} y1="78" x2={x + 4} y2="140" />
          </g>
        ))}
        <path d="M180 140 V105 A20 20 0 0 1 220 105 V140" />
        <rect x="45" y="140" width="310" height="8" />
        <rect x="35" y="148" width="330" height="8" />
      </svg>
      <p className="text-xs uppercase tracking-[0.4em] text-stone">Vamos nos casar</p>
      <h2 className="font-serif text-5xl tracking-wide text-ink sm:text-7xl">
        {wedding.groomFirstName} <span className="text-primary">&</span> {wedding.brideFirstName}
      </h2>
      <div className="flex items-center gap-4 text-primary">
        <span className="h-px w-12 bg-current" />
        <span className="font-serif text-lg italic">{wedding.dateLabel}</span>
        <span className="h-px w-12 bg-current" />
      </div>
      <a className="border border-primary px-8 py-3 text-sm uppercase tracking-widest text-primary hover:bg-primary hover:text-white">
        Confirmar presença
      </a>
    </section>
  );
}

/* 2. Azulejaria: padrão de azulejo português em volta de um "cartão" central. */
function Azulejo() {
  return (
    <section id="azulejo" className="relative flex min-h-[85svh] scroll-mt-24 items-center justify-center px-4 py-20">
      <StyleLabel index={1} />
      <AzulejoBackground id="tile" />
      <div className="relative flex max-w-xl flex-col items-center gap-5 rounded-sm border-4 border-double border-primary bg-paper px-8 py-12 text-center shadow-lg sm:px-14">
        <p className="text-xs uppercase tracking-[0.3em] text-stone">Vamos nos casar</p>
        <h2 className="font-script text-6xl text-primary sm:text-7xl">
          {wedding.groomFirstName} & {wedding.brideFirstName}
        </h2>
        <p className="font-serif text-lg">{wedding.dateLabel} · Belém</p>
        <a className="rounded-full bg-primary px-8 py-3 text-sm text-white hover:bg-ink">Confirmar presença</a>
      </div>
    </section>
  );
}

/* 3. Ferro Art Nouveau: arcos e "leques" de ferro fundido em traço, fundo escuro. */
function Ferro() {
  return (
    <section id="ferro" className="relative flex min-h-[85svh] scroll-mt-24 flex-col items-center justify-center overflow-hidden bg-ink px-4 py-20 text-center text-white">
      <StyleLabel index={2} dark />
      <svg className="absolute inset-x-0 bottom-0 h-56 w-full opacity-40" aria-hidden>
        <defs>
          <pattern id="arches" width="120" height="224" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#98AEC3" strokeWidth="1.5">
              <path d="M5 224 V90 A55 55 0 0 1 115 90 V224" />
              <path d="M15 224 V92 A45 45 0 0 1 105 92 V224" />
              {[-60, -30, 0, 30, 60].map((a) => (
                <line key={a} x1="60" y1="92" x2="60" y2="47" transform={`rotate(${a} 60 92)`} />
              ))}
              <path d="M15 92 H105" />
              <circle cx="60" cy="92" r="8" />
              <path d="M60 130 c-15 0 -15 20 0 20 c15 0 15 20 0 20 M60 130 c15 0 15 20 0 20 c-15 0 -15 20 0 20" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arches)" />
      </svg>
      <div className="relative flex flex-col items-center gap-6">
        <svg viewBox="0 0 200 40" className="w-48 text-secondary" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M100 20 c-20 -18 -45 -18 -60 0 c-10 12 -30 12 -38 0 M100 20 c20 -18 45 -18 60 0 c10 12 30 12 38 0" />
          <circle cx="100" cy="20" r="4" />
        </svg>
        <p className="text-xs uppercase tracking-[0.4em] text-secondary">Vamos nos casar</p>
        <h2 className="font-serif text-5xl italic sm:text-7xl">
          {wedding.groomFirstName} & {wedding.brideFirstName}
        </h2>
        <p className="text-lg text-mist">{wedding.dateLabel}</p>
        <a className="rounded-t-full border border-secondary px-10 pb-3 pt-5 text-sm uppercase tracking-widest text-secondary hover:bg-secondary hover:text-ink">
          Confirmar presença
        </a>
      </div>
    </section>
  );
}

/* 4. Natureza amazônica: folhas de mangueira, ondas de rio, vitória-régia. */
function Natureza() {
  const leaf = "M0 0 C25 -22 70 -22 100 0 C70 22 25 22 0 0 Z";
  return (
    <section id="natureza" className="relative flex min-h-[85svh] scroll-mt-24 flex-col items-center justify-center overflow-hidden bg-paper px-4 pb-32 pt-20 text-center">
      <StyleLabel index={3} />
      <svg viewBox="0 0 220 220" className="absolute -left-16 -top-10 w-64 text-secondary sm:w-80" aria-hidden>
        {[20, 55, 90].map((a, i) => (
          <g key={a} transform={`translate(30 ${40 + i * 45}) rotate(${a - 40})`}>
            <path d={leaf} fill="currentColor" opacity={0.5 + i * 0.2} />
            <line x1="0" y1="0" x2="100" y2="0" stroke="#F6F7F9" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      <svg viewBox="0 0 220 220" className="absolute -bottom-6 -right-16 w-56 rotate-180 text-primary sm:w-72" aria-hidden>
        {[20, 60].map((a, i) => (
          <g key={a} transform={`translate(30 ${60 + i * 50}) rotate(${a - 40})`}>
            <path d={leaf} fill="currentColor" opacity={0.6 + i * 0.2} />
            <line x1="0" y1="0" x2="100" y2="0" stroke="#F6F7F9" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      <div className="relative flex flex-col items-center gap-5">
        <svg viewBox="0 0 100 40" className="w-24 text-primary" aria-hidden>
          <ellipse cx="50" cy="22" rx="46" ry="14" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50 22 L96 18 A46 14 0 0 0 92 14 Z" fill="#F6F7F9" />
          <circle cx="50" cy="16" r="6" fill="#98AEC3" />
        </svg>
        <p className="text-xs uppercase tracking-[0.3em] text-stone">Vamos nos casar</p>
        <h2 className="font-script text-6xl text-ink sm:text-8xl">
          {wedding.groomFirstName} & {wedding.brideFirstName}
        </h2>
        <p className="font-serif text-lg text-primary">{wedding.dateLabel} · Belém do Pará</p>
        <a className="rounded-full bg-primary px-8 py-3 text-sm text-white hover:bg-ink">Confirmar presença</a>
      </div>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-24 w-full" aria-hidden>
        <path d="M0 50 Q150 10 300 50 T600 50 T900 50 T1200 50 V120 H0 Z" fill="#98AEC3" opacity="0.6" />
        <path d="M0 75 Q150 40 300 75 T600 75 T900 75 T1200 75 V120 H0 Z" fill="#667588" />
      </svg>
    </section>
  );
}

/* 5. Moderno: tipografia grande, blocos de cor, telhados dos galpões das Docas. */
function Moderno() {
  return (
    <section id="moderno" className="relative grid min-h-[85svh] scroll-mt-24 md:grid-cols-2">
      <StyleLabel index={4} dark />
      <div className="relative flex items-end overflow-hidden bg-primary p-8 pt-24 md:items-center">
        <svg viewBox="0 0 300 80" className="absolute inset-x-0 bottom-0 w-full text-secondary" aria-hidden>
          {[0, 75, 150, 225].map((x) => (
            <path key={x} d={`M${x} 80 V40 L${x + 37} 15 L${x + 75} 40 V80`} fill="none" stroke="currentColor" strokeWidth="2" />
          ))}
        </svg>
        <h2 className="relative font-sans text-6xl font-light leading-none tracking-tight text-white sm:text-8xl">
          {wedding.groomFirstName}
          <br />
          <span className="text-secondary">&</span> {wedding.brideFirstName}
        </h2>
      </div>
      <div className="flex flex-col justify-center gap-6 bg-paper p-8 sm:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-stone">Vamos nos casar</p>
        <p className="text-3xl font-light">13 · 11 · 2027</p>
        <p className="max-w-sm text-sm leading-relaxed">
          {wedding.ceremony.name}, {wedding.ceremony.time}
          <br />
          {wedding.reception.name}, {wedding.reception.time}
        </p>
        <a className="self-start bg-ink px-8 py-3 text-sm text-white hover:bg-primary">Confirmar presença →</a>
      </div>
    </section>
  );
}

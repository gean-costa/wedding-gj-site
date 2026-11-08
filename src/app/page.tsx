import { AzulejoGrid } from "@/components/Azulejo";
import { Countdown } from "@/components/Countdown";
import { mapsEmbedUrl, mapsSearchUrl, wedding, type Venue } from "@/lib/wedding";

const navLinks = [
  { href: "#historia", label: "Nossa história" },
  { href: "#cerimonia", label: "Cerimônia e Recepção" },
];

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <a href="#inicio" className="whitespace-nowrap font-script text-3xl text-accent">
            {wedding.shortNames}
          </a>
          <ul className="flex gap-4 text-sm sm:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        {/*
          O cartão mede um número inteiro de azulejos (--cols x --rows de --tile)
          e a grade nasce no canto dele, então as bordas caem nas juntas.
          Tamanhos por faixa de tela:
            < 360px:  azulejo 48px, cartão 6x6 (288x288)
            ≥ 360px:  azulejo 56px, cartão 6x6 (336x336)
            ≥ 640px:  azulejo 80px, cartão 7x4 (560x320)
            ≥ 1024px: azulejo 96px, cartão 8x4 (768x384)
        */}
        <section
          id="inicio"
          className="relative flex min-h-svh items-center justify-center overflow-hidden pb-10 pt-20 [--cols:6] [--rows:6] [--tile:48px] min-[360px]:[--tile:56px] sm:[--cols:7] sm:[--rows:4] sm:[--tile:80px] lg:[--cols:8] lg:[--tile:96px]"
        >
          <div className="relative h-[calc(var(--tile)*var(--rows))] w-[calc(var(--tile)*var(--cols))] shrink-0">
            <AzulejoGrid id="azulejo-inicio" />
            <div className="relative flex h-full flex-col items-center justify-center gap-4 border-4 border-double border-primary bg-paper px-4 text-center shadow-lg sm:gap-6 sm:px-10">
              <h1 className="whitespace-nowrap font-script text-[55px] leading-none text-primary min-[360px]:text-[64px] sm:text-[92px] lg:text-[128px]">
                {wedding.brideFirstName} <span className="text-[0.7em]">&</span>{" "}
                {wedding.groomFirstName}
              </h1>
              <p className="font-serif text-lg sm:text-2xl">
                {wedding.dateLabel} · {wedding.city}
              </p>
              <Countdown target={wedding.date.toISOString()} />
            </div>
          </div>
        </section>

        <section id="historia" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-20 text-center">
          <h2 className="mb-6 font-serif text-3xl sm:text-4xl">Nossa história</h2>
          <p className="leading-relaxed">
            Em breve vamos contar aqui como tudo começou.
          </p>
        </section>

        <section id="cerimonia" className="scroll-mt-16 bg-white px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-center font-serif text-3xl sm:text-4xl">
              Cerimônia e Recepção
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <VenueCard venue={wedding.ceremony} />
              <VenueCard venue={wedding.reception} />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-sm">
        {wedding.shortNames} · {wedding.dateLabel}
      </footer>
    </>
  );
}

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-background">
      <div className="flex flex-col gap-2 p-6">
        <p className="text-sm uppercase tracking-widest text-accent">{venue.title}</p>
        <h3 className="font-serif text-2xl">{venue.name}</h3>
        <p className="font-medium">{wedding.dateLabel} às {venue.time}</p>
        <p className="text-sm">{venue.address}</p>
        <a
          href={mapsSearchUrl(venue)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 self-start rounded-full bg-accent px-5 py-2 text-sm text-white hover:opacity-90"
        >
          Como chegar
        </a>
      </div>
      <iframe
        title={`Mapa: ${venue.name}`}
        src={mapsEmbedUrl(venue)}
        className="h-64 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </article>
  );
}

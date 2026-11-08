import { Countdown } from "@/components/Countdown";
import { mapsEmbedUrl, mapsSearchUrl, wedding, type Venue } from "@/lib/wedding";

const navLinks = [
  { href: "#historia", label: "Nossa história" },
  { href: "#cerimonia", label: "Cerimônia e festa" },
];

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <a href="#inicio" className="font-script text-2xl text-accent">
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
        <section
          id="inicio"
          className="flex min-h-svh flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#8a6d3b] to-[#5c4724] px-4 text-center text-white"
        >
          <p className="text-sm uppercase tracking-[0.3em]">Vamos nos casar</p>
          <h1 className="font-script text-6xl sm:text-8xl">
            {wedding.groomFirstName} <span className="text-4xl sm:text-6xl">&</span>{" "}
            {wedding.brideFirstName}
          </h1>
          <p className="font-serif text-xl sm:text-2xl">
            {wedding.dateLabel} · {wedding.city}
          </p>
          <Countdown target={wedding.date.toISOString()} />
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
              Cerimônia e festa
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

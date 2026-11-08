import type { CSSProperties } from "react";
import Link from "next/link";
import { AzulejoGrid } from "@/components/Azulejo";
import { Countdown } from "@/components/Countdown";
import { SiteHeader } from "@/components/SiteHeader";
import { mapsEmbedUrl, mapsSearchUrl, wedding, type Venue } from "@/lib/wedding";

// Altura da parede da página inicial: a tela menos o menu (4rem), arredondada
// para baixo até um número inteiro de azulejos, com no mínimo uma fileira
// acima e uma abaixo do cartão.
const heroHeight = {
  "--h": "max(calc(var(--tile) * (var(--rows) + 2)), round(down, calc(100svh - 4rem), var(--tile)))",
} as CSSProperties;

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1 pt-16">
        {/*
          Parede de azulejos encaixada na grade:
          - a altura da parede (--h) é um número inteiro de azulejos, então ela
            começa e termina numa junta;
          - o cartão mede --cols x --rows azulejos e fica a um número inteiro de
            fileiras do topo; na horizontal a grade é ancorada na borda esquerda
            do cartão, então as quatro bordas dele caem nas juntas;
          - a borda de cima e de baixo da seção completa a meia junta que o
            azulejo desenha na própria borda.
          Tamanhos por faixa de tela:
            < 360px:  azulejo 48px, cartão 6x6 (288x288)
            ≥ 360px:  azulejo 56px, cartão 6x6 (336x336)
            ≥ 640px:  azulejo 80px, cartão 7x4 (560x320)
            ≥ 1024px: azulejo 96px, cartão 8x4 (768x384)
        */}
        <section
          id="inicio"
          className="border-y-[length:max(1px,calc(var(--tile)*0.016))] border-mist [--cols:6] [--rows:6] [--tile:48px] min-[360px]:[--tile:56px] sm:[--cols:7] sm:[--rows:4] sm:[--tile:80px] lg:[--cols:8] lg:[--tile:96px]"
          style={heroHeight}
        >
          <div className="relative h-[var(--h)] overflow-hidden">
            <div className="absolute top-0" style={{ left: "calc(50% - var(--tile) * var(--cols) / 2)" }}>
              <AzulejoGrid id="azulejo-inicio" />
            </div>
            <div
              className="relative mx-auto flex h-[calc(var(--tile)*var(--rows))] w-[calc(var(--tile)*var(--cols))] flex-col items-center justify-center gap-4 border-4 border-double border-primary bg-paper px-4 text-center shadow-lg sm:gap-6 sm:px-10"
              style={{ marginTop: "round(down, calc((var(--h) - var(--tile) * var(--rows)) / 2), var(--tile))" }}
            >
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
            Nossa vida juntos é uma viagem a dois. Conheça os portos por onde passamos até aqui.
          </p>
          <Link
            href="/nossa-historia"
            className="mt-6 inline-block rounded-full bg-accent px-6 py-2.5 text-sm text-white hover:opacity-90"
          >
            Conheça nossa história
          </Link>
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

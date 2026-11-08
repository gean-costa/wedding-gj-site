// Página TEMPORÁRIA para comparar formas de usar o azulejo. Apagar depois da escolha.
import type { Metadata } from "next";
import { AzulejoBackground, AzulejoBand, AzulejoFrame, AzulejoIcon } from "@/components/Azulejo";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = { title: "Formas de usar o azulejo" };

const options = [
  { id: "fundo", label: "1. Fundo da página inicial" },
  { id: "faixas", label: "2. Faixas entre seções" },
  { id: "molduras", label: "3. Molduras e detalhes" },
  { id: "combinacao", label: "4. Combinação" },
];

export default function AzulejoUsosPage() {
  return (
    <main className="flex-1">
      <header className="sticky top-0 z-20 border-b border-mist bg-paper/90 px-4 py-3 backdrop-blur">
        <p className="mb-2 text-center text-sm font-medium">Formas de usar o azulejo (página temporária)</p>
        <ul className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
          {options.map((o) => (
            <li key={o.id}>
              <a href={`#${o.id}`} className="block rounded-full border border-primary px-3 py-1 text-primary hover:bg-primary hover:text-white">
                {o.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      {/* 1. Fundo inteiro na página inicial; resto do site liso. */}
      <Demo index={0}>
        <section className="relative flex min-h-[75svh] items-center justify-center px-4 py-16">
          <AzulejoBackground id="fundo-hero" />
          <HeroCard />
        </section>
        <Historia />
        <Cerimonia />
      </Demo>

      {/* 2. Página inicial lisa; faixas de azulejo separando as seções. */}
      <Demo index={1}>
        <section className="flex min-h-[75svh] items-center justify-center bg-paper px-4 py-16">
          <HeroText />
        </section>
        <AzulejoBand id="faixa-1" />
        <Historia />
        <AzulejoBand id="faixa-2" />
        <Cerimonia />
        <AzulejoBand id="faixa-3" />
      </Demo>

      {/* 3. Sem fundos; azulejo como moldura de foto, borda de cartões e ícones. */}
      <Demo index={2}>
        <section className="flex min-h-[75svh] flex-col items-center justify-center gap-8 bg-paper px-4 py-16 md:flex-row md:gap-14">
          <AzulejoFrame id="moldura-foto" className="w-64 sm:w-72">
            <PhotoPlaceholder />
          </AzulejoFrame>
          <HeroText align="md:text-left md:items-start" />
        </section>
        <Historia icon />
        <Cerimonia icon framed />
      </Demo>

      {/* 4. Fundo na página inicial + faixas finas entre as seções. */}
      <Demo index={3}>
        <section className="relative flex min-h-[75svh] items-center justify-center px-4 py-16">
          <AzulejoBackground id="comb-hero" />
          <HeroCard />
        </section>
        <Historia icon />
        <AzulejoBand id="comb-faixa-1" size={24} />
        <Cerimonia icon />
        <AzulejoBand id="comb-faixa-2" size={24} />
      </Demo>
    </main>
  );
}

function Demo({ index, children }: { index: number; children: React.ReactNode }) {
  const o = options[index];
  return (
    <div id={o.id} className="scroll-mt-24 border-b-8 border-ink">
      <div className="bg-ink px-4 py-2 text-center text-sm text-white">
        <strong>{o.label}</strong>
      </div>
      {children}
    </div>
  );
}

function HeroCard() {
  return (
    <div className="relative flex max-w-xl flex-col items-center gap-5 rounded-sm border-4 border-double border-primary bg-paper px-8 py-12 text-center shadow-lg sm:px-14">
      <HeroContent />
    </div>
  );
}

function HeroText({ align = "" }: { align?: string }) {
  return <div className={`flex flex-col items-center gap-5 text-center ${align}`}><HeroContent /></div>;
}

function HeroContent() {
  return (
    <>
      <p className="text-xs uppercase tracking-[0.3em] text-stone">Vamos nos casar</p>
      <h2 className="font-script text-6xl text-primary sm:text-7xl">
        {wedding.groomFirstName} & {wedding.brideFirstName}
      </h2>
      <p className="font-serif text-lg">{wedding.dateLabel} · Belém</p>
      <span className="rounded-full bg-primary px-8 py-3 text-sm text-white">Confirmar presença</span>
    </>
  );
}

function PhotoPlaceholder() {
  return (
    <div className="flex aspect-[3/4] items-center justify-center bg-mist text-sm text-stone">
      Foto do casal
    </div>
  );
}

function SectionTitle({ children, icon }: { children: React.ReactNode; icon?: boolean }) {
  return (
    <div className="mb-8 flex flex-col items-center gap-3">
      {icon && <AzulejoIcon />}
      <h3 className="font-serif text-3xl text-ink sm:text-4xl">{children}</h3>
    </div>
  );
}

function Historia({ icon = false }: { icon?: boolean }) {
  return (
    <section className="bg-paper px-4 py-16 text-center">
      <SectionTitle icon={icon}>Nossa história</SectionTitle>
      <p className="mx-auto max-w-2xl leading-relaxed">
        Aqui vai o texto contando como tudo começou: como nos conhecemos, o primeiro encontro, o pedido…
      </p>
    </section>
  );
}

function Cerimonia({ icon = false, framed = false }: { icon?: boolean; framed?: boolean }) {
  const venues = [wedding.ceremony, wedding.reception];
  return (
    <section className="bg-white px-4 py-16">
      <SectionTitle icon={icon}>Cerimônia e festa</SectionTitle>
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {venues.map((v, i) => {
          const content = (
            <div className="flex flex-col gap-2 p-6">
              <p className="text-sm uppercase tracking-widest text-primary">{v.title}</p>
              <p className="font-serif text-2xl">{v.name}</p>
              <p>{v.time}</p>
            </div>
          );
          return framed ? (
            <AzulejoFrame key={v.name} id={`moldura-card-${i}`}>{content}</AzulejoFrame>
          ) : (
            <div key={v.name} className="rounded-xl border border-mist bg-paper">{content}</div>
          );
        })}
      </div>
    </section>
  );
}

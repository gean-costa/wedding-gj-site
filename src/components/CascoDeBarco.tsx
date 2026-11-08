// Topo das páginas com a identidade dos abridores de letras: o casco do barco,
// com listras pintadas, letreiro, floreio e a linha d'água (ondas) embaixo,
// fazendo a passagem para o fundo "rio" (bg-river) da seção seguinte.
import { Floreio, LetraDeBarco } from "@/components/LetraDeBarco";

// Listras pintadas no casco, de cima para baixo.
const hullStripes = ["h-3 bg-ink", "h-1.5 bg-paper", "h-2 bg-primary", "h-1 bg-paper", "h-1 bg-secondary"];

// `small` e `big` são as duas linhas do letreiro; `subtitle` vem logo abaixo dele.
export function CascoDeBarco({
  small,
  big,
  subtitle,
  children,
}: {
  small: string;
  big: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative bg-paper">
      {hullStripes.map((s) => (
        <div key={s} className={s} />
      ))}
      <div className="flex flex-col items-center gap-3 px-4 pb-24 pt-12 text-center sm:pt-16">
        <h1 className="flex flex-col items-center">
          {/* Tamanhos acompanham a largura da tela para caber em celulares pequenos. */}
          <LetraDeBarco className="text-[clamp(1.75rem,13vw,4rem)]">{small}</LetraDeBarco>
          <LetraDeBarco className="text-[clamp(2.75rem,18vw,8rem)]">{big}</LetraDeBarco>
        </h1>
        {subtitle && <p className="mt-1 font-serif text-xl italic text-primary sm:text-2xl">{subtitle}</p>}
        <Floreio className="mt-2 w-56 text-ink sm:w-72" />
        {children && <div className="mt-2 max-w-xl font-serif text-lg sm:text-xl">{children}</div>}
      </div>

      {/* Linha d'água: ondas do rio */}
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-20" aria-hidden>
        <path d="M0 40 Q75 15 150 40 T300 40 T450 40 T600 40 T750 40 T900 40 T1050 40 T1200 40 V80 H0 Z" fill="#98AEC3" opacity="0.5" />
        <path d="M0 55 Q75 35 150 55 T300 55 T450 55 T600 55 T750 55 T900 55 T1050 55 T1200 55 V80 H0 Z" fill="var(--river)" />
      </svg>
    </section>
  );
}

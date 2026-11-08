// Ícones dos portos da linha do tempo (traço simples, cor via currentColor).
import type { HistoriaIconName } from "@/lib/historia";

const paths: Record<HistoriaIconName, React.ReactNode> = {
  // Duas pessoas se encontrando
  encontro: (
    <>
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 21 C3 15 15 15 15 21" />
      <path d="M13 17 C14 13.5 21 13.5 21 19" />
    </>
  ),
  coracao: <path d="M12 20 C5 15 2.5 11 4 7.5 C5.5 4 10 4 12 8 C14 4 18.5 4 20 7.5 C21.5 11 19 15 12 20 Z" />,
  mala: (
    <>
      <rect x="3.5" y="8" width="17" height="11.5" rx="2" />
      <path d="M9 8 V5.5 H15 V8 M3.5 13 H20.5 M8 8 V19.5 M16 8 V19.5" />
    </>
  ),
  anel: (
    <>
      <circle cx="12" cy="15" r="5.5" />
      <path d="M9.5 6.5 L12 3.5 L14.5 6.5 L12 9.5 Z" />
    </>
  ),
  gato: (
    <>
      <path d="M5 20 V10 L4 4 L9 7.5 H15 L20 4 L19 10 V20 Z" />
      <path d="M9.5 13 V13.5 M14.5 13 V13.5 M12 16 L11 17 H13 Z" />
    </>
  ),
  igreja: (
    <>
      <path d="M12 2 V6 M10.5 3.5 H13.5" />
      <path d="M7 21 V11 L12 6.5 L17 11 V21" />
      <path d="M3.5 21 V14 L7 12 M20.5 21 V14 L17 12 M2.5 21 H21.5" />
      <path d="M10.5 21 V17 A1.5 1.5 0 0 1 13.5 17 V21" />
    </>
  ),
};

export function HistoriaIcon({ name, className = "h-6 w-6" }: { name: HistoriaIconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}

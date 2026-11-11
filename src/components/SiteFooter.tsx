// Rodapé de todas as páginas, com os bichos da família (desenho em contorno).
// - "azulejos" (página inicial): bichos sentados numa faixa de azulejos.
// - "espiando" (demais páginas): cabeças e patinhas por cima de uma faixa azul.
// O nome de cada bicho aparece ao passar o mouse (ou ao tocar, no celular).
import { AzulejoBand } from "@/components/Azulejo";
import { BichoDesenho, familia } from "@/components/Bichos";
import { wedding } from "@/lib/wedding";

type Variante = "azulejos" | "espiando";

// Largura de cada bicho por tamanho de tela (11 bichos cabem numa fileira em 320px).
const larguras = "[--w:24px] min-[375px]:[--w:28px] sm:[--w:40px] md:[--w:52px]";

export function SiteFooter({ variante = "espiando" }: { variante?: Variante }) {
  const espiando = variante === "espiando";
  return (
    <footer id="rodape" className={espiando ? "pt-6" : "pt-10"}>
      <ul className={`flex justify-center gap-px px-2 sm:gap-2 ${larguras}`}>
        {familia.map((b, i) => (
          <li key={b.id}>
            <Bicho i={i} espiando={espiando} />
          </li>
        ))}
      </ul>

      {espiando ? (
        <div className="bg-primary">
          <Assinatura claro />
        </div>
      ) : (
        <>
          <AzulejoBand id="rodape-azulejos" size={40} />
          <Assinatura />
        </>
      )}
    </footer>
  );
}

function Bicho({ i, espiando }: { i: number; espiando: boolean }) {
  const b = familia[i];
  // O primeiro e o último alinham o balão pela borda para não sair da tela.
  const lado =
    i === 0 ? "left-0" : i === familia.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2";
  // Espiando: a faixa começa em 6% da largura acima da base do desenho.
  // Azulejos: as patas encostam na borda de cima da faixa.
  const encaixe = espiando ? "mb-[calc(var(--w)*-0.06)]" : "mb-[calc(var(--w)*-0.04)]";

  return (
    // tabIndex deixa o bicho "focável": no celular o toque mostra o nome.
    <span tabIndex={0} className={`group relative z-10 block w-(--w) rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-secondary ${encaixe}`}>
      <BichoDesenho bicho={b} uid={`rodape-${b.id}`} estilo="contorno" espiando={espiando} className="block w-full" />
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-full mb-1 whitespace-nowrap rounded bg-ink px-2 py-0.5 text-xs text-white opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus:opacity-100 ${lado}`}
      >
        {b.nome}
      </span>
    </span>
  );
}

function Assinatura({ claro = false }: { claro?: boolean }) {
  return (
    <div className={`px-4 pb-8 pt-4 text-center ${claro ? "text-white" : ""}`}>
      <p className={`font-script leading-none ${claro ? "" : "text-accent"}`}>
        <span className="block whitespace-nowrap text-4xl">{wedding.shortNames}</span>
        <span className="block whitespace-nowrap text-3xl">e toda a família</span>
      </p>
      <p className={`mt-2 text-sm ${claro ? "text-white/85" : "text-stone"}`}>{wedding.dateLabel}</p>
    </div>
  );
}

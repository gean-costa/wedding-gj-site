"use client";

// Formulário de confirmação de presença em forma de bilhete de passagem de barco.
// ATENÇÃO: ainda não salva as respostas em lugar nenhum; ao enviar, só mostra o
// carimbo na tela. O armazenamento (banco de dados) é a próxima etapa.
import { useState, type FormEvent } from "react";
import { LetraDeBarco } from "@/components/LetraDeBarco";
import { wedding } from "@/lib/wedding";

type Answer = { name: string; attending: boolean; guests: number };

const field = "w-full rounded-md border border-mist bg-white px-3 py-2.5 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-secondary/50";
const label = "mb-1 block text-xs font-semibold uppercase tracking-widest text-stone";

export function RsvpTicket() {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [answer, setAnswer] = useState<Answer | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setAnswer({
      name: String(data.get("nome") ?? "").trim(),
      attending: attending === true,
      guests: Number(data.get("acompanhantes") ?? 0),
    });
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-lg bg-paper shadow-xl ring-1 ring-mist">
      {/* Cabeçalho do bilhete */}
      <div className="flex items-center justify-between gap-4 bg-primary px-5 py-3 text-white sm:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] sm:text-sm">Bilhete de passagem</span>
        <span className="font-mono text-xs opacity-80 sm:text-sm">Nº 13112027</span>
      </div>

      {/* Itinerário */}
      <dl className="grid gap-4 px-5 py-5 sm:grid-cols-3 sm:px-8">
        <div>
          <dt className={label}>Embarque</dt>
          <dd className="font-serif text-lg leading-snug">{wedding.ceremony.name}</dd>
          <dd className="text-sm">{wedding.ceremony.time}</dd>
        </div>
        <div>
          <dt className={label}>Desembarque</dt>
          <dd className="font-serif text-lg leading-snug">{wedding.reception.name}</dd>
          <dd className="text-sm">{wedding.reception.time}</dd>
        </div>
        <div>
          <dt className={label}>Data da viagem</dt>
          <dd className="font-serif text-lg leading-snug">{wedding.dateShort}</dd>
          <dd className="text-sm">{wedding.city}</dd>
        </div>
      </dl>

      {/* Picote */}
      <div className="relative" aria-hidden>
        <div className="mx-6 border-t-2 border-dashed border-mist" />
        <span className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-river" />
        <span className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-river" />
      </div>

      {answer ? (
        <Stamp answer={answer} onEdit={() => setAnswer(null)} />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-5 py-6 sm:px-8">
          <div>
            <label htmlFor="nome" className={label}>Nome do passageiro</label>
            <input id="nome" name="nome" required autoComplete="name" className={field} placeholder="Nome e sobrenome" />
          </div>

          <fieldset>
            <legend className={label}>Você vai embarcar?</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: true, text: "Sim, vou embarcar!" },
                { value: false, text: "Não poderei ir" },
              ].map((option) => (
                <label
                  key={String(option.value)}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border-2 px-4 py-3 transition-colors ${
                    attending === option.value ? "border-primary bg-secondary/20" : "border-mist bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="vai"
                    required
                    checked={attending === option.value}
                    onChange={() => setAttending(option.value)}
                    className="accent-[#667588]"
                  />
                  {option.text}
                </label>
              ))}
            </div>
          </fieldset>

          {attending && (
            <div>
              <label htmlFor="acompanhantes" className={label}>Acompanhantes (além de você)</label>
              <select id="acompanhantes" name="acompanhantes" defaultValue="0" className={field}>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n === 0 ? "Nenhum" : n}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="telefone" className={label}>Telefone / WhatsApp</label>
            <input id="telefone" name="telefone" type="tel" autoComplete="tel" className={field} placeholder="(91) 90000-0000" />
          </div>

          <div>
            <label htmlFor="recado" className={label}>Recado para os noivos (opcional)</label>
            <textarea id="recado" name="recado" rows={3} className={field} />
          </div>

          <button type="submit" className="mt-1 rounded-md bg-ink px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary">
            Confirmar embarque
          </button>
        </form>
      )}
    </div>
  );
}

function Stamp({ answer, onEdit }: { answer: Answer; onEdit: () => void }) {
  const firstName = answer.name.split(" ")[0];
  return (
    <div className="flex flex-col items-center gap-6 px-5 py-10 text-center sm:px-8">
      <div className="-rotate-6 rounded-xl border-4 border-double border-primary px-6 py-4">
        <LetraDeBarco shallow className="text-3xl sm:text-4xl">{answer.attending ? "Embarque Confirmado" : "Resposta Recebida"}</LetraDeBarco>
      </div>
      <p className="max-w-md font-serif text-lg">
        {answer.attending
          ? `Obrigado, ${firstName}! ${answer.guests > 0 ? `Sua passagem vale para você e mais ${answer.guests}. ` : ""}Nos vemos a bordo no dia ${wedding.dateShort}.`
          : `Obrigado por avisar, ${firstName}. Vamos sentir sua falta!`}
      </p>
      <button type="button" onClick={onEdit} className="text-sm text-primary underline underline-offset-4">
        Corrigir resposta
      </button>
    </div>
  );
}

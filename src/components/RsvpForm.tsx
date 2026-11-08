"use client";

// Formulário de confirmação de presença, em visual neutro (a página ainda vai
// ganhar uma identidade própria).
// ATENÇÃO: ainda não salva as respostas em lugar nenhum; ao enviar, só mostra a
// mensagem de agradecimento na tela. O armazenamento (banco de dados) é a
// próxima etapa.
import { useState, type FormEvent } from "react";
import { wedding } from "@/lib/wedding";

type Answer = { name: string; attending: boolean; guests: number };

const field = "w-full rounded-md border border-mist bg-white px-3 py-2.5 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-secondary/50";
const label = "mb-1 block text-xs font-semibold uppercase tracking-widest text-stone";

export function RsvpForm() {
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

  if (answer) {
    const firstName = answer.name.split(" ")[0];
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-mist bg-white px-6 py-10 text-center">
        <p className="font-serif text-3xl text-primary">{answer.attending ? "Presença confirmada!" : "Resposta recebida"}</p>
        <p className="max-w-md font-serif text-lg">
          {answer.attending
            ? `Obrigado, ${firstName}! ${answer.guests > 0 ? `Contamos com você e mais ${answer.guests}. ` : ""}Nos vemos no dia ${wedding.dateShort}.`
            : `Obrigado por avisar, ${firstName}. Vamos sentir sua falta!`}
        </p>
        <button type="button" onClick={() => setAnswer(null)} className="text-sm text-primary underline underline-offset-4">
          Corrigir resposta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-xl border border-mist bg-white px-5 py-6 sm:px-8">
      <div>
        <label htmlFor="nome" className={label}>Nome completo</label>
        <input id="nome" name="nome" required autoComplete="name" className={field} />
      </div>

      <fieldset>
        <legend className={label}>Você vai comparecer?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { value: true, text: "Sim, estarei lá!" },
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

      <button type="submit" className="mt-1 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink">
        Enviar confirmação
      </button>
    </form>
  );
}

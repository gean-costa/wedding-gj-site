"use client";

// Selos da página de confirmação de presença, com moldura de tamanho único e
// trocando de lugar de tempos em tempos: um selo da carta com um de fora.
//
// Como funciona:
// - A página tem 8 "lugares" (slots) de selo: 0 e 1 colados na carta,
//   2 a 4 na coluna da esquerda e 5 a 7 na da direita (no celular, 2 a 7
//   viram uma grade abaixo da carta).
// - `ordem[slot]` diz qual ponto turístico está em cada lugar.
// - A cada TROCA_MS, um lugar da carta e um de fora (sorteados) somem,
//   trocam de desenho e voltam. É uma troca por vez.
//   A moldura e a inclinação são do lugar, então o layout nunca muda.
// - Quem pediu ao sistema para reduzir animações vê os selos parados.
import { createContext, useContext, useEffect, useState } from "react";
import {
  BasilicaNazare,
  CasaOnzeJanelas,
  EstacaoDasDocas,
  FortePresepio,
  MercadoSaoBras,
  RelogioVerOPeso,
  SeloPostal,
  TheatroDaPaz,
  VerOPeso,
} from "@/components/BelemIlustracoes";

const pontos = [
  { title: "Theatro da Paz", C: TheatroDaPaz },
  { title: "Mercado de Ferro", C: VerOPeso },
  { title: "Casa das Onze Janelas", C: CasaOnzeJanelas },
  { title: "Basílica de Nazaré", C: BasilicaNazare },
  { title: "Forte do Presépio", C: FortePresepio },
  { title: "Estação das Docas", C: EstacaoDasDocas },
  { title: "Praça do Relógio", C: RelogioVerOPeso },
  { title: "Mercado de São Brás", C: MercadoSaoBras },
];

const TROCA_MS = 7500; // intervalo entre trocas
const SUMIR_MS = 500; // duração do sumir/aparecer (igual ao duration-500 abaixo)

type Estado = { ordem: number[]; trocando: number[] };
const SelosContext = createContext<Estado>({ ordem: pontos.map((_, i) => i), trocando: [] });

export function SelosProvider({ children }: { children: React.ReactNode }) {
  // Começa sempre na mesma ordem (igual no servidor e no navegador);
  // o sorteio só acontece depois, no navegador.
  const [estado, setEstado] = useState<Estado>({ ordem: pontos.map((_, i) => i), trocando: [] });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // O lugar 0 da carta só aparece a partir de sm (640px); no celular só o 1.
    const telaSm = window.matchMedia("(min-width: 640px)");

    let voltar: ReturnType<typeof setTimeout> | undefined;
    const intervalo = setInterval(() => {
      // Um selo da carta (visível) troca com um selo de fora (lugares 2 a 7).
      const daCarta = telaSm.matches ? [0, 1] : [1];
      const a = daCarta[Math.floor(Math.random() * daCarta.length)];
      const b = 2 + Math.floor(Math.random() * (pontos.length - 2));

      // 1) os dois somem; 2) trocam de desenho e voltam.
      setEstado((s) => ({ ...s, trocando: [a, b] }));
      voltar = setTimeout(() => {
        setEstado((s) => {
          const ordem = [...s.ordem];
          [ordem[a], ordem[b]] = [ordem[b], ordem[a]];
          return { ordem, trocando: [] };
        });
      }, SUMIR_MS);
    }, TROCA_MS);

    return () => {
      clearInterval(intervalo);
      clearTimeout(voltar);
    };
  }, []);

  return <SelosContext.Provider value={estado}>{children}</SelosContext.Provider>;
}

// Tamanho da janela do desenho (proporção 4:3 em todos os selos).
const tamanhos = {
  carta: "w-14 min-[375px]:w-20",
  lateral: "w-40",
  grade: "w-24 sm:w-28",
};

export function SeloTrocando({
  slot,
  tamanho,
  rotate = 0,
}: {
  slot: number;
  tamanho: keyof typeof tamanhos;
  rotate?: number;
}) {
  const { ordem, trocando } = useContext(SelosContext);
  const { title, C } = pontos[ordem[slot]];
  const sumindo = trocando.includes(slot);

  return (
    <div className={`transition duration-500 ease-in-out ${sumindo ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}>
      <SeloPostal title={title} rotate={rotate} small={tamanho !== "lateral"} uniforme>
        {/* O desenho se ajusta dentro da janela sem distorcer, centralizado. */}
        <div className={`aspect-[4/3] ${tamanhos[tamanho]}`}>
          <C variant="selo" className="h-full w-full" />
        </div>
      </SeloPostal>
    </div>
  );
}

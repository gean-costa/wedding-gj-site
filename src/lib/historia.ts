// Portos (datas importantes) da linha do tempo da página "Nossa história".
// Edite aqui: os itens aparecem na ordem desta lista. Os textos abaixo são
// PROVISÓRIOS, à espera das datas e histórias reais do casal.
//
// `icon` escolhe o desenho do porto: "encontro", "coracao", "mala", "anel",
// "gato" ou "igreja" (ver src/components/HistoriaIcon.tsx).

import { wedding } from "@/lib/wedding";

export type HistoriaIconName = "encontro" | "coracao" | "mala" | "anel" | "gato" | "igreja";

export type Porto = {
  date: string;
  title: string;
  text: string;
  icon: HistoriaIconName;
};

export const portos: Porto[] = [
  {
    date: "Data a definir",
    title: "Quando nos conhecemos",
    text: "Texto provisório: contem aqui onde e como vocês se conheceram.",
    icon: "encontro",
  },
  {
    date: "Data a definir",
    title: "Pedido de namoro",
    text: "Texto provisório: como foi o pedido de namoro.",
    icon: "coracao",
  },
  {
    date: "Data a definir",
    title: "Primeira viagem juntos",
    text: "Texto provisório: para onde foi a primeira viagem a dois.",
    icon: "mala",
  },
  {
    date: "Data a definir",
    title: "Pedido de casamento",
    text: "Texto provisório: como foi o pedido de casamento.",
    icon: "anel",
  },
  {
    date: "Data a definir",
    title: "Chegada dos gatos",
    text: "Texto provisório: quando os gatos entraram para a tripulação.",
    icon: "gato",
  },
];

// Último porto, sempre ao final: o casamento.
export const proximoPorto: Porto = {
  date: wedding.dateShort,
  title: "O casamento",
  text: `${wedding.ceremony.name}, ${wedding.ceremony.time}. O próximo porto da nossa viagem, e queremos você a bordo.`,
  icon: "igreja",
};

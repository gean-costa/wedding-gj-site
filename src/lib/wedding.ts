// Dados centrais do casamento. Altere aqui e o site inteiro se atualiza.

export type Venue = {
  title: string;
  name: string;
  time: string;
  address: string;
};

export const wedding = {
  bride: "Juliana Silva",
  groom: "Gean Costa",
  groomFirstName: "Gean",
  brideFirstName: "Juliana",
  // Ordem de exibição: noiva primeiro.
  shortNames: "Juliana & Gean",
  // Belém fica em UTC-3 o ano todo (sem horário de verão).
  date: new Date("2027-11-13T19:30:00-03:00"),
  dateLabel: "13 de novembro de 2027",
  city: "Belém - PA",
  ceremony: {
    title: "Cerimônia",
    name: "Paróquia Santíssima Trindade",
    time: "19h30",
    address: "Praça Barão do Rio Branco, 71 - Campina, Belém - PA, 66015-060",
  } satisfies Venue,
  reception: {
    title: "Recepção",
    name: "Alfajor Buffet",
    time: "21h00",
    address: "R. Ferreira Cantão, 451 - Gama Abreu, Belém - PA, 66015-280",
  } satisfies Venue,
};

export function mapsSearchUrl(venue: Venue) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.name}, ${venue.address}`,
  )}`;
}

export function mapsEmbedUrl(venue: Venue) {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    `${venue.name}, ${venue.address}`,
  )}&output=embed`;
}

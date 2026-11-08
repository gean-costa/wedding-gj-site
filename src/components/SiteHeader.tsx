"use client";

import Link from "next/link";
import { useState } from "react";
import { wedding } from "@/lib/wedding";

const links = [
  { href: "/#historia", label: "Nossa história" },
  { href: "/#cerimonia", label: "Cerimônia e Recepção" },
  { href: "/confirmar-presenca", label: "Confirmar presença" },
];

// Menu fixo no topo (altura h-16; as páginas compensam com pt-16).
// A partir de md mostra os links; abaixo disso, um botão ☰ abre a lista.
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-background/90 backdrop-blur">
      <nav className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" onClick={close} className="whitespace-nowrap font-script text-3xl text-accent">
          {wedding.shortNames}
        </Link>

        <ul className="hidden gap-6 text-sm md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-accent">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="rounded-md px-3 py-1 text-2xl text-accent md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>

        {open && (
          <ul className="absolute inset-x-4 top-full rounded-md border border-mist bg-paper p-2 shadow-lg md:hidden">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={close} className="block rounded px-3 py-3 hover:bg-mist/40">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

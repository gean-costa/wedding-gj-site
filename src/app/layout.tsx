import type { Metadata } from "next";
import { Geist, Great_Vibes, Playfair_Display } from "next/font/google";
import { wedding } from "@/lib/wedding";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${wedding.shortNames} | ${wedding.dateLabel}`,
  description: `Casamento de ${wedding.groom} e ${wedding.bride} em ${wedding.city}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${playfair.variable} ${greatVibes.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Italianno, Playfair_Display } from "next/font/google";
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

const italianno = Italianno({
  variable: "--font-italianno",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${wedding.shortNames} | ${wedding.dateLabel}`,
  description: `Casamento de ${wedding.bride} e ${wedding.groom} em ${wedding.city}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${playfair.variable} ${italianno.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

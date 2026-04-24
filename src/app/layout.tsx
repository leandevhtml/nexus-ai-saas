import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NexusAI — Análise de Dados com IA Local",
  description:
    "Transforme seus dados em decisões inteligentes com modelos de IA que rodam 100% no seu ambiente. Privacidade total, velocidade máxima.",
  keywords: [
    "IA",
    "análise de dados",
    "inteligência artificial",
    "LLM",
    "privacidade",
    "on-premise",
  ],
  openGraph: {
    title: "NexusAI — Análise de Dados com IA Local",
    description:
      "Transforme seus dados em decisões inteligentes com modelos de IA que rodam 100% no seu ambiente.",
    type: "website",
  },
};

import CookieConsent from "@/components/CookieConsent";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <div className="flex-1 flex flex-col overflow-x-hidden">
            {children}
          </div>
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}

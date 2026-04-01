import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import { authClient } from "@/lib/auth/client";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FENET — Federação Nacional dos Estudantes em Ensino Técnico",
  description:
    "Portal de notícias e informações da FENET. Representando estudantes técnicos de todo o Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased`}>
        <NeonAuthUIProvider
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          authClient={authClient as any}
        >
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}

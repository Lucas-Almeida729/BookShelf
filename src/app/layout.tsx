// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookShelf App",
  description: "Gerencie sua biblioteca pessoal de livros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider>
          <Navbar />
          {/* AQUI ESTÁ A CORREÇÃO FINAL:
            - pt-32: Adiciona um espaçamento grande no topo para ecrãs pequenos (mobile).
            - md:pt-24: Em ecrãs de tamanho médio para cima, o espaçamento diminui.
          */}
          <main className="flex-grow pt-32 md:pt-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
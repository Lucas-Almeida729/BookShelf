// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // 1. Importar o novo componente Footer
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
      {/* 2. Adicionar classes para garantir que o rodapé fique no fundo */}
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider>
          <Navbar />
          {/* 3. A classe 'flex-grow' faz o conteúdo principal expandir e empurrar o rodapé para baixo */}
          <main className="pt-20 flex-grow">
            {children}
          </main>
          <Footer /> {/* 4. Adicionar o componente Footer aqui */}
        </ThemeProvider>
      </body>
    </html>
  );
}
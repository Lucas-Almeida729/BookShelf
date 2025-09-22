// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { BookProvider } from "@/context/BookContext"; // 1. Importe o provider

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
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* 2. Envolva a aplicação com o BookProvider */}
        <BookProvider> 
          <Navbar />
          {children}
        </BookProvider>
      </body>
    </html>
  );
}
// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md border-b z-50">
      {/* A MUDANÇA: 
        - Adicionamos 'flex-wrap' para permitir que os itens quebrem para a linha de baixo.
        - 'justify-center' alinha tudo ao centro em telas pequenas.
        - 'md:justify-between' volta a alinhar os itens nas extremidades em telas médias e maiores.
      */}
      <div className="container mx-auto flex justify-center md:justify-between items-center flex-wrap gap-4 md:gap-0">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400"
        >
          BookShelf
        </Link>

        <div className="flex items-center space-x-2">
          <Button
            asChild
            variant="ghost"
            className={pathname === "/" ? "bg-secondary" : ""}
          >
            <Link href="/">Home</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={
              pathname.startsWith("/biblioteca") ||
              pathname.startsWith("/livros")
                ? "bg-secondary"
                : ""
            }
          >
            <Link href="/biblioteca">Biblioteca</Link>
          </Button>
          <Button asChild variant="default">
            <Link href="/livros/novo">Adicionar Livro</Link>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle"; // 1. Importe o ThemeToggle

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md border-b">
      <div className="container mx-auto flex justify-between items-center">
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

          {/* 2. Adicione o componente aqui */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

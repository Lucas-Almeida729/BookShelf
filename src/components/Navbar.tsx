// src/components/Navbar.tsx
"use client"; // Marca como componente de cliente para usar 'next/navigation' e 'next/link'

import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook para saber a rota atual
import { Button } from "@/components/ui/button"; // Importa o componente Button do shadcn/ui
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname(); // Obtém a rota atual (ex: "/", "/biblioteca")

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md border-b">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ou Nome do App */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          BookShelf
        </Link>

        {/* Links de Navegação */}
        <div className="flex items-center space-x-4">
          <Button
            asChild
            variant="ghost"
            className={
              pathname === "/" ? "text-primary" : "hover:text-primary/80"
            }
          >
            <Link href="/">Home</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={
              pathname.startsWith("/biblioteca") ||
              pathname.startsWith("/livros")
                ? "text-primary"
                : "hover:text-primary/80"
            }
          >
            <Link href="/biblioteca">Biblioteca</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/livros/novo">Adicionar Livro</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

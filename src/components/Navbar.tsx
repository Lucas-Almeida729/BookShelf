// src/components/Navbar.tsx
"use client"; // Marca como componente de cliente para usar 'next/navigation' e 'next/link'

import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook para saber a rota atual
import { Button } from "@/components/ui/button"; // Importa o componente Button do shadcn/ui

export default function Navbar() {
  const pathname = usePathname(); // Obtém a rota atual (ex: "/", "/biblioteca")

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ou Nome do App */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          BookShelf
        </Link>

        {/* Links de Navegação */}
        <div className="flex space-x-4">
          <Button asChild variant="ghost" className={pathname === "/" ? "text-blue-300" : "text-white hover:text-blue-200"}>
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="ghost" className={pathname.startsWith("/biblioteca") || pathname.startsWith("/livros") ? "text-blue-300" : "text-white hover:text-blue-200"}>
            <Link href="/biblioteca">Biblioteca</Link>
          </Button>
          {/* Futuramente, pode ter um botão para adicionar livro aqui */}
          {/* <Button asChild variant="secondary">
            <Link href="/livros/novo">Adicionar Livro</Link>
          </Button> */}
        </div>
      </div>
    </nav>
  );
}
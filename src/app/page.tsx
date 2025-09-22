// src/app/page.tsx
"use client";

import Link from 'next/link';
import { useBooks } from "@/context/BookContext";
import DashboardCard from "@/components/DashboardCard";
import { Book, Library, PauseCircle, PlayCircle, XCircle } from "lucide-react";

export default function HomePage() {
  const { books } = useBooks();

  const totalLivros = books.length;
  const livrosLendo = books.filter(book => book.status === 'LENDO').length;
  const livrosFinalizados = books.filter(book => book.status === 'LIDO').length;
  const livrosPausados = books.filter(book => book.status === 'PAUSADO').length;
  const livrosAbandonados = books.filter(book => book.status === 'ABANDONADO').length;

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Meus Livros</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card para Total de Livros */}
        <Link href="/biblioteca" className="group">
          <DashboardCard 
            title="Total de Livros"
            count={totalLivros}
            Icon={Library}
            className="hover:border-blue-500 hover:bg-blue-500"
          />
        </Link>

        {/* Card para Livros Lendo */}
        <Link href="/biblioteca?status=LENDO" className="group">
          <DashboardCard 
            title="Lendo Atualmente"
            count={livrosLendo}
            Icon={PlayCircle}
            className="hover:border-yellow-500 hover:bg-yellow-500"
          />
        </Link>

        {/* Card para Livros Finalizados */}
        <Link href="/biblioteca?status=LIDO" className="group">
          <DashboardCard 
            title="Livros Finalizados"
            count={livrosFinalizados}
            Icon={Book}
            className="hover:border-green-500 hover:bg-green-500"
          />
        </Link>
        
        {/* Card para Livros Pausados */}
        <Link href="/biblioteca?status=PAUSADO" className="group">
          <DashboardCard 
            title="Pausados"
            count={livrosPausados}
            Icon={PauseCircle}
            className="hover:border-orange-500 hover:bg-orange-500"
          />
        </Link>

        {/* Card para Livros Abandonados */}
        <Link href="/biblioteca?status=ABANDONADO" className="group">
          <DashboardCard 
            title="Abandonados"
            count={livrosAbandonados}
            Icon={XCircle}
            className="hover:border-red-500 hover:bg-red-500"
          />
        </Link>
      </div>
    </main>
  );
}
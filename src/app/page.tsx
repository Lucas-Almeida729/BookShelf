// src/app/page.tsx
"use client"; // Precisamos do 'use client' para o Link do Next.js

import Link from 'next/link';
import { initialBooks } from "@/lib/mock-data";
import DashboardCard from "@/components/DashboardCard";
import { Book, Library, PauseCircle, PlayCircle, XCircle } from "lucide-react";

export default function HomePage() {
  const totalLivros = initialBooks.length;
  const livrosLendo = initialBooks.filter(book => book.status === 'LENDO').length;
  const livrosFinalizados = initialBooks.filter(book => book.status === 'LIDO').length;
  const livrosPausados = initialBooks.filter(book => book.status === 'PAUSADO').length;
  const livrosAbandonados = initialBooks.filter(book => book.status === 'ABANDONADO').length;

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Meu Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card para Total de Livros */}
        <Link href="/biblioteca">
          <DashboardCard 
            title="Total de Livros"
            count={totalLivros}
            Icon={Library}
            className="hover:border-blue-500"
          />
        </Link>

        {/* Card para Livros Lendo */}
        <Link href="/biblioteca?status=LENDO">
          <DashboardCard 
            title="Lendo Atualmente"
            count={livrosLendo}
            Icon={PlayCircle}
            className="hover:border-yellow-500"
          />
        </Link>

        {/* Card para Livros Finalizados */}
        <Link href="/biblioteca?status=LIDO">
          <DashboardCard 
            title="Livros Finalizados"
            count={livrosFinalizados}
            Icon={Book}
            className="hover:border-green-500"
          />
        </Link>
        
        {/* Card para Livros Pausados */}
        <Link href="/biblioteca?status=PAUSADO">
          <DashboardCard 
            title="Pausados"
            count={livrosPausados}
            Icon={PauseCircle}
            className="hover:border-orange-500"
          />
        </Link>

        {/* Card para Livros Abandonados */}
        <Link href="/biblioteca?status=ABANDONADO">
          <DashboardCard 
            title="Abandonados"
            count={livrosAbandonados}
            Icon={XCircle}
            className="hover:border-red-500"
          />
        </Link>
      </div>
    </main>
  );
}
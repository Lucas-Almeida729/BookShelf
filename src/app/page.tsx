// src/app/page.tsx
import Link from "next/link";
import DashboardCard from "@/components/DashboardCard";
// 1. Importe o novo ícone BookmarkPlus de lucide-react
import {
  Book,
  Library,
  PauseCircle,
  PlayCircle,
  XCircle,
  BookmarkPlus,
} from "lucide-react";
import { fetchBooks } from "@/lib/data";

export default async function HomePage() {
  const books = await fetchBooks();

  const totalLivros = books.length;
  // 2. Adicione o cálculo para os livros "Quero Ler"
  const livrosQueroLer = books.filter(
    (book) => book.status === "QUERO LER"
  ).length;
  const livrosLendo = books.filter((book) => book.status === "LENDO").length;
  const livrosFinalizados = books.filter(
    (book) => book.status === "LIDO"
  ).length;
  const livrosPausados = books.filter(
    (book) => book.status === "PAUSADO"
  ).length;
  const livrosAbandonados = books.filter(
    (book) => book.status === "ABANDONADO"
  ).length;

  return (
    <main className="container mx-auto p-10 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Meus Livros</h1>

      {/* 3. Ajuste o grid para acomodar 6 itens (lg:grid-cols-6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/biblioteca" className="group">
          <DashboardCard
            title="Total de Livros"
            count={totalLivros}
            Icon={Library}
            className="hover:border-purple-500 hover:bg-purple-500"
          />
        </Link>

        {/* 4. Adicione o novo card para "Quero Ler" */}
        <Link href="/biblioteca?status=QUERO%20LER" className="group">
          <DashboardCard
            title="Quero Ler"
            count={livrosQueroLer}
            Icon={BookmarkPlus}
            className="hover:border-blue-500 hover:bg-blue-500"
          />
        </Link>

        <Link href="/biblioteca?status=LENDO" className="group">
          <DashboardCard
            title="Lendo Atualmente"
            count={livrosLendo}
            Icon={PlayCircle}
            className="hover:border-yellow-500 hover:bg-yellow-500"
          />
        </Link>
        <Link href="/biblioteca?status=LIDO" className="group">
          <DashboardCard
            title="Livros Finalizados"
            count={livrosFinalizados}
            Icon={Book}
            className="hover:border-green-500 hover:bg-green-500"
          />
        </Link>
        <Link href="/biblioteca?status=PAUSADO" className="group">
          <DashboardCard
            title="Pausados"
            count={livrosPausados}
            Icon={PauseCircle}
            className="hover:border-orange-500 hover:bg-orange-500"
          />
        </Link>
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

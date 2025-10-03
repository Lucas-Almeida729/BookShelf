// src/app/page.tsx

import { getBookStats, getReadingNow, getRecentBooks } from "@/lib/database";
import StatsCards from "@/components/StatsCards";
import ReadingProgress from "@/components/ReadingProgress";
import RecentBooks from "@/components/RecentBooks";

// Note o "async". A página vai esperar os dados do banco carregarem.
export default async function DashboardPage() {
  // Chamamos todas as nossas novas funções em paralelo para mais performance
  const [stats, readingNow, recentBooks] = await Promise.all([
    getBookStats(),
    getReadingNow(),
    getRecentBooks(),
  ]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Mihha Biblioteca</h1>
        <p className="text-muted-foreground">
          Bem-vindo(a) de volta! Aqui está um resumo da sua estante.
        </p>
      </div>

      {/* 1. Cartões de Estatísticas */}
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* 2. Livros Adicionados Recentemente */}
          <RecentBooks recentBooks={recentBooks} />
        </div>

        <div>
          {/* 3. Progresso de Leitura Atual */}
          <ReadingProgress readingNow={readingNow} />
        </div>
      </div>
    </div>
  );
}

// src/app/page.tsx

import Link from 'next/link';
import { getBookStats, getReadingNow, getRecentBooks } from "@/lib/database";
import StatsCards from "@/components/StatsCards";
import ReadingProgress from "@/components/ReadingProgress";
import RecentBooks from "@/components/RecentBooks";
import { BookOpen } from 'lucide-react';

export default async function DashboardPage() {
  const [stats, readingNow, recentBooks] = await Promise.all([
    getBookStats(),
    getReadingNow(),
    getRecentBooks(),
  ]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      
      {/* --- LINHA SUPERIOR (Texto e Estatística de Destaque) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Coluna da Esquerda: Texto de Boas-vindas */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Bem-vindo(a) de volta! Aqui está um resumo da sua estante.
          </p>
        </div>

        {/* Coluna da Direita: Estatística de Páginas Lidas (versão discreta) */}
        <Link href="/biblioteca?status=LIDO" className="group rounded-lg p-4 transition-colors hover:bg-accent">
          <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
              <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-5 w-5" />
                  <p className="text-sm font-semibold">Páginas Lidas</p>
              </div>
              <p className="text-5xl font-bold text-primary">{stats.pagesRead.toLocaleString('pt-BR')}</p>
          </div>
        </Link>
      </div>
      
      {/* --- LINHA INTERMEDIÁRIA (Grelha de 6 Cards) --- */}
      <div>
        <StatsCards stats={stats} />
      </div>

      {/* --- LINHA INFERIOR (Adicionados Recentemente e Progresso) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentBooks recentBooks={recentBooks} />
        </div>
        
        <div>
          <ReadingProgress readingNow={readingNow} />
        </div>
      </div>
    </div>
  );
}
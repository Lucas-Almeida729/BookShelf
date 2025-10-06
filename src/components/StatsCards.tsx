// src/components/StatsCards.tsx

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookCheck, 
  Glasses, 
  Book, 
  BookmarkPlus,
  PauseCircle,
  XCircle 
} from "lucide-react";

interface StatsCardsProps {
  stats: {
    totalBooks: number;
    booksRead: number;
    booksReading: number;
    booksToRead: number;
    booksPaused: number;
    booksAbandoned: number;
  };
}

// Componente auxiliar para os cards de status
const StatCard = ({ href, title, icon: Icon, value, description }: { href: string, title: string, icon: React.ElementType, value: string | number, description: string }) => (
  <Link href={href} className="group">
    <Card className="transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

// Este componente agora renderiza apenas a grelha de 6 cards
export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard 
        href="/biblioteca"
        title="Total de Livros"
        icon={Book}
        value={stats.totalBooks}
        description="livros na sua estante"
      />
      <StatCard 
        href="/biblioteca?status=LENDO"
        title="Lendo Atualmente"
        icon={Glasses}
        value={stats.booksReading}
        description="livros em andamento"
      />
      <StatCard 
        href="/biblioteca?status=LIDO"
        title="Livros Lidos"
        icon={BookCheck}
        value={stats.booksRead}
        description="livros concluídos"
      />
      <StatCard 
        href="/biblioteca?status=QUERO_LER"
        title="Quero Ler"
        icon={BookmarkPlus}
        value={stats.booksToRead}
        description="livros na sua lista"
      />
      <StatCard 
        href="/biblioteca?status=PAUSADO"
        title="Pausados"
        icon={PauseCircle}
        value={stats.booksPaused}
        description="leituras em pausa"
      />
      <StatCard 
        href="/biblioteca?status=ABANDONADO"
        title="Abandonados"
        icon={XCircle}
        value={stats.booksAbandoned}
        description="leituras abandonadas"
      />
    </div>
  );
}
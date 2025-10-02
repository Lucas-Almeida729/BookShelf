// src/components/ReadingProgress.tsx

import Link from "next/link";
import Image from "next/image";
import { Book } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // **Atenção aqui!**

// **Atenção:** Pode ser que você não tenha o componente Progress.
// Se o VS Code mostrar erro, pegue o código dele no projeto de referência:
// BookShelf_teste/src/components/ui/progress.tsx

interface ReadingProgressProps {
  readingNow: Book[];
}

export default function ReadingProgress({ readingNow }: ReadingProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresso da Leitura</CardTitle>
      </CardHeader>
      <CardContent>
        {readingNow.length > 0 ? (
          <ul className="space-y-4">
            {readingNow.map((book) => {
              const progress = (book.pages && book.currentPage)
                ? Math.round((book.currentPage / book.pages) * 100)
                : 0;
              return (
                <li key={book.id}>
                  <Link href={`/livros/${book.id}`} className="flex items-center gap-4 group">
                    <div className="w-10 h-14 relative flex-shrink-0">
                       {book.cover ? (
                           <Image src={book.cover} alt={book.title} layout="fill" className="object-cover rounded-sm" />
                       ) : (
                           <div className="w-full h-full bg-gray-200 rounded-sm" />
                       )}
                    </div>
                    <div className="w-full">
                      <p className="font-semibold truncate group-hover:underline">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={progress} className="w-full" />
                        <span className="text-xs text-muted-foreground">{progress}%</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-center text-muted-foreground">
            Você não está lendo nenhum livro no momento.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
// src/components/RecentBooks.tsx

import Link from "next/link";
import Image from "next/image";
import { Book } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RecentBooksProps {
  recentBooks: Book[];
}

export default function RecentBooks({ recentBooks }: RecentBooksProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Adicionados Recentemente</CardTitle>
        <Button asChild variant="link">
          <Link href="/biblioteca">Ver todos</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {recentBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentBooks.map((book) => (
              <Link href={`/livros/${book.id}`} key={book.id} className="group">
                <div className="aspect-[2/3] relative">
                  {book.cover ? (
                    <Image
                      src={book.cover}
                      alt={book.title}
                      layout="fill"
                      className="object-cover rounded-md group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                       <span className="text-xs text-gray-500 text-center p-1">{book.title}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-center text-muted-foreground">
            Nenhum livro adicionado ainda.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
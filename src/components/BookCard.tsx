"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Eye, Edit, Trash2, BookOpen } from "lucide-react";
import { Book } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStatusColor, getStatusLabel } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  onDelete?: (book: Book) => void;
}

export function BookCard({ book, onDelete }: BookCardProps) {
  return (
    <Card className="group relative flex flex-col h-full overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/livros/${book.id}`} className="flex flex-col h-full">
        {/* Capa e Badges */}
        <div className="relative aspect-[3/4] w-full">
          {book.cover ? (
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 16vw, 12.5vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          <div
            className={`absolute top-2 left-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(
              book.status
            )}`}
          >
            {getStatusLabel(book.status)}
          </div>
        </div>

        {/* Informações do Livro */}
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
            {book.author}
          </p>

          {/* Sinopse */}
          {book.synopsis && (
            <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed flex-grow">
              {book.synopsis}
            </p>
          )}

          {/* Rodapé do Card */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
            <div className="flex items-center gap-1">
              {book.rating && book.rating > 0 ? (
                <>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold">{book.rating}</span>
                </>
              ) : (
                <div className="h-4"></div>
              )}
            </div>
            <Link href={`/livros/${book.id}/editar`}>
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <Edit className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </Link>
    </Card>
  );
}

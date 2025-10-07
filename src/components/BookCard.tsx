"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Edit, Trash2, BookOpen } from "lucide-react";
import { Book } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import { deleteBookAction } from "@/lib/actions";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const deleteAction = deleteBookAction.bind(null, book.id);

  return (
    <Card className="group flex overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      
      {/* Coluna da Imagem (Esquerda) - Estrutura Corrigida e Definitiva */}
      <Link href={`/livros/${book.id}`} className="block w-24 flex-shrink-0 md:w-28">
        <div className="relative aspect-[3/4] w-full">
          {book.cover ? (
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover"
              sizes="112px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
      </Link>

      {/* Coluna de Conteúdo (Direita) */}
      <div className="relative flex min-w-0 flex-grow flex-col p-3">
        <div
          className={`absolute top-2 left-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white ${getStatusColor(
            book.status
          )}`}
        >
          {getStatusLabel(book.status)}
        </div>

        <Link href={`/livros/${book.id}`} className="flex-grow">
          <h3 className="mt-7 line-clamp-2 text-sm font-semibold leading-tight">
            {book.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
            {book.author}
          </p>

          {book.synopsis && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {book.synopsis}
            </p>
          )}
        </Link>
        
        {/* Rodapé do Card com os botões */}
        <div className="mt-auto flex items-center justify-end border-t border-border pt-2">
          {book.rating && book.rating > 0 && (
            <div className="mr-auto flex items-center gap-1 text-xs">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{book.rating}</span>
            </div>
          )}
          
          <Link href={`/livros/${book.id}/editar`} onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <Edit className="h-3 w-3" />
            </Button>
          </Link>
          
          <form action={deleteAction} className="flex items-center">
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-destructive hover:text-destructive"
              aria-label="Apagar livro"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}
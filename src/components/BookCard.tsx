"use client";

import Link from "next/link";
import Image from "next/image";
// AQUI ESTÁ A CORREÇÃO: Adicionamos o ícone 'Trash2' de volta
import { Star, Edit, BookOpen, Trash2 } from "lucide-react";
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
    <Card className="group relative flex overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      {/* Coluna da Imagem (Esquerda) */}
      <Link href={`/livros/${book.id}`} className="relative w-24 md:w-28 flex-shrink-0">
        <div className="aspect-[3/4] w-full">
          {book.cover ? (
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover"
              sizes="120px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
      </Link>

      {/* Coluna de Conteúdo (Direita) */}
      <div className="p-3 flex flex-col flex-grow w-full min-w-0">
        <div
          className={`absolute top-2 left-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(
            book.status
          )}`}
        >
          {getStatusLabel(book.status)}
        </div>

        <Link href={`/livros/${book.id}`} className="flex-grow">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 mt-7">
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {book.author}
          </p>

          {book.synopsis && (
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
              {book.synopsis}
            </p>
          )}
        </Link>
        
        {/* Rodapé do Card com os botões */}
        <div className="flex items-center justify-end mt-2 pt-2 border-t border-border">
          {book.rating && book.rating > 0 && (
            <div className="flex items-center gap-1 text-xs mr-auto">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{book.rating}</span>
            </div>
          )}
          
          <Link href={`/livros/${book.id}/editar`}>
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
              {/* AQUI ESTÁ A CORREÇÃO: O ícone 'Trash2' foi restaurado */}
              <Trash2 className="h-3 w-3" />
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}
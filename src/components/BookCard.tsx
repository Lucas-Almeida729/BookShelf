"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Eye, Edit, Trash2, BookOpen, FileText } from "lucide-react";
import { Book } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStatusColor, getStatusLabel, getReadingProgress } from "@/lib/utils";

interface BookWithGenre extends Book {}

interface BookCardProps {
  book: BookWithGenre;
  onEdit?: (book: BookWithGenre) => void;
  onDelete?: (book: BookWithGenre) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const progress = getReadingProgress(book.currentPage || 0, book.pages || 0);

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative">
          {/* AQUI ESTÁ A MUDANÇA: Adicionamos o Link envolvendo a capa */}
          <Link href={`/livros/${book.id}`} aria-label={`Ver detalhes de ${book.title}`}>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg">
              {book.cover ? (
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                    book.status
                  )}`}
                >
                  {getStatusLabel(book.status)}
                </span>
              </div>

              {/* Rating */}
              {book.rating && book.rating > 0 && (
                <div className="absolute top-2 right-2 bg-black/50 rounded-full px-2 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-white text-xs font-medium">
                      {book.rating}
                    </span>
                  </div>
                </div>
              )}

              {/* Progress Bar for Reading Books */}
              {book.status === "LENDO" && book.pages && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                  <div className="flex justify-between text-white text-xs mb-1">
                    <span>{progress}%</span>
                    <span>
                      {book.currentPage || 0}/{book.pages}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div
                      className="bg-white h-1 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Link>

          {/* Book Info */}
          <div className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm line-clamp-2 leading-tight">
                {book.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {book.author}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span className="truncate pr-2">{book.genre}</span>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {book.year && <span>{book.year}</span>}
                  {book.pages && book.pages > 0 && (
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {book.pages}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <Link href={`/livros/${book.id}`}>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Eye className="h-3 w-3 mr-1" />
                  Ver
                </Button>
              </Link>

              <div className="flex space-x-1">
                <Link href={`/livros/${book.id}/editar`}>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Edit className="h-3 w-3" />
                  </Button>
                </Link>

                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-destructive hover:text-destructive"
                    onClick={() => onDelete(book)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
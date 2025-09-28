// src/app/livros/[id]/page.tsx
"use client";

import { use } from 'react';
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/StarRating";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useBooks } from "@/context/BookContext";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function DetalhesLivroPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { getBookById } = useBooks();
  const book = getBookById(resolvedParams.id);

  if (!book) {
    return <div className="text-center mt-10">Livro não encontrado!</div>;
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative w-full aspect-[2/3] shadow-lg bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Image
              // --- LINHA CORRIGIDA ---
              src={book.cover ? book.cover : 'https://via.placeholder.com/300x400.png?text=Sem+Capa'}
              alt={`Capa do livro ${book.title}`}
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg p-4"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Button asChild className="w-full">
              <Link href={`/livros/${book.id}/editar`}>Editar</Link>
            </Button>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <h2 className="text-xl text-muted-foreground mb-4">{book.author}</h2>
          <div className="flex items-center gap-4 mb-6">
            {book.rating && <StarRating rating={book.rating} />}
            {book.status && <Badge variant="secondary">{book.status}</Badge>}
          </div>
          <div className="space-y-2 mb-6">
            <p><strong>Gênero:</strong> {book.genre || 'Não informado'}</p>
            <p><strong>Ano:</strong> {book.year || 'Não informado'}</p>
            <p><strong>Páginas:</strong> {book.pages || 'Não informado'}</p>
          </div>
          <h3 className="text-2xl font-semibold border-b pb-2 mb-4">Sinopse</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            {book.synopsis || 'Nenhuma sinopse disponível.'}
          </p>
        </div>
      </div>
    </main>
  );
}
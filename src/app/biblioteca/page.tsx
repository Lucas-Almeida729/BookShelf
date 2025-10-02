// src/app/biblioteca/page.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookCard } from '@/components/BookCard';
import { getBooks, getGenres } from '@/lib/database';
import BookFilters from '@/components/BookFilters';

export default async function BibliotecaPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    genre?: string;
    status?: string;
  };
}) {
  // Passamos os searchParams diretamente para a função getBooks
  const [books, genres] = await Promise.all([
    getBooks(searchParams),
    getGenres()
  ]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Minha Biblioteca</h1>
        <Button asChild>
          <Link href="/livros/novo">Adicionar Livro</Link>
        </Button>
      </div>

      <BookFilters genres={genres} />

      {books.length === 0 ? (
        <p className="text-center text-muted-foreground mt-10">
          Nenhum livro encontrado com os filtros aplicados.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
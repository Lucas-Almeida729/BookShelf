// src/app/biblioteca/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/BookCard";
import { getBooks, getGenres } from "@/lib/database";
import { Book } from "@prisma/client";
import GenreFilter from "@/components/GenreFilter"; // 1. Importar o novo componente

// Componente auxiliar para renderizar uma seção de livros
const BookSection = ({ title, books }: { title: string; books: Book[] }) => {
  if (books.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold border-b pb-2 mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

// 2. Adicionar 'searchParams' às props da página
export default async function BibliotecaPage({
  searchParams,
}: {
  searchParams?: {
    genre?: string;
  };
}) {
  // 3. Buscar os livros e gêneros em paralelo, passando os filtros
  const [allBooks, genres] = await Promise.all([
    getBooks(searchParams), // Passa o filtro de gênero para a busca
    getGenres(),
  ]);

  // Agrupa os livros (já filtrados) por status
  const booksByStatus = allBooks.reduce((acc, book) => {
    const status = book.status as keyof typeof acc;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  // Define a ordem desejada para as seções
  const orderedStatuses = [
    "LENDO",
    "QUERO_LER",
    "LIDO",
    "PAUSADO",
    "ABANDONADO",
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Minha Biblioteca</h1>
        <Button asChild>
          <Link href="/livros/novo">Adicionar Livro</Link>
        </Button>
      </div>

      {/* 4. Renderizar o componente de filtro */}
      <GenreFilter genres={genres} />

      {allBooks.length === 0 ? (
        <p className="text-center text-muted-foreground mt-10">
          Nenhum livro encontrado com o filtro aplicado.
        </p>
      ) : (
        <div>
          {orderedStatuses.map((status) => (
            <BookSection
              key={status}
              title={status.replace(/_/g, " ")}
              books={booksByStatus[status] || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}

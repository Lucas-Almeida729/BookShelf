// src/app/biblioteca/page.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookCard } from '@/components/BookCard'; // Vamos garantir que esse componente esteja atualizado
import { getBooks } from '@/lib/database'; // Importando nossa função do banco de dados!

// Note a palavra "async" aqui. Isso transforma a página em um Componente de Servidor
// que pode esperar (await) a busca de dados terminar.
export default async function BibliotecaPage() {
  // A mágica acontece aqui! Chamamos a função que busca os livros no banco de dados.
  // A página só vai ser construída depois que a variável "books" tiver os dados.
  const books = await getBooks();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Minha Biblioteca</h1>
        <Button asChild>
          <Link href="/livros/novo">Adicionar Livro</Link>
        </Button>
      </div>

      {/* Se não houver livros, mostramos uma mensagem amigável */}
      {books.length === 0 ? (
        <p className="text-center text-gray-500">
          Sua biblioteca está vazia. Adicione seu primeiro livro!
        </p>
      ) : (
        // Se houver livros, nós os exibimos em um grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
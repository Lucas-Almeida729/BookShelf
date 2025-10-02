// src/app/livros/[id]/page.tsx

import { getBook } from '@/lib/database';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import DeleteBookButton from '@/components/DeleteBookButton'; // Importe o botão de deletar

export default async function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      {/* Botões de Ação */}
      <div className="flex justify-end gap-2 mb-4">
        <Button asChild variant="outline">
          <Link href={`/livros/${book.id}/editar`}>Editar</Link>
        </Button>
        <DeleteBookButton bookId={book.id} bookTitle={book.title} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Imagem da Capa */}
        <div className="md:col-span-1">
          {book.cover ? (
            <Image
              src={book.cover}
              alt={`Capa de ${book.title}`}
              width={300}
              height={450}
              className="rounded-lg shadow-lg w-full"
            />
          ) : (
            <div className="w-full h-[450px] bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Capa indisponível</span>
            </div>
          )}
        </div>

        {/* Detalhes do Livro */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <h2 className="text-2xl text-gray-600 mb-4">{book.author}</h2>
          
          <div className="space-y-2 mb-4">
            <p><strong>Gênero:</strong> {book.genre || 'Não especificado'}</p>
            <p><strong>Ano:</strong> {book.year || 'Não especificado'}</p>
            <p><strong>Páginas:</strong> {book.pages || 'Não especificado'}</p>
            <p><strong>Status:</strong> {book.status.replace('_', ' ')}</p>
          </div>

          <div className="prose max-w-none dark:prose-invert">
            <h3 className="font-bold">Sinopse</h3>
            <p>{book.synopsis || 'Nenhuma sinopse disponível.'}</p>

            <h3 className="font-bold mt-4">Anotações</h3>
            <p>{book.notes || 'Nenhuma anotação.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
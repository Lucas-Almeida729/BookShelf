// src/app/livros/[id]/editar/page.tsx

import { notFound } from "next/navigation";
import Image from 'next/image';
import { getBook } from "@/lib/database";
import { updateBookAction } from "@/lib/actions";
import BookForm from "@/components/BookForm"; // Garante que está usando o formulário completo

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Editar: {book.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Coluna da Imagem */}
        <div className="md:col-span-1">
          {book.cover ? (
            <Image
              src={book.cover}
              alt={`Capa de ${book.title}`}
              width={300}
              height={450}
              className="rounded-lg shadow-lg w-full sticky top-24"
            />
          ) : (
            <div className="w-full h-[450px] bg-gray-200 rounded-lg flex items-center justify-center sticky top-24">
              <span className="text-gray-500">Capa indisponível</span>
            </div>
          )}
        </div>

        {/* Coluna do Formulário Completo */}
        <div className="md:col-span-2">
          <BookForm book={book} action={updateBookAction} />
        </div>
      </div>
    </div>
  );
}
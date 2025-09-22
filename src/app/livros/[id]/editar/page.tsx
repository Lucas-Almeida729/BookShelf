// src/app/livros/[id]/editar/page.tsx
"use client";

import BookForm from "@/components/BookForm";
import { useBooks } from "@/context/BookContext";

// 1. Definimos um tipo explícito para as propriedades da página
type PageProps = {
  params: { id: string };
};

// 2. Usamos o tipo 'PageProps' na definição da função
export default function EditarLivroPage({ params }: PageProps) {
  const { getBookById } = useBooks();
  const book = getBookById(params.id);

  if (!book) {
    return <div className="text-center mt-10">Livro não encontrado!</div>;
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Editar: {book.title}</h1>
      <BookForm initialData={book} />
    </main>
  );
}
// src/app/livros/[id]/editar/page.tsx
"use client";

import BookForm from "@/components/BookForm";
import { useBooks } from "@/context/BookContext"; // Use o hook

export default function EditarLivroPage({ params }: { params: { id: string } }) {
  const { getBookById } = useBooks(); // Pega a função para buscar o livro
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
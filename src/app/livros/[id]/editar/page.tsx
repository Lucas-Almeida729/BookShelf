// src/app/livros/[id]/editar/page.tsx
"use client";

import { use } from 'react'; // 1. Importe o 'use' do React
import BookForm from "@/components/BookForm";
import { useBooks } from "@/context/BookContext";

// 2. A propriedade 'params' agora é tipada como uma Promise
type PageProps = {
  params: Promise<{ id: string }>;
};

export default function EditarLivroPage({ params }: PageProps) {
  // 3. Use o hook React.use() para extrair o valor da Promise
  const resolvedParams = use(params);
  
  const { getBookById } = useBooks();
  
  // 4. Use o valor resolvido para buscar o livro
  const book = getBookById(resolvedParams.id);

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
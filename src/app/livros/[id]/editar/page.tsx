// src/app/livros/[id]/editar/page.tsx

import { notFound } from "next/navigation";
import { getBook } from "@/lib/database"; // Função para buscar dados do livro
import { updateBookAction } from "@/lib/actions"; // Ação de atualizar
import BookForm from "@/components/BookForm";

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Editar: {book.title}</h1>
      
      {/* Passamos o livro (para preencher os campos) e a ação de atualizar.
        O formulário agora sabe que está em modo de edição.
      */}
      <BookForm book={book} action={updateBookAction} />
    </div>
  );
}
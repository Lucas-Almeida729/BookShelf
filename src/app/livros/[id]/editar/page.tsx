// src/app/livros/[id]/editar/page.tsx
import BookForm from "@/components/BookForm";
import { fetchBookById } from "@/lib/data";

export default async function EditarLivroPage({ params }: { params: { id: string } }) {
  const book = await fetchBookById(params.id);

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
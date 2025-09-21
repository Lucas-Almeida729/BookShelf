import BookForm from "@/components/BookForm";
import { initialBooks } from "@/lib/mock-data";

export default function EditarLivroPage({ params }: { params: { id: string } }) {
  const book = initialBooks.find(b => b.id === params.id);

  if (!book) {
    return <div className="text-center mt-10">Livro não encontrado!</div>;
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Editar: {book.title}</h1>
      {/* Aqui está a diferença: passamos os dados do livro encontrado para o BookForm. */}
      {/* O formulário agora vai renderizar com os campos já preenchidos. */}
      <BookForm initialData={book} />
    </main>
  );
}
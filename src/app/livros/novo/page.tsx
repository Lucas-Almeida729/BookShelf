import BookForm from "@/components/BookForm";

export default function NovoLivroPage() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Adicionar Novo Livro</h1>
      {/* Renderizamos o formulário sem passar 'initialData', então ele estará vazio */}
      <BookForm />
    </main>
  );
}
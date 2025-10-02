// src/app/livros/novo/page.tsx

import BookForm from "@/components/BookForm";
import { createBookAction } from "@/lib/actions"; // Importamos a nossa nova ação

export default function NewBookPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Adicionar Novo Livro</h1>
      
      {/* Aqui está a conexão! Passamos a função 'createBookAction' 
        para a propriedade 'action' do nosso formulário.
      */}
      <BookForm action={createBookAction} />
    </div>
  );
}
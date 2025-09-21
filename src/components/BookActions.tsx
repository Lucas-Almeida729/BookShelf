// src/components/BookActions.tsx
"use client";

import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import Link from 'next/link'; // Para navegar entre páginas

// O componente recebe o ID do livro para criar os links e saber quem excluir
interface BookActionsProps {
  bookId: string;
}

export default function BookActions({ bookId }: BookActionsProps) {

  // Função que seria chamada para excluir o livro
  const handleDelete = () => {
    // Lógica de exclusão:
    // Em uma aplicação real, aqui você faria uma chamada para sua API/backend
    // para remover o livro do banco de dados.
    // Como estamos usando dados mockados, vamos simular a exclusão.
    console.log(`Livro com ID ${bookId} seria excluído aqui.`);
    alert(`Livro com ID ${bookId} foi excluído com sucesso! (Simulação)`);
    // Após a exclusão, você normalmente redirecionaria o usuário ou
    // atualizaria a lista de livros, o que requer um gerenciamento de estado mais avançado.
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      {/* Botão para Visualizar Detalhes */}
      <Button asChild variant="outline" size="sm">
        <Link href={`/livros/${bookId}`}>Visualizar</Link>
      </Button>

      {/* Botão para Editar */}
      <Button asChild size="sm">
        <Link href={`/livros/${bookId}/editar`}>Editar</Link>
      </Button>

      {/* Diálogo de Exclusão */}
      <Dialog>
        {/* O DialogTrigger é o botão que abre o diálogo */}
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">Excluir</Button>
        </DialogTrigger>
        {/* O DialogContent é o conteúdo do pop-up que aparece */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza absoluta?</DialogTitle>
            <DialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente o
              livro da sua biblioteca.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* O DialogClose é um botão que fecha o diálogo */}
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            {/* Botão que confirma a exclusão */}
            <DialogClose asChild>
              <Button variant="destructive" onClick={handleDelete}>
                Sim, excluir livro
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
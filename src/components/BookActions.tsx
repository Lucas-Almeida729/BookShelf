// src/components/BookActions.tsx
"use client";

import { useState } from "react"; // Importa o useState
import { useBooks } from "@/context/BookContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import Link from 'next/link';
import { useRouter } from "next/navigation";

interface BookActionsProps {
  bookId: string;
}

export default function BookActions({ bookId }: BookActionsProps) {
  const { deleteBook } = useBooks();
  const router = useRouter();
  // Estado para controlar a abertura do dialog de confirmação
  const [isConfirmOpen, setConfirmOpen] = useState(false); 

  const handleDelete = () => {
    deleteBook(bookId);
    setConfirmOpen(false); // Fecha o modal de confirmação
    // O ideal é notificar o usuário com um "toast", mas como não temos,
    // o redirecionamento já indica que a ação foi concluída.
    router.push('/biblioteca');
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <Button asChild variant="outline" size="sm"><Link href={`/livros/${bookId}`}>Visualizar</Link></Button>
      <Button asChild size="sm"><Link href={`/livros/${bookId}/editar`}>Editar</Link></Button>
      
      {/* Agora o Dialog é controlado pelo estado */}
      <Dialog open={isConfirmOpen} onOpenChange={setConfirmOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">Excluir</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza absoluta?</DialogTitle>
            <DialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente o
              livro da sua biblioteca.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancelar
            </Button>
            {/* O botão de confirmação agora chama a função handleDelete */}
            <Button variant="destructive" onClick={handleDelete}>
              Sim, excluir livro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
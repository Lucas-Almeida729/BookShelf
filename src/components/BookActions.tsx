// src/components/BookActions.tsx
"use client";

import { deleteBook } from "@/lib/actions"; // Importa a Server Action
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import Link from 'next/link';
import { useState } from "react";

interface BookActionsProps {
  bookId: string;
}

export default function BookActions({ bookId }: BookActionsProps) {
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  // A ação de deletar agora está vinculada ao ID do livro
  const deleteBookWithId = deleteBook.bind(null, bookId);

  return (
    <div className="flex items-center gap-2 mt-4">
      <Button asChild variant="outline" size="sm"><Link href={`/livros/${bookId}`}>Visualizar</Link></Button>
      <Button asChild size="sm"><Link href={`/livros/${bookId}/editar`}>Editar</Link></Button>
      
      <Dialog open={isConfirmOpen} onOpenChange={setConfirmOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">Excluir</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza absoluta?</DialogTitle>
            <DialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente o livro.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
            {/* O botão de exclusão agora está dentro de um formulário que chama a Server Action */}
            <form action={deleteBookWithId}>
              <Button variant="destructive" type="submit">Sim, excluir livro</Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
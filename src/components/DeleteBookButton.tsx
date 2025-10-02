// src/components/DeleteBookButton.tsx

"use client"; // ESSENCIAL: Este componente é interativo.

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteBookAction } from "@/lib/actions"; // Nossa Server Action para deletar

interface DeleteBookButtonProps {
  bookId: string;
  bookTitle: string;
}

export default function DeleteBookButton({ bookId, bookTitle }: DeleteBookButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // A Server Action precisa do ID, mas não podemos passá-lo diretamente como argumento
  // em um formulário. A solução é usar .bind() para "pré-configurar" a ação com o ID.
  const deleteBookWithId = deleteBookAction.bind(null, bookId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Deletar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza absoluta?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Isso irá apagar permanentemente o livro
            <strong className="px-1">{bookTitle}</strong>
            dos seus dados.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          {/* Este formulário é a chave! Ao ser enviado, ele chama a Server Action */}
          <form action={deleteBookWithId}>
            <Button type="submit" variant="destructive">
              Confirmar Exclusão
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
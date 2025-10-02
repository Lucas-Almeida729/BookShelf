// src/components/BookActions.tsx
"use client";

import { deleteBook } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import Link from 'next/link';
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

// Componente interno para o botão de exclusão com estado de carregamento
function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant="destructive" type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Excluindo..." : "Sim, excluir livro"}
    </Button>
  );
}

interface BookActionsProps {
  bookId: string;
}

export default function BookActions({ bookId }: BookActionsProps) {
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  
  // Usamos 'action' para passar a Server Action para o formulário
  const deleteAction = async () => {
    await deleteBook(bookId);
    setConfirmOpen(false); // Fecha o modal após a ação
  };

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
            <form action={deleteAction}>
              <DeleteButton />
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
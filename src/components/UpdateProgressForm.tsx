// src/components/UpdateProgressForm.tsx
"use client";

import { updateBookProgressAction } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/SubmitButton";

interface UpdateProgressFormProps {
  bookId: string;
  currentPage: number | null;
  totalPages: number | null;
}

export default function UpdateProgressForm({ bookId, currentPage, totalPages }: UpdateProgressFormProps) {
  return (
    <form action={updateBookProgressAction} className="flex items-center gap-2">
      <input type="hidden" name="bookId" value={bookId} />
      <Input
        type="number"
        name="currentPage"
        defaultValue={currentPage || 0}
        max={totalPages || undefined}
        min={0}
        className="max-w-[100px]"
        aria-label="Página atual"
      />
      <SubmitButton loadingText="Salvando...">Salvar</SubmitButton>
    </form>
  );
}
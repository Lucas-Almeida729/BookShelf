// src/components/BookForm.tsx
"use client";
"use client";

import { useState } from "react";
import { Book } from "@prisma/client";
import { statuses, genres } from "@/types/book";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";
import { createBookAction, updateBookAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";

interface BookFormProps {
  book?: Book | null;
}

export default function BookForm({ book: initialData }: BookFormProps) {
  const action = initialData ? updateBookAction : createBookAction;
  const [rating, setRating] = useState(initialData?.rating || 0);

  return (
    <form action={action} className="space-y-6 max-w-2xl mx-auto">
      {initialData && <input type="hidden" name="id" value={initialData.id} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input id="title" name="title" defaultValue={initialData?.title} required />
          <Input id="title" name="title" defaultValue={initialData?.title} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Autor *</Label>
          <Input id="author" name="author" defaultValue={initialData?.author} required />
          <Input id="author" name="author" defaultValue={initialData?.author} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover">URL da Capa</Label>
        <Input id="cover" name="cover" defaultValue={initialData?.cover || ''} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="year">Ano de Publicação</Label>
          <Input id="year" name="year" type="number" defaultValue={initialData?.year || ''} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pages">Nº de Páginas</Label>
          <Input id="pages" name="pages" type="number" defaultValue={initialData?.pages || ''} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="genre">Gênero</Label>
          <Select name="genre" defaultValue={initialData?.genre || ''}>
            <SelectTrigger><SelectValue placeholder="Selecione um gênero" /></SelectTrigger>
            <SelectContent>{genres.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={initialData?.status || 'QUERO_LER'}>
            <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
            <SelectContent>{statuses.map(s => <SelectItem key={s} value={s.replace(/_/g, ' ')}>{s.replace(/_/g, ' ')}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="synopsis">Sinopse</Label>
        <Textarea id="synopsis" name="synopsis" defaultValue={initialData?.synopsis || ''} rows={5} />
      </div>
      
      
      <input type="hidden" name="rating" value={rating} />
      
      
      <div className="space-y-2">
        <Label>Avaliação</Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <button type="button" key={starValue} onClick={() => setRating(starValue)}>
              <Star size={24} className={starValue <= rating ? "text-yellow-500 fill-current" : "text-gray-300"} />
            <button type="button" key={starValue} onClick={() => setRating(starValue)}>
              <Star size={24} className={starValue <= rating ? "text-yellow-500 fill-current" : "text-gray-300"} />
            </button>
          ))}
          {rating > 0 && (
            <button type="button" onClick={() => setRating(0)} className="ml-2 text-sm text-muted-foreground hover:text-foreground">Limpar</button>
            <button type="button" onClick={() => setRating(0)} className="ml-2 text-sm text-muted-foreground hover:text-foreground">Limpar</button>
          )}
        </div>
      </div>

      <SubmitButton className="w-full">
        {initialData ? 'Atualizar Livro' : 'Adicionar Livro'}
      </SubmitButton>
    </form>
  );
}
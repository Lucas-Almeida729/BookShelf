// src/components/BookForm.tsx
"use client";

import { useState } from "react";
import { Book, statuses, genres } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StarRating from "./StarRating"; // Usaremos para a avaliação

interface BookFormProps {
  initialData?: Book;
}

export default function BookForm({ initialData }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    author: initialData?.author || '',
    year: initialData?.year || undefined,
    pages: initialData?.pages || undefined,
    cover: initialData?.cover || '',
    genre: initialData?.genre || undefined,
    status: initialData?.status || 'QUERO_LER', // Valor padrão
    rating: initialData?.rating || 0,
    synopsis: initialData?.synopsis || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || undefined : value,
    }));
  };

  const handleSelectChange = (name: 'genre' | 'status') => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para lidar com a mudança da avaliação por estrelas
  const handleRatingChange = (newRating: number) => {
    setFormData(prev => ({...prev, rating: newRating}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do livro salvos:", formData);
    alert("Livro salvo com sucesso! (Verifique o console do navegador com F12)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo Título */}
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        {/* Campo Autor */}
        <div className="space-y-2">
          <Label htmlFor="author">Autor *</Label>
          <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
        </div>
      </div>

      {/* URL da Capa */}
      <div className="space-y-2">
        <Label htmlFor="cover">URL da Capa</Label>
        <Input id="cover" name="cover" placeholder="https://exemplo.com/capa.jpg" value={formData.cover} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo Ano */}
        <div className="space-y-2">
          <Label htmlFor="year">Ano de Publicação</Label>
          <Input id="year" name="year" type="number" value={formData.year || ''} onChange={handleChange} />
        </div>

        {/* Campo Páginas */}
        <div className="space-y-2">
          <Label htmlFor="pages">Nº de Páginas</Label>
          <Input id="pages" name="pages" type="number" value={formData.pages || ''} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo Gênero */}
        <div className="space-y-2">
          <Label htmlFor="genre">Gênero</Label>
          <Select name="genre" onValueChange={handleSelectChange('genre')} value={formData.genre}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um gênero" />
            </SelectTrigger>
            <SelectContent>
              {genres.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Campo Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" onValueChange={handleSelectChange('status')} value={formData.status}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Campo Sinopse */}
      <div className="space-y-2">
        <Label htmlFor="synopsis">Sinopse</Label>
        <Textarea id="synopsis" name="synopsis" value={formData.synopsis} onChange={handleChange} rows={5} />
      </div>

      {/* Campo Avaliação */}
      <div className="space-y-2">
          <Label>Avaliação</Label>
          <div className="flex items-center gap-2">
              {/* Clicar em uma estrela define a avaliação */}
              {[1, 2, 3, 4, 5].map((star) => (
                  <button type="button" key={star} onClick={() => handleRatingChange(star)}>
                      <StarRating rating={formData.rating} maxRating={1} size={24} />
                  </button>
              ))}
              {formData.rating > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => handleRatingChange(0)}>Limpar</Button>
              )}
          </div>
      </div>

      <Button type="submit" className="w-full">
        {initialData ? 'Atualizar Livro' : 'Adicionar Livro'}
      </Button>
    </form>
  );
}
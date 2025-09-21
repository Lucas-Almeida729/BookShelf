// src/components/BookForm.tsx
"use client"; // Este componente precisa de interatividade (useState), então marcamos como "client component".

import { useState } from "react";
import { Book, statuses, genres } from "@/types/book"; // Importa nossos tipos
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Definimos as props: o formulário pode, opcionalmente, receber os dados de um livro para edição.
interface BookFormProps {
  initialData?: Book;
}

export default function BookForm({ initialData }: BookFormProps) {
  // Criamos um "estado" para guardar todos os dados do formulário.
  // Se 'initialData' for fornecido (modo edição), usamos esses dados.
  // Se não (modo adição), usamos valores padrão.
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    author: initialData?.author || '',
    year: initialData?.year || undefined,
    pages: initialData?.pages || undefined,
    cover: initialData?.cover || '',
    genre: initialData?.genre || undefined,
    status: initialData?.status || undefined,
    rating: initialData?.rating || 0,
    synopsis: initialData?.synopsis || ''
  });

  // Função genérica para lidar com a mudança nos inputs de texto e número
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // Atualiza o estado do formulário, mantendo os dados anteriores (...prev)
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || undefined : value,
    }));
  };

  // Função para lidar com a mudança nos selects (gênero e status)
  const handleSelectChange = (name: 'genre' | 'status') => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Função que é chamada quando o formulário é enviado
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento padrão da página
    // No futuro, aqui você enviaria os dados para um banco de dados.
    // Por enquanto, vamos apenas exibir os dados no console.
    console.log("Dados do livro salvos:", formData);
    alert("Livro salvo com sucesso! (Verifique o console do navegador com F12)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
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

      {/* Outros campos podem ser adicionados aqui seguindo o mesmo padrão (Ano, Páginas, Capa, etc.) */}

      <Button type="submit" className="w-full">
        {initialData ? 'Atualizar Livro' : 'Adicionar Livro'}
      </Button>
    </form>
  );
}
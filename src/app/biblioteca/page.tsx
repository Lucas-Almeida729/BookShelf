// src/app/biblioteca/page.tsx
"use client"; 

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'; // Importa o hook
import { initialBooks } from "@/lib/mock-data";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { genres, Status } from "@/types/book"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BibliotecaPage() {
  const searchParams = useSearchParams(); // Hook para ler parâmetros da URL
  const statusFromUrl = searchParams.get('status') as Status | null;

  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);
  // Novo estado para o filtro de status, inicializado com o valor da URL
  const [selectedStatus, setSelectedStatus] = useState<Status | undefined>(statusFromUrl || undefined);

  // Efeito para atualizar o filtro de status se a URL mudar
  useEffect(() => {
    setSelectedStatus(statusFromUrl || undefined);
  }, [statusFromUrl]);
  
  // Lógica de filtro combinada: busca, gênero E status
  const filteredBooks = initialBooks.filter(book => {
    const matchesSearchTerm = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = 
      selectedGenre ? book.genre === selectedGenre : true;

    // Novo filtro por status
    const matchesStatus =
      selectedStatus ? book.status === selectedStatus : true;

    return matchesSearchTerm && matchesGenre && matchesStatus;
  });

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Minha Biblioteca</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
        {/* Campo de Busca */}
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">Buscar Livros</Label>
          <Input
            id="search"
            type="text"
            placeholder="Buscar por título ou autor..."
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtro por Gênero */}
        <div className="w-full md:w-1/3">
          <Label htmlFor="genre-filter" className="sr-only">Filtrar por Gênero</Label>
          <Select onValueChange={(value) => setSelectedGenre(value === 'undefined' ? undefined : value)} value={selectedGenre}>
            <SelectTrigger id="genre-filter">
              <SelectValue placeholder="Filtrar por gênero" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="undefined">Todos os Gêneros</SelectItem>
              {genres.map(g => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Mensagem se nenhum livro for encontrado */}
      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">Nenhum livro encontrado com os filtros atuais.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
            />
          ))}
        </div>
      )}
    </main>
  );
}
// src/app/biblioteca/page.tsx
"use client"; 

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useBooks } from "@/context/BookContext";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { genres, statuses, Status } from "@/types/book"; // Importe 'statuses'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BibliotecaPage() {
  const { books } = useBooks();
  const searchParams = useSearchParams();
  const statusFromUrl = searchParams.get('status') as Status | null;

  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<Status | undefined>(statusFromUrl || undefined);

  useEffect(() => {
    setSelectedStatus(statusFromUrl || undefined);
  }, [statusFromUrl]);
  
  const filteredBooks = books.filter(book => {
    const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    const matchesStatus = selectedStatus ? book.status === selectedStatus : true;
    return matchesSearchTerm && matchesGenre && matchesStatus;
  });

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Minha Biblioteca</h1>
      {/* Container principal dos filtros agora com 3 colunas em telas maiores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
        {/* Campo de Busca (ocupando mais espaço) */}
        <div className="md:col-span-1">
          <Label htmlFor="search" className="sr-only">Buscar Livros</Label>
          <Input
            id="search"
            type="text"
            placeholder="Buscar por título ou autor..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtro por Gênero */}
        <div>
          <Label htmlFor="genre-filter" className="sr-only">Filtrar por Gênero</Label>
          <Select onValueChange={(value) => setSelectedGenre(value === 'ALL' ? undefined : value)} value={selectedGenre || 'ALL'}>
            <SelectTrigger id="genre-filter">
              <SelectValue placeholder="Filtrar por gênero" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os Gêneros</SelectItem>
              {genres.map(g => (<SelectItem key={g} value={g}>{g}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>

        {/* NOVO: Filtro por Status */}
        <div>
          <Label htmlFor="status-filter" className="sr-only">Filtrar por Status</Label>
          <Select onValueChange={(value) => setSelectedStatus(value === 'ALL' ? undefined : value as Status)} value={selectedStatus || 'ALL'}>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os Status</SelectItem>
              {statuses.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">Nenhum livro encontrado com os filtros atuais.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (<BookCard key={book.id} book={book} />))}
        </div>
      )}
    </main>
  );
}
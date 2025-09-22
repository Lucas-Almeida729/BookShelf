// src/context/BookContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, Genre, Status } from '@/types/book'; // Importe Genre e Status
import { initialBooks } from '@/lib/mock-data';

// Define o que o nosso contexto irá fornecer
interface BookContextType {
  books: Book[];
  addBook: (book: Partial<Book>) => void; // Corrigido para aceitar Partial<Book>
  updateBook: (updatedBook: Book) => void;
  deleteBook: (bookId: string) => void;
  getBookById: (bookId: string) => Book | undefined;
}

// Cria o contexto
const BookContext = createContext<BookContextType | undefined>(undefined);

// Cria o Provedor, que irá gerenciar o estado dos livros
export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);

  // Este useEffect roda apenas uma vez quando o app carrega
  useEffect(() => {
    try {
      const storedBooks = localStorage.getItem('bookshelf-data');
      if (storedBooks) {
        setBooks(JSON.parse(storedBooks));
      } else {
        // Se não houver nada no localStorage, carrega os dados iniciais
        setBooks(initialBooks);
      }
    } catch (error) {
        console.error("Failed to parse books from localStorage", error);
        setBooks(initialBooks);
    }
  }, []);

  // Este useEffect salva os livros no localStorage sempre que a lista 'books' mudar
  useEffect(() => {
    // Apenas salva se a lista de livros já foi inicializada
    if (books.length > 0) {
        localStorage.setItem('bookshelf-data', JSON.stringify(books));
    }
  }, [books]);

  // Função addBook corrigida para criar um objeto Book completo
  const addBook = (bookData: Partial<Book>) => {
    if (!bookData.title || !bookData.author) {
      console.error("Tentativa de adicionar um livro sem título ou autor.");
      return;
    }

    const newBook: Book = {
      id: new Date().toISOString(),
      title: bookData.title,
      author: bookData.author,
      year: bookData.year,
      pages: bookData.pages,
      cover: bookData.cover,
      genre: bookData.genre,
      status: bookData.status || 'QUERO_LER',
      rating: bookData.rating || 0,
      synopsis: bookData.synopsis,
      currentPage: bookData.currentPage,
      notes: bookData.notes,
    };
    
    setBooks(prevBooks => [...prevBooks, newBook]);
  };

  const updateBook = (updatedBook: Book) => {
    setBooks(prevBooks => 
      prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book)
    );
  };

  const deleteBook = (bookId: string) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
  };

  const getBookById = (bookId: string) => {
    return books.find(book => book.id === bookId);
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook, getBookById }}>
      {children}
    </BookContext.Provider>
  );
}

// Hook customizado para facilitar o uso do nosso contexto
export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}
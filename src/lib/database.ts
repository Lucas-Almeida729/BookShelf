// src/lib/database.ts
import { prisma } from './prisma'
import { Book, Genre } from '@prisma/client'

// Tipos...
export type ReadingStatus = 'QUERO_LER' | 'LENDO' | 'LIDO' | 'PAUSADO' | 'ABANDONADO'

export interface BookWithGenre extends Book {
  genreModel?: Genre | null
}

export interface CreateBookData {
  title: string
  author: string
  genre?: string
  genreId?: string
  year?: number
  pages?: number
  rating?: number
  synopsis?: string
  cover?: string
  status?: ReadingStatus
  currentPage?: number
  isbn?: string
  notes?: string
}

export interface UpdateBookData extends Partial<CreateBookData> {
  id: string
}

// Interface para os filtros
export interface BookFilters {
  query?: string;
  genre?: string;
  status?: string;
}


// --- Funções de CRUD para Livros ---

// VERSÃO ATUALIZADA DA FUNÇÃO getBooks
export async function getBooks(filters: BookFilters = {}) {
  const { query, genre, status } = filters;

  const where: any = {};

  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { author: { contains: query, mode: 'insensitive' } },
    ];
  }

  if (genre && genre !== 'ALL') {
    where.genre = genre;
  }

  if (status && status !== 'ALL') {
    where.status = status;
  }

  return await prisma.book.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}


export async function getBook(id: string) {
  return await prisma.book.findUnique({ where: { id } })
}

export async function createBook(data: CreateBookData) {
  return await prisma.book.create({ data })
}

export async function updateBook(id: string, data: UpdateBookData) {
  const { id: _, ...updateData } = data
  return await prisma.book.update({ where: { id }, data: updateData })
}

export async function deleteBook(id: string) {
  return await prisma.book.delete({ where: { id } })
}

// --- Funções de Gêneros ---
export async function getGenres() {
  // Vamos buscar os gêneros a partir dos livros existentes para garantir que a lista esteja sempre atualizada
  const distinctGenres = await prisma.book.findMany({
    where: {
      genre: {
        not: null,
      },
    },
    select: {
      genre: true,
    },
    distinct: ['genre'],
  });

  // Extrai apenas os nomes dos gêneros e ordena
  return distinctGenres
    .map((b) => b.genre!)
    .sort();
}


// --- Funções para o Dashboard ---

export async function getBookStats() {
  const totalBooks = await prisma.book.count();
  const booksRead = await prisma.book.count({ where: { status: 'LIDO' } });
  const booksReading = await prisma.book.count({ where: { status: 'LENDO' } });
  const pagesRead = await prisma.book.aggregate({
    _sum: {
      pages: true,
    },
    where: { status: 'LIDO' },
  });
  const booksToRead = await prisma.book.count({ where: { status: 'QUERO_LER' } });
  const booksPaused = await prisma.book.count({ where: { status: 'PAUSADO' } });
  const booksAbandoned = await prisma.book.count({ where: { status: 'ABANDONADO' } });


  return {
    totalBooks,
    booksRead,
    booksReading,
    pagesRead: pagesRead._sum.pages ?? 0,
    booksToRead,
    booksPaused,
    booksAbandoned,
  };
}

export async function getReadingNow() {
  return await prisma.book.findMany({
    where: { status: 'LENDO' },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  });
}

export async function getRecentBooks() {
  return await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
  });
}
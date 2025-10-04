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
  genre?: string;
}


// --- Funções de CRUD para Livros ---

export async function getBooks(filters: BookFilters = {}) {
  const { genre } = filters;
  const where: any = {};

  if (genre && genre !== 'ALL') {
    where.genre = genre;
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

  return distinctGenres
    .map((b) => b.genre!)
    .sort();
}


// --- Funções para o Dashboard ---

// VERSÃO ATUALIZADA DA FUNÇÃO getBookStats
export async function getBookStats() {
  // Executa todas as consultas ao banco de dados em paralelo
  const [
    totalBooks,
    booksRead,
    booksReading,
    booksToRead,
    booksPaused,
    booksAbandoned,
    sumOfReadPages,
    sumOfReadingProgress,
    sumOfPausedProgress,   // Novo
    sumOfAbandonedProgress // Novo
  ] = await Promise.all([
    prisma.book.count(),
    prisma.book.count({ where: { status: 'LIDO' } }),
    prisma.book.count({ where: { status: 'LENDO' } }),
    prisma.book.count({ where: { status: 'QUERO_LER' } }),
    prisma.book.count({ where: { status: 'PAUSADO' } }),
    prisma.book.count({ where: { status: 'ABANDONADO' } }),
    // Soma as páginas de livros 'LIDO'
    prisma.book.aggregate({
      _sum: { pages: true },
      where: { status: 'LIDO' },
    }),
    // Soma as páginas atuais de livros 'LENDO'
    prisma.book.aggregate({
      _sum: { currentPage: true },
      where: { status: 'LENDO' },
    }),
    // AQUI ESTÁ A MUDANÇA: Soma as páginas atuais de livros 'PAUSADO'
    prisma.book.aggregate({
      _sum: { currentPage: true },
      where: { status: 'PAUSADO' },
    }),
    // AQUI ESTÁ A MUDANÇA: Soma as páginas atuais de livros 'ABANDONADO'
    prisma.book.aggregate({
      _sum: { currentPage: true },
      where: { status: 'ABANDONADO' },
    }),
  ]);

  // Combina todos os resultados para o total de páginas lidas
  const totalPagesRead = 
    (sumOfReadPages._sum.pages ?? 0) + 
    (sumOfReadingProgress._sum.currentPage ?? 0) +
    (sumOfPausedProgress._sum.currentPage ?? 0) +
    (sumOfAbandonedProgress._sum.currentPage ?? 0);

  return {
    totalBooks,
    booksRead,
    booksReading,
    pagesRead: totalPagesRead,
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
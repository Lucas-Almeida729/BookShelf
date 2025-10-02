// src/lib/database.ts
import { prisma } from './prisma'
import { Book, Genre } from '@prisma/client'

// Tipos para os dados, que podem ser movidos para src/types/index.ts
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

// ... (outros tipos como BookStats e BookFilters)

// Funções de CRUD para Livros
export async function getBooks(filters?: any) {
  // ... (implementar lógica de filtro como em BookShelf_teste/src/lib/database.ts)
  return await prisma.book.findMany({ orderBy: { createdAt: 'desc' } })
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

// Funções para Gêneros
export async function getGenres() {
  return await prisma.genre.findMany({ orderBy: { name: 'asc' } })
}

// ... (outras funções como getBookStats, etc.)

// --- Funções para o Dashboard ---

// Retorna as estatísticas gerais da biblioteca
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

  return {
    totalBooks,
    booksRead,
    booksReading,
    pagesRead: pagesRead._sum.pages ?? 0,
  };
}

// Retorna os livros que estão atualmente sendo lidos
export async function getReadingNow() {
  return await prisma.book.findMany({
    where: { status: 'LENDO' },
    orderBy: { updatedAt: 'desc' },
    take: 5, // Pega no máximo 5 para não poluir a tela
  });
}

// Retorna os últimos livros adicionados à estante
export async function getRecentBooks() {
  return await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4, // Pega os 4 mais recentes
  });
}
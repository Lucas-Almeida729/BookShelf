// src/lib/database.ts
import { prisma, Prisma } from "./prisma";
import { Book, Genre } from "@prisma/client";

// Tipos
export type ReadingStatus =
  | "QUERO_LER"
  | "LENDO"
  | "LIDO"
  | "PAUSADO"
  | "ABANDONADO";

export interface BookWithGenre extends Book {
  genreModel?: Genre | null;
}

export interface CreateBookData {
  title: string;
  author: string;
  genre?: string;
  genreId?: string;
  year?: number;
  pages?: number;
  rating?: number;
  synopsis?: string;
  cover?: string;
  status?: ReadingStatus;
  currentPage?: number;
  isbn?: string;
  notes?: string;
}

export interface UpdateBookData extends Partial<CreateBookData> {
  id: string;
}

export interface BookFilters {
  genre?: string;
  query?: string;
  status?: string;
}

// --- Funções de CRUD para Livros ---

export async function getBooks(filters: BookFilters = {}) {
  const { query, genre, status } = filters;
  const where: Prisma.BookWhereInput = {};

  if (query) {
    where.OR = [
      { title: { contains: query } },
      { author: { contains: query } },
    ];
  }

  if (genre && genre !== "ALL") {
    where.genre = genre;
  }

  if (status && status !== "ALL") {
    where.status = status;
  }

  return await prisma.book.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function getBook(id: string) {
  return await prisma.book.findUnique({ where: { id } });
}

export async function createBook(data: CreateBookData) {
  return await prisma.book.create({ data });
}

export async function updateBook(id: string, data: Partial<UpdateBookData>) {
  return await prisma.book.update({ where: { id }, data });
}

// --- FUNÇÃO deleteBook RESTAURADA ---
export async function deleteBook(id: string) {
  return await prisma.book.delete({ where: { id } });
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
    distinct: ["genre"],
  });

  return distinctGenres.map((b) => b.genre!).sort();
}

// --- Funções para o Dashboard ---

export async function getBookStats() {
  const [
    totalBooks,
    booksRead,
    booksReading,
    booksToRead,
    booksPaused,
    booksAbandoned,
    sumOfReadPages,
    sumOfReadingProgress,
    sumOfPausedProgress,
    sumOfAbandonedProgress,
  ] = await Promise.all([
    prisma.book.count(),
    prisma.book.count({ where: { status: "LIDO" } }),
    prisma.book.count({ where: { status: "LENDO" } }),
    prisma.book.count({ where: { status: "QUERO_LER" } }),
    prisma.book.count({ where: { status: "PAUSADO" } }),
    prisma.book.count({ where: { status: "ABANDONADO" } }),
    prisma.book.aggregate({
      _sum: { pages: true },
      where: { status: "LIDO" },
    }),
    prisma.book.aggregate({
      _sum: { currentPage: true },
      where: { status: "LENDO" },
    }),
    prisma.book.aggregate({
      _sum: { currentPage: true },
      where: { status: "PAUSADO" },
    }),
    prisma.book.aggregate({
      _sum: { currentPage: true },
      where: { status: "ABANDONADO" },
    }),
  ]);

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
    where: { status: "LENDO" },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });
}

export async function getRecentBooks() {
  return await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

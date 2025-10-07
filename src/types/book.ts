// src/types/book.ts

export const statuses = [
  "QUERO_LER",
  "LENDO",
  "LIDO",
  "PAUSADO",
  "ABANDONADO",
] as const;

// CORREÇÃO: Trocar 'let' por 'const'
export const genres = [
  "Literatura Brasileira",
  "Ficção Científica",
  "Realismo Mágico",
  "Fantasia",
  "Romance",
  "Biografia",
  "História",
  "Autoajuda",
  "Tecnologia",
  "Programação",
  "Negócios",
  "Psicologia",
  "Filosofia",
  "Poesia",
] as const;

export type Status = (typeof statuses)[number];
export type Genre = (typeof genres)[number];

export interface Book {
  id: string;
  title: string;
  author: string;
  year?: number;
  pages?: number;
  cover?: string;
  genre?: Genre;
  status?: Status;
  rating?: number;
  synopsis?: string;
  currentPage?: number;
  notes?: string;
}
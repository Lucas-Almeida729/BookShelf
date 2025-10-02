// src/types/book.ts

export const statuses = [
  "QUERO_LER",
  "LENDO",
  "LIDO",
  "PAUSADO",
  "ABANDONADO",
] as const;
export let genres = [
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
  id: string; // [cite: 57]
  title: string; // [cite: 58]
  author: string; // [cite: 58]
  year?: number; // [cite: 58]
  pages?: number; // [cite: 58]
  cover?: string; // [cite: 61]
  genre?: Genre; // [cite: 58]
  status?: Status;
  rating?: number; // [cite: 59]
  synopsis?: string; // [cite: 60]
  currentPage?: number;
  notes?: string;
}

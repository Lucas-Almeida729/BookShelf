// src/lib/utils.ts (VERSÃO CORRIGIDA)

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ReadingStatus } from "./database";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para traduzir o status para texto legível
export const getStatusLabel = (status: ReadingStatus | string): string => {
  switch (status) {
    case 'QUERO_LER':
      return 'Quero Ler';
    case 'LENDO':
      return 'Lendo';
    case 'LIDO':
      return 'Lido';
    case 'PAUSADO':
      return 'Pausado';
    case 'ABANDONADO':
      return 'Abandonado';
    default:
      return 'Status Desconhecido';
  }
};

// Função para definir uma cor de fundo com base no status
export const getStatusColor = (status: ReadingStatus | string): string => {
  switch (status) {
    case 'QUERO_LER':
      return 'bg-blue-500';
    case 'LENDO':
      return 'bg-yellow-500';
    case 'LIDO':
      return 'bg-green-500';
    case 'PAUSADO':
      return 'bg-gray-500';
    case 'ABANDONADO':
      return 'bg-red-500';
    default:
      return 'bg-black';
  }
};

// Função para calcular o progresso da leitura em porcentagem
export const getReadingProgress = (currentPage: number | null | undefined, totalPages: number | null | undefined): number => {
  if (totalPages && currentPage && totalPages > 0) {
    return Math.round((currentPage / totalPages) * 100);
  }
  return 0;
};
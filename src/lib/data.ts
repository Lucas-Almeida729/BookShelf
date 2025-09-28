// src/lib/data.ts
import { Book } from "@/types/book";

// A URL base da nossa API. Usamos uma variável de ambiente para flexibilidade.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Busca todos os livros
export async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books`, {
      cache: 'no-store', // Garante que os dados sejam sempre buscados do servidor
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar os livros.');
    }
    return response.json();
  } catch (error) {
    console.error('Erro em fetchBooks:', error);
    return []; // Retorna um array vazio em caso de erro
  }
}

// Busca um livro específico pelo ID
export async function fetchBookById(id: string): Promise<Book | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      // Se o livro não for encontrado (404), a API retorna um erro.
      return null;
    }
    return response.json();
  } catch (error) {
    console.error(`Erro em fetchBookById com id ${id}:`, error);
    return null;
  }
}

// Busca todas as categorias (gêneros)
export async function fetchCategories(): Promise<string[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/categories`, {
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error('Falha ao buscar as categorias.');
        }
        return response.json();
    } catch (error) {
        console.error('Erro em fetchCategories:', error);
        return [];
    }
}
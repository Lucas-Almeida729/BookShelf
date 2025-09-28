// src/lib/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Book } from "@/types/book";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Ação para CRIAR um novo livro
export async function createBook(formData: FormData) {
  const newBook = {
    title: formData.get('title'),
    author: formData.get('author'),
    cover: formData.get('cover'),
    year: Number(formData.get('year')),
    pages: Number(formData.get('pages')),
    status: formData.get('status'),
    genre: formData.get('genre'),
    rating: Number(formData.get('rating')),
    synopsis: formData.get('synopsis'),
  };

  await fetch(`${API_BASE_URL}/api/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  });

  // Limpa o cache da página da biblioteca para que a nova lista de livros seja buscada
  revalidatePath('/biblioteca');
  // Redireciona o usuário para a página da biblioteca
  redirect('/biblioteca');
}

// Ação para ATUALIZAR um livro existente
export async function updateBook(id: string, formData: FormData) {
  const updatedBook = {
    title: formData.get('title'),
    author: formData.get('author'),
    cover: formData.get('cover'),
    year: Number(formData.get('year')),
    pages: Number(formData.get('pages')),
    status: formData.get('status'),
    genre: formData.get('genre'),
    rating: Number(formData.get('rating')),
    synopsis: formData.get('synopsis'),
  };

  await fetch(`${API_BASE_URL}/api/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedBook),
  });

  // Revalida a página da biblioteca e a página de detalhes do livro
  revalidatePath('/biblioteca');
  revalidatePath(`/livros/${id}`);
  redirect(`/livros/${id}`);
}

// Ação para DELETAR um livro
export async function deleteBook(id: string) {
  await fetch(`${API_BASE_URL}/api/books/${id}`, {
    method: 'DELETE',
  });

  // Revalida a página da biblioteca para refletir a remoção
  revalidatePath('/biblioteca');
}
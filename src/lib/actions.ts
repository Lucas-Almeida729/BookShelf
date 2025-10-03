// src/lib/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createBook, updateBook, deleteBook } from "./database";

// Define um "esquema" ou "molde" para validar os dados do formulário
const BookSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Título é obrigatório"),
  author: z.string().min(1, "Autor é obrigatório"),
  cover: z.string().url("Deve ser uma URL válida").optional().or(z.literal('')),
  genre: z.string().optional(),
  status: z.enum(["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"]),
  synopsis: z.string().optional(),
  notes: z.string().optional(),
  year: z.coerce.number().optional(),
  pages: z.coerce.number().optional(),
  rating: z.coerce.number().optional(),
});

// --- NOVA VALIDAÇÃO PARA O PROGRESSO ---
const ProgressSchema = z.object({
  bookId: z.string(),
  currentPage: z.coerce.number().min(0, "A página não pode ser negativa."),
});

// --- AÇÕES DE LIVRO (CRUD) ---

export async function createBookAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  
  const validatedFields = BookSchema.safeParse(rawData);
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    throw new Error("Falha na validação dos dados.");
  }

  try {
    await createBook(validatedFields.data);
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao criar o livro no banco de dados.");
  }

  revalidatePath("/biblioteca");
  redirect("/biblioteca");
}

export async function updateBookAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  const validatedFields = BookSchema.safeParse(rawData);
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    throw new Error("Falha na validação dos dados para atualização.");
  }

  const { id, ...bookData } = validatedFields.data;

  if (!id) {
    throw new Error("ID do livro não encontrado para atualização.");
  }
  
  try {
    await updateBook(id, bookData);
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao atualizar o livro no banco de dados.");
  }

  revalidatePath("/biblioteca");
  revalidatePath(`/livros/${id}`);
  redirect(`/livros/${id}`);
}

export async function deleteBookAction(id: string) {
    if (!id) {
        throw new Error("ID do livro não fornecido para exclusão.");
    }

    try {
        await deleteBook(id);
    } catch (error) {
        console.error(error);
        throw new Error("Falha ao deletar o livro do banco de dados.");
    }

    revalidatePath("/biblioteca");
    redirect("/biblioteca");
}


// --- NOVA SERVER ACTION PARA ATUALIZAR O PROGRESSO ---

export async function updateBookProgressAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = ProgressSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    // Em uma aplicação real, você poderia retornar uma mensagem de erro para o usuário
    throw new Error("Dados de progresso inválidos.");
  }
  
  const { bookId, currentPage } = validatedFields.data;

  try {
    await updateBook(bookId, { currentPage });
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao atualizar o progresso no banco de dados.");
  }

  // Revalida o cache para que a página do livro e o dashboard mostrem o novo progresso
  revalidatePath(`/livros/${bookId}`);
  revalidatePath('/');
}
// src/lib/actions.ts

"use server"; // Marcador MÁGICO! Transforma todas as funções deste arquivo em Server Actions.

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod"; // Biblioteca para validar dados
import { createBook, updateBook, deleteBook } from "./database"; // Nossas funções do banco

// Define um "esquema" ou "molde" para validar os dados do formulário
const BookSchema = z.object({
  id: z.string().optional(), // ID é opcional, pois não existe ao criar um livro novo
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

// Ação para CRIAR um livro
export async function createBookAction(formData: FormData) {
  // Converte os dados do formulário (FormData) para um objeto simples
  const rawData = Object.fromEntries(formData.entries());
  
  // Valida os dados usando o schema do Zod
  const validatedFields = BookSchema.safeParse(rawData);
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    throw new Error("Falha na validação dos dados.");
  }

  // Se a validação passou, chama a função do banco de dados para criar o livro
  try {
    await createBook(validatedFields.data);
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao criar o livro no banco de dados.");
  }

  // Limpa o cache da página da biblioteca para que a lista de livros seja atualizada
  revalidatePath("/biblioteca");
  // Redireciona o usuário de volta para a página da biblioteca
  redirect("/biblioteca");
}

// Ação para ATUALIZAR um livro
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

  // Limpa o cache das páginas afetadas para mostrar os dados novos
  revalidatePath("/biblioteca");
  revalidatePath(`/livros/${id}`);
  // Redireciona o usuário para a página de detalhes do livro que ele acabou de editar
  redirect(`/livros/${id}`);
}

// Ação para DELETAR um livro
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
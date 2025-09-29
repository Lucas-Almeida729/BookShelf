// src/app/api/books/route.ts
import { NextResponse } from "next/server";
import { initialBooks } from "@/lib/mock-data";
import { Book } from "@/types/book";

// GET /api/books - Listar todos os livros
export async function GET() {
  // Em uma aplicação real, aqui você buscaria os dados de um banco de dados.
  // Por enquanto, apenas retornamos nossa lista em memória.
  return NextResponse.json(initialBooks);
}

// POST /api/books - Criar novo livro
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação simples dos dados recebidos
    if (!body.title || !body.author) {
      return NextResponse.json(
        { message: "Título e autor são obrigatórios." },
        { status: 400 }
      );
    }

    const newBook: Book = {
      id: new Date().toISOString(), // Gera um ID único
      title: body.title,
      author: body.author,
      year: body.year,
      pages: body.pages,
      cover: body.cover,
      genre: body.genre,
      status: body.status || "QUERO LER",
      rating: body.rating || 0,
      synopsis: body.synopsis,
    };

    // Adiciona o novo livro à nossa lista em memória
    initialBooks.push(newBook);

    return NextResponse.json(newBook, { status: 201 }); // 201 Created
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar o livro.", error },
      { status: 500 }
    );
  }
}

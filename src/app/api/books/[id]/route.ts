// src/app/api/books/[id]/route.ts
import { NextResponse } from 'next/server';
import { initialBooks } from '@/lib/mock-data';

type Params = {
  params: {
    id: string;
  }
}

// GET /api/books/[id] - Obter detalhes de um livro
export async function GET(request: Request, { params }: Params) {
  const bookId = params.id;
  const book = initialBooks.find(b => b.id === bookId);

  if (!book) {
    return NextResponse.json({ message: 'Livro não encontrado.' }, { status: 404 });
  }

  return NextResponse.json(book);
}

// PUT /api/books/[id] - Atualizar livro existente
export async function PUT(request: Request, { params }: Params) {
  try {
    const bookId = params.id;
    const bookIndex = initialBooks.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
      return NextResponse.json({ message: 'Livro não encontrado.' }, { status: 404 });
    }

    const body = await request.json();
    
    // Atualiza o livro na lista com os novos dados
    initialBooks[bookIndex] = { ...initialBooks[bookIndex], ...body };
    
    return NextResponse.json(initialBooks[bookIndex]);

  } catch (error) {
    return NextResponse.json({ message: 'Erro ao atualizar o livro.', error }, { status: 500 });
  }
}

// DELETE /api/books/[id] - Remover livro
export async function DELETE(request: Request, { params }: Params) {
  const bookId = params.id;
  const bookIndex = initialBooks.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return NextResponse.json({ message: 'Livro não encontrado.' }, { status: 404 });
  }

  // Remove o livro da lista
  initialBooks.splice(bookIndex, 1);

  return NextResponse.json({ message: 'Livro removido com sucesso.' }, { status: 200 });
}
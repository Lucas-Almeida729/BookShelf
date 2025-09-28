// src/app/api/categories/genres/route.ts
import { NextResponse } from 'next/server';
import { genres } from '@/types/book';

// POST /api/categories/genres - Adicionar novo gênero
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newGenre = body.name;

    if (!newGenre || typeof newGenre !== 'string') {
      return NextResponse.json({ message: 'O nome do gênero é obrigatório.' }, { status: 400 });
    }

    // Verifica se o gênero já existe (ignorando maiúsculas/minúsculas)
    if (genres.some(g => g.toLowerCase() === newGenre.toLowerCase())) {
      return NextResponse.json({ message: 'Este gênero já existe.' }, { status: 409 }); // 409 Conflict
    }

    genres.push(newGenre);
    genres.sort(); // Mantém a lista ordenada alfabeticamente

    return NextResponse.json({ message: 'Gênero adicionado com sucesso.', genre: newGenre }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: 'Erro ao adicionar o gênero.' }, { status: 500 });
  }
}
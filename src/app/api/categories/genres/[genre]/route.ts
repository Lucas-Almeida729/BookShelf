// src/app/api/categories/genres/[genre]/route.ts
import { NextResponse } from 'next/server';
import { genres } from '@/types/book';

type Params = {
  params: {
    genre: string;
  }
}

// DELETE /api/categories/genres/[genre] - Remover gênero
export async function DELETE(request: Request, { params }: Params) {
  try {
    // Decodifica o nome do gênero que vem da URL (ex: "Fic%C3%A7%C3%A3o%20Cient%C3%ADfica" vira "Ficção Científica")
    const genreToDelete = decodeURIComponent(params.genre);

    const genreIndex = genres.findIndex(g => g.toLowerCase() === genreToDelete.toLowerCase());

    if (genreIndex === -1) {
      return NextResponse.json({ message: 'Gênero não encontrado.' }, { status: 404 });
    }

    // Remove o gênero do array
    genres.splice(genreIndex, 1);

    return NextResponse.json({ message: `Gênero '${genreToDelete}' removido com sucesso.` });

  } catch (error) {
    return NextResponse.json({ message: 'Erro ao remover o gênero.' }, { status: 500 });
  }
}
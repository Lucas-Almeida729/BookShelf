// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { genres } from '@/types/book';

// GET /api/categories - Listar todos os gêneros
export async function GET() {
  return NextResponse.json(genres);
}
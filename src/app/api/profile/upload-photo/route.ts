// src/app/api/profile/upload-photo/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/option';
import { put } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
  }

  // Ambil nama file dari header 'x-vercel-filename'
  const filename = request.headers.get('x-vercel-filename') || 'profile-photo.png';
  
  // Ambil body request yang berisi file
  const fileBody = request.body;

  if (!fileBody) {
    return NextResponse.json({ error: 'Tidak ada file yang diunggah.' }, { status: 400 });
  }

  try {
    // 1. Unggah file ke Vercel Blob
    const blob = await put(filename, fileBody, {
      access: 'public',
    });

    // 2. Simpan URL permanen yang dikembalikan oleh Vercel Blob ke database
    await prisma.user.update({
        where: { email: session.user.email },
        data: { image: blob.url }, // Simpan URL lengkap dari Vercel Blob
    });

    // 3. Kembalikan URL tersebut ke frontend
    return NextResponse.json({ 
        message: 'Foto berhasil diunggah!', 
        filePath: blob.url 
    });

  } catch (error) {
    console.error("Gagal mengunggah foto ke Vercel Blob:", error);
    return NextResponse.json({ error: 'Gagal mengunggah foto.' }, { status: 500 });
  }
}
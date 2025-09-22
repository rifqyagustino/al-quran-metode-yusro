// src/app/api/profile/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/option'; // Sesuaikan path ke authOptions Anda
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- FUNGSI GET: Mengambil data profil user ---
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true, // Asumsikan 'image' adalah kolom untuk foto profil di DB
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}

// --- FUNGSI PATCH: Memperbarui data profil user ---
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
  }

  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Nama tidak boleh kosong' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { name }, // Hanya update nama
    });

    return NextResponse.json({ message: 'Profil berhasil diperbarui', user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
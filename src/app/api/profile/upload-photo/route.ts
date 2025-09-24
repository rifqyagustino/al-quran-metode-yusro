import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/option'; // Pastikan path ini benar
import { put } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(request: Request) {
  // Bungkus semua logika di dalam satu blok try...catch
  try {
    // 1. Ambil sesi pengguna terlebih dahulu
    const session = await getServerSession(authOptions);

    // 2. Lakukan pengecekan otentikasi
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
    }

    // 3. Ambil file dari request menggunakan formData (lebih andal)
    const formData = await request.formData();
    const file = formData.get('profilePhoto') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah.' }, { status: 400 });
    }
    
    // 4. Unggah file ke Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    // 5. Simpan URL lengkap dari Vercel Blob ke database
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        image: blob.url,
      },
    });

    return NextResponse.json({ message: 'Foto berhasil diunggah!', filePath: blob.url });

  } catch (error) {
    console.error("Gagal mengunggah foto:", error);
    return NextResponse.json({ error: 'Gagal mengunggah foto.', details: (error as Error).message }, { status: 500 });
  }
}
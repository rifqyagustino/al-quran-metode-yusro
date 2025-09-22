// src/app/api/profile/upload-photo/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/option'; // Pastikan path ini benar
import path from 'path';
import fs from 'fs/promises';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('profilePhoto') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const uploadDir = path.join(process.cwd(), 'public/images/profile/uploads');
    
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    const filePath = `/images/profile/uploads/${filename}`;
    
    // --- TAMBAHKAN BAGIAN INI ---
    // 2. Simpan path file ke database
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        image: filePath, // Asumsikan kolom di database Anda bernama 'image'
      },
    });
    // ----------------------------

    return NextResponse.json({ message: 'Foto berhasil diunggah dan profil diperbarui!', filePath });

  } catch (error) {
    console.error("Gagal mengunggah foto:", error);
    return NextResponse.json({ error: 'Gagal mengunggah foto.' }, { status: 500 });
  }
}
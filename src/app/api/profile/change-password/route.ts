// src/app/api/profile/change-password/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/option';
import bcrypt from 'bcryptjs';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Semua field harus diisi.' }, { status: 400 });
    }

    // 1. Ambil data user dari database, termasuk password yang ter-hash
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'User tidak ditemukan.' }, { status: 404 });
    }

    // 2. Bandingkan password saat ini yang dimasukkan dengan yang ada di database
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Kata sandi saat ini salah.' }, { status: 403 });
    }

    // 3. Hash password baru sebelum disimpan
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update password di database
    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({ message: 'Kata sandi berhasil diubah.' });

  } catch (error) {
    console.error("Gagal mengubah password:", error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
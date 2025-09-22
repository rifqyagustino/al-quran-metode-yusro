import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email harus diisi.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.email) {
      return NextResponse.json({ message: 'Email tidak ditemukan.' }, { status: 404 });
    }

    const token = uuidv4();
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // Token valid selama 1 jam

    // Hapus token lama jika ada untuk email ini
    await prisma.passwordResetToken.deleteMany({
        where: { email: user.email },
    });

    // Buat token baru
    await prisma.passwordResetToken.create({
      data: { email: user.email, token, expires },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      tls: { ciphers: 'SSLv3' },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: "Reset Password Akun Metode Yusro Anda",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Reset Password</h2>
          <p>Anda menerima email ini karena ada permintaan untuk mereset password akun Anda. Silakan klik tombol di bawah ini untuk melanjutkan:</p>
          <a href="${resetLink}" 
             style="background-color: #635bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
             Reset Password
          </a>
          <p>Tautan ini akan kedaluwarsa dalam 1 jam.</p>
          <p>Jika Anda tidak merasa meminta reset password, abaikan email ini.</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Gagal mengirim email reset password:", error);
      return NextResponse.json({ message: 'Gagal mengirim email. Silakan coba lagi nanti.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Tautan reset password telah dikirim ke email Anda. Silakan cek inbox atau folder spam.' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}


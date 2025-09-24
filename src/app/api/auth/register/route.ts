import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';



export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Semua field harus diisi.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: 'Email sudah terdaftar.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!user.email) {
      console.error("Registrasi berhasil, tetapi user tidak memiliki email untuk verifikasi.");
      return NextResponse.json({ 
          message: 'Registrasi berhasil, tetapi tidak ada alamat email untuk mengirim verifikasi.' 
      }, { status: 201 });
    }


    const token = uuidv4();
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);

    await prisma.verificationToken.create({
      data: { identifier: user.email, token, expires },
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

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: user.email, // Sekarang ini aman karena kita sudah melakukan pengecekan
      subject: "Aktivasi Akun Metode Yusro Anda",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Selamat Datang di Metode Yusro!</h2>
          <p>Terima kasih telah mendaftar. Silakan klik tombol di bawah ini untuk mengaktivasi akun Anda:</p>
          <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}" 
             style="background-color: #635bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
             Aktivasi Akun
          </a>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email verifikasi terkirim ke:", user.email);
    } catch (error) {
      console.error("Gagal mengirim email verifikasi:", error);
      return NextResponse.json({ 
          message: 'Registrasi berhasil, tetapi gagal mengirim email verifikasi. Silakan coba lagi nanti.' 
      }, { status: 201 });
    }

    return NextResponse.json({ 
        message: 'Registrasi berhasil! Silakan cek email Anda untuk aktivasi akun. Jangan lupa periksa folder Spam/Junk jika email belum terlihat.' 
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
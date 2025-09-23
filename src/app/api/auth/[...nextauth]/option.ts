import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Pastikan user.password tidak null sebelum perbandingan
        if (user && user.password && (await bcrypt.compare(credentials.password, user.password))) {
          if (!user.active) { // Asumsikan ada kolom 'active' di model User Anda
            throw new Error("Akun belum diaktivasi. Silakan cek email Anda.");
          }
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword; // Mengembalikan semua data user kecuali password
        } else {
          throw new Error("Email atau password salah.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Saat sign-in awal, objek 'user' dari authorize akan tersedia.
      // Kita gunakan untuk mengisi token pertama kali.
      if (user) {
        token.id = user.id;
        token.image = user.image;
        token.name = user.name;
        token.email = user.email;
      }
      
      // Pada setiap pemanggilan berikutnya (misal: saat memanggil `update()` atau
      // saat sesi diakses), kita ambil data terbaru dari database.
      const dbUser = await prisma.user.findUnique({
        where: { id: token.id as string },
      });

      // Jika user tidak ditemukan di DB, kembalikan token apa adanya.
      if (!dbUser) {
        return token;
      }

      // Perbarui token dengan data terbaru dari database.
      // Ini memastikan foto profil, nama, dll. selalu up-to-date.
      return {
        ...token,
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
      };
    },

    async session({ session, token }) {
      // Pastikan semua data dari token diteruskan ke objek sesi di client.
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string | null;
      }
      return session;
    },
  },
events: {
    async createUser({ user }) {
      if (!user.email) {
        console.error("User dibuat tanpa email, email verifikasi tidak bisa dikirim.");
        return;
      }
      
      const token = uuidv4();
      const expires = new Date();
      expires.setHours(expires.getHours() + 24);

      await prisma.verificationToken.create({
        data: {
          identifier: user.email,
          token,
          expires,
        },
      });

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });

      const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: "Aktivasi Akun Metode Yusro Anda",
        html: `<p>Silakan klik tombol di bawah ini untuk mengaktivasi akun Anda: <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}">Aktivasi Akun</a></p>`,
      };

      try {
        console.log("[DEBUG] Mencoba mengirim email ke:", user.email);
        await transporter.sendMail(mailOptions);
        console.log("✅ [DEBUG] Email verifikasi BERHASIL dikirim dari aplikasi.");
      } catch (error) {
        console.error("❌ [DEBUG] GAGAL mengirim email dari aplikasi. Error:", error);
      }
      console.log("--- [DEBUG] PROSES PENGIRIMAN EMAIL SELESAI ---\n");
    },
  },
};
// src/app/api/auth/reset-password.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
  
  const { token, password } = req.body;

  if (typeof token !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: "Input tidak valid." });
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken || new Date() > verificationToken.expires) {
    return res.status(400).json({ error: "Token tidak valid atau sudah kedaluwarsa." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: verificationToken.identifier },
    data: { password: hashedPassword },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });

  res.status(200).json({ message: "Password berhasil direset." });
}
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: "Token tidak valid." }, { status: 400 });
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken || new Date() > verificationToken.expires) {
    return NextResponse.json({ error: "Token tidak valid atau sudah kedaluwarsa." }, { status: 400 });
  }

  await prisma.user.update({
    where: { email: verificationToken.identifier },
    data: { active: true, emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });
  
  const loginUrl = new URL('/auth/login?verified=true', request.nextUrl.origin);
  return NextResponse.redirect(loginUrl);
}
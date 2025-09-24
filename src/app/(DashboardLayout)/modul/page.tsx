"use client";

import Card from '@/app/components/dashboard/Card';
import React, { useEffect } from 'react';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Modul() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect kalau belum login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("auth/login");
    }
  }, [status, router]);

  // Saat cek sesi, jangan render dulu
  if (status === "loading") {
    return <div className="p-6">Memeriksa sesi...</div>;
  }

  if (status === "unauthenticated") {
    return null; // sudah diarahkan ke login
  }

  // Data modul
  const modules = [
    { id: 1, title: 'Modul 1', progress: 5, totalParts: 10, status: 'sedang dikerjakan' },
    { id: 2, title: 'Modul 2', progress: 0, totalParts: 21, status: 'belum mulai' },
    { id: 3, title: 'Modul 3', progress: 16, totalParts: 16, status: 'selesai' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Daftar Modul</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link href={`/modul/${module.id}`} key={module.id}>
            <Card
              id={module.id}
              title={module.title}
              progress={module.progress}
              totalParts={module.totalParts}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

import Card from '@/app/components/dashboard/Card';
import React from 'react';
import Link from "next/link";

export default function Modul() {

   // Di file halaman utama Anda (misal: /dashboard/page.tsx)

// Ganti data modules Anda dengan ini untuk melihat perubahannya
const modules = [
  { id: 1, title: 'Jilid 1', progress: 5, totalParts: 10, status: 'sedang dikerjakan' },
  { id: 2, title: 'Jilid 2', progress: 0, totalParts: 21, status: 'belum mulai' },
  { id: 3, title: 'Jilid 3', progress: 16, totalParts: 16, status: 'selesai' },
];
    return (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        // 2. Bungkus Card dengan komponen Link
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
  );
}
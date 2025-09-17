import Card from '@/app/components/dashboard/Card';
import React from 'react';
import Link from "next/link";

export default function Modul() {

    const modules = [
    { id: 1, title: 'Huruf Hijaiyah Terputus', progress: 2, totalParts: 3, status: 'in-progress' },
    { id: 2, title: 'Huruf Hijaiyah Bersambung', progress: 0, totalParts: 5, status: 'not-started' },
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
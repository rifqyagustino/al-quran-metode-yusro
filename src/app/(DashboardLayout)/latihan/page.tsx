// app/(DashboardLayout)/latihan/page.tsx

import CardLatihan from '@/app/components/dashboard/CardLatihan';
import React from 'react';
import Link from 'next/link';
import { exercisesData } from '@/app/data/exercises'; // Mengimpor data

export default function latihan() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Daftar Latihan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercisesData.map((exercise) => (
          <Link href={`/latihan/${exercise.id}`} key={exercise.id}>
            <CardLatihan
              id={parseInt(exercise.id)}
              title={exercise.title}
              progress={exercise.progress}
              totalParts={exercise.totalParts}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
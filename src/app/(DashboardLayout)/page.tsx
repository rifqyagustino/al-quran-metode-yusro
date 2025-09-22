// src/app/(DashboardLayout)/page.tsx
'use client';
import { useSession } from "next-auth/react";
import DashboardStats from "@/app/components/dashboard/DashboardStats";

// Data manual untuk modul-modul. 
// Nantinya, data ini akan diambil dari API.
const modules = [
  { id: 1, title: 'Jilid 1', progress: 5, totalParts: 10, status: 'sedang dikerjakan' as const },
  { id: 2, title: 'Jilid 2', progress: 0, totalParts: 21, status: 'belum mulai' as const },
  { id: 3, title: 'Jilid 3', progress: 16, totalParts: 16, status: 'selesai' as const },
  // Tambahkan modul lain jika ada
];

export default function DashboardPage() {
  // Mengambil data sesi di client
  const { data: session } = useSession();

  // Mengambil nama user, atau 'User' jika tidak ada sesi
  const userName = session?.user?.name || 'User';
  return (
    <div>
       <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Welcome, {userName}!</h1>
        {/* ... sisa kode ... */}
      </div>
  
      
      {/* 1. Menampilkan komponen statistik di bagian atas */}
      {/* Komponen ini menerima data 'modules' untuk melakukan kalkulasi */}
      <DashboardStats modules={modules} />

      
    </div>
  );
}
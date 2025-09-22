// Di file komponen Card Anda (misal: /components/dashboard/Card.tsx)
"use client";

import { Progress } from "flowbite-react";
import { Icon } from "@iconify/react";

// Tipe untuk properti Card
interface CardProps {
  id: number;
  title: string;
  progress: number;
  totalParts: number;
  // Kita buat status opsional untuk mencegah error jika data tidak lengkap
  status?: 'belum mulai' | 'sedang dikerjakan' | 'selesai';
  icon?: string;
}

// Objek untuk styling badge status
const statusStyles = {
  'belum mulai': {
    text: 'Belum Mulai',
    bg: 'bg-gray-100',
    text_color: 'text-gray-600',
  },
  'sedang dikerjakan': {
    text: 'Dikerjakan',
    bg: 'bg-blue-100',
    text_color: 'text-blue-600',
  },
  'selesai': {
    text: 'Selesai',
    bg: 'bg-emerald-100',
    text_color: 'text-emerald-600',
  }
};

const Card = ({ id, title, progress, totalParts, status, icon = "solar:notebook-outline" }: CardProps) => {
  const percentage = totalParts > 0 ? Math.round((progress / totalParts) * 100) : 0;
  
  const currentStatus = statusStyles[status!] || statusStyles['belum mulai'];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Diubah: Warna background & ikon disamakan dengan CardLatihan */}
          <div className="bg-lightsecondary text-secondary p-3 rounded-md">
            <Icon icon={icon} height={24} />
          </div>
          {/* Diubah: Warna teks judul disamakan */}
          <p className="text-lg text-dark font-semibold">{title}</p>
        </div>
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${currentStatus.bg} ${currentStatus.text_color}`}>
          {currentStatus.text}
        </span>
      </div>

      <div className="flex items-center justify-between mb-2">
        {/* Diubah: Warna teks disamakan */}
        <p className="text-sm text-dark">Progres</p>
        <p className="text-sm text-dark font-semibold">{percentage}%</p>
      </div>
      
      {/* Diubah: Warna progress bar disamakan */}
      <Progress progress={percentage} color="secondary" />

      {/* Diubah: Warna teks disamakan */}
      <p className="text-xs text-dark mt-2">
        {progress} dari {totalParts} halaman selesai
      </p>
    </div>
  );
};

export default Card;
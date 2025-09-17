"use client";
import React from "react";
import { Progress } from "flowbite-react";
import { Icon } from "@iconify/react";

// Definisikan tipe data untuk props agar lebih aman
interface CardProps {
  id: number;
  title: string;
  progress: number;
  totalParts: number;
  icon?: string; // Icon dibuat opsional
}

const CardLatihan = ({ id, title, progress, totalParts, icon = "solar:football-outline" }: CardProps) => {
  // Hitung persentase progres, pastikan tidak ada pembagian dengan nol
  const percentage = totalParts > 0 ? Math.round((progress / totalParts) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-lightsecondary text-secondary p-3 rounded-md">
          <Icon icon={icon} height={24} />
        </div>
        <p className="text-lg text-dark font-semibold">Latihan {id}</p>
      </div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-dark">{title}</p>
        <p className="text-sm text-dark">{percentage}%</p>
      </div>
      <Progress progress={percentage} color="secondary" />
    </div>
  );
};

export default CardLatihan;
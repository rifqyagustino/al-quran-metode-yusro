// src/app/components/dashboard/DashboardStats.tsx
"use client";

import React from 'react';
import { Icon } from '@iconify/react';

// Tipe data untuk satu modul
interface Module {
  id: number;
  title: string;
  progress: number;
  totalParts: number;
  status?: 'belum mulai' | 'sedang dikerjakan' | 'selesai';
}

// Tipe props untuk komponen utama kita
interface DashboardStatsProps {
  modules: Module[];
}

// Objek tema untuk styling dinamis setiap kartu statistik
const statThemes = {
  total: {
    icon: 'solar:notebook-outline',
    color: 'primary', // Akan menjadi bg-lightprimary dan text-primary
  },
  completed: {
    icon: 'solar:verified-check-bold-duotone',
    color: 'success', // Akan menjadi bg-lightsuccess dan text-success
  },
  progress: {
    icon: 'solar:chart-bold-duotone',
    color: 'warning', // Akan menjadi bg-lightwarning dan text-warning
  },
};

// Komponen kecil untuk setiap kartu statistik dengan gaya baru
const StatCard = ({ title, value, themeKey }: { title: string; value: string | number; themeKey: keyof typeof statThemes }) => {
  const theme = statThemes[themeKey];

  return (
    // Menggunakan style dari referensi: rounded-xl, p-6
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center gap-4 mb-4">
        {/* Gaya ikon dengan latar belakang berwarna */}
        <div className={`p-3 rounded-lg bg-light${theme.color} text-${theme.color}`}>
          <Icon icon={theme.icon} height={28} />
        </div>
        <p className="text-md text-dark/80 font-medium">{title}</p>
      </div>
      <p className="text-3xl font-bold text-dark">{value}</p>
    </div>
  );
};

// Komponen utama untuk statistik
const DashboardStats = ({ modules }: DashboardStatsProps) => {
  if (!modules || modules.length === 0) {
    return null;
  }

  // === Kalkulasi Statistik (tidak ada perubahan) ===
  const totalModules = modules.length;
  const completedModules = modules.filter(module => module.status === 'selesai').length;
  const totalProgress = modules.reduce((acc, module) => acc + module.progress, 0);
  const totalAllParts = modules.reduce((acc, module) => acc + module.totalParts, 0);
  const overallProgressPercentage = totalAllParts > 0 
    ? Math.round((totalProgress / totalAllParts) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Modul" 
        value={totalModules} 
        themeKey="total"
      />
      <StatCard 
        title="Modul Selesai" 
        value={completedModules} 
        themeKey="completed"
      />
      <StatCard 
        title="Progres Keseluruhan" 
        value={`${overallProgressPercentage}%`} 
        themeKey="progress"
      />
    </div>
  );
};

export default DashboardStats;
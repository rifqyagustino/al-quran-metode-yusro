"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
// Sebaiknya gunakan absolute path untuk import agar lebih aman
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";

export default function HomePage() {
  return (
    <>
      {/* ===== Header & Logo with Auth Buttons (Fixed) ===== */}
      <header className="py-4 md:py-6 px-4 md:px-8 flex justify-between items-center shadow-md fixed top-0 w-full z-50 bg-white dark:bg-darkgray">
        {/* Logo */}
        <div className="flex-shrink-0">
          {/* === PERBAIKAN DI SINI === */}
          {/* Hapus Link yang membungkus FullLogo, karena FullLogo sudah merupakan Link */}
          <FullLogo />
        </div>

        {/* Tombol Masuk & Daftar */}
        <div className="flex gap-2 sm:gap-4">
          <Link href="/auth/login" passHref>
            <button className="bg-transparent text-primary font-semibold py-1.5 px-3 rounded-full border-2 border-primary hover:bg-lightprimary transition duration-300 text-sm md:text-base md:py-2 md:px-6">
              Masuk
            </button>
          </Link>
          <Link href="/auth/register" passHref>
            <button className="bg-primary text-white font-semibold py-1.5 px-3 rounded-full shadow-lg hover:bg-primary-emphasis transition duration-300 text-sm md:text-base md:py-2 md:px-6">
              Daftar
            </button>
          </Link>
        </div>
      </header>
      
      {/* Tambahkan padding atas untuk mengimbangi header yang fixed */}
      <div className="pt-20">
        {/* ===== Hero Section ===== */}
        <section className="bg-white dark:bg-darkgray overflow-hidden">
          <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="grid grid-cols-12 items-center gap-6 md:gap-10">
              {/* Teks & Tombol */}
              <div className="col-span-12 lg:col-span-6 text-center lg:text-left">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black dark:text-white leading-tight mb-4">
                  Belajar Qur'an dengan Metode <span className="text-primary">Yusro</span>
                </h1>
                <p className="text-base md:text-xl text-gray-700 dark:text-gray-300 mb-6">
                  Metode pembelajaran yang mudah, cepat, dan efektif untuk membaca Al-Qur'an.
                </p>
                <div className="flex justify-center lg:justify-start gap-3 flex-wrap">
                  <Link href="/modul" passHref>
                    <button className="bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-primary-emphasis transition duration-300 text-sm">
                      Mulai Belajar
                    </button>
                  </Link>
                  <Link href="/latihan" passHref>
                    <button className="bg-white text-primary font-semibold py-2 px-6 rounded-full border-2 border-primary hover:bg-lightprimary transition duration-300 text-sm">
                      Coba Latihan
                    </button>
                  </Link>
                </div>
              </div>
              {/* Tiga Kotak Card */}
              <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
                {/* Kotak Card Atas */}
                <div className="flex-1 p-6 rounded-xl text-white text-center bg-primary">
                  <Icon icon="solar:book-linear" className="text-5xl mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-1 text-white">Jelajahi Modul Interaktif</h3>
                  <p className="text-sm opacity-90">Materi lengkap, mudah dipahami, untuk semua tingkatan.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Kotak Card Kiri Bawah */}
                  <div className="p-4 rounded-xl text-dark dark:text-white text-center bg-lightsecondary dark:bg-darkmuted">
                    <Icon icon="solar:users-group-rounded-linear" className="text-4xl mx-auto mb-2 text-secondary" />
                    <h3 className="text-lg font-bold mb-1 ">1000+ Pengguna Aktif</h3>
                    <p className="text-xs text-gray-700 dark:text-gray-300">Bergabunglah dengan komunitas kami!</p>
                  </div>
                  {/* Kotak Card Kanan Bawah */}
                  <div className="p-4 rounded-xltext-dark dark:text-white text-center bg-lightprimary dark:bg-darkmuted">
                    <Icon icon="tabler:clock-bolt" className="text-4xl mx-auto mb-2 text-primary" />
                    <h3 className="text-lg font-bold mb-1">Belajar cepat</h3>
                    <p className="text-xs text-gray-700 dark:text-gray-300">Belajar cepat dan mudah.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Fitur Utama ===== */}
        <section className="bg-lightgray dark:bg-darkmuted py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-dark dark:text-white mb-2">Kenapa Memilih Yusro?</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Kami hadir untuk membuat proses belajar membaca Al-Qur'an menjadi lebih menyenangkan dan efektif.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {/* Fitur 1 */}
              <div className="p-6 bg-white dark:bg-darkgray rounded-lg shadow-md">
                <div className="flex justify-center mb-3">
                  <Icon icon="solar:star-fall-bold-duotone" className="text-primary text-4xl" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-dark dark:text-white">Metode Mudah</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Langkah demi langkah, dari dasar hingga mahir dengan materi yang terstruktur.
                </p>
              </div>
              {/* Fitur 2 */}
              <div className="p-6 bg-white dark:bg-darkgray rounded-lg shadow-md">
                <div className="flex justify-center mb-3">
                  <Icon icon="solar:clock-circle-bold-duotone" className="text-primary text-4xl" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-dark dark:text-white">Latihan Interaktif</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uji pemahaman dengan latihan suara dan pengenalan huruf.
                </p>
              </div>
              {/* Fitur 3 */}
              <div className="p-6 bg-white dark:bg-darkgray rounded-lg shadow-md">
                <div className="flex justify-center mb-3">
                  <Icon icon="solar:shield-user-bold-duotone" className="text-primary text-4xl" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-dark dark:text-white">Progres Terpantau</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pantau kemajuan belajar Anda dan lihat seberapa jauh Anda sudah melangkah.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Call to Action ===== */}
        <section className="bg-primary py-12 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">Siap untuk Memulai Perjalanan Anda?</h2>
            <p className="text-sm text-white mb-6 opacity-90">
              Bergabunglah dengan ribuan pelajar yang telah berhasil bersama Yusro.
            </p>
            <Link href="/auth/register" passHref>
              <button className="bg-white text-primary font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 text-sm">
                Daftar Sekarang
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
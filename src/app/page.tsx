"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import FullLogo from "./(DashboardLayout)/layout/shared/logo/FullLogo";
import { useSession } from "next-auth/react";
import {
  Navbar,
  NavbarCollapse,
  NavbarLink,
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import { usePathname } from "next/navigation";
import Profile from "./(DashboardLayout)/layout/vertical/header/Profile";

export default function HomePage() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const NavLinks = [
    { name: "Beranda", url: "/" },
    { name: "Dashboard", url: "/dashboard" },
  ];

  return (
    <>
      {/* ===== HEADER ===== */}
      <Navbar
        fluid
        rounded
        className="fixed top-0 w-full z-50 bg-white dark:bg-darkgray shadow-md px-3 md:px-6"
      >
        {/* Logo */}
        <FullLogo />

        {/* Tombol kanan navbar */}
        <div className="flex md:order-2 items-center gap-2">
          {status === "authenticated" ? (
            <Profile />
          ) : (
            // Tombol auth (desktop)
            <div className="hidden md:flex gap-2">
              <Link href="/auth/login" passHref legacyBehavior>
                <button className="bg-white text-primary font-semibold py-1.5 px-3 md:py-2 md:px-6 rounded-full border border-primary hover:bg-lightprimary transition duration-300 text-xs md:text-sm">
                  Masuk
                </button>
              </Link>
              <Link href="/auth/register" passHref legacyBehavior>
                <button className="bg-primary text-white font-semibold py-1.5 px-3 md:py-2 md:px-6 rounded-full hover:bg-primary-emphasis transition duration-300 text-xs md:text-sm">
                  Daftar
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <Dropdown
              dismissOnClick
              arrowIcon={false}
              renderTrigger={() => (
                <Icon
                  icon="mdi:menu"
                  width="28"
                  height="28"
                  className="text-gray-700 cursor-pointer" />
              )} label={undefined}            >
              {NavLinks.map((link) => (
                <DropdownItem
                  key={link.name}
                  as={Link}
                  href={link.url}
                  className="hover:bg-gray-100 hover:text-primary transition-colors"
                >
                  {link.name}
                </DropdownItem>
              ))}

              {status !== "authenticated" && (
                <>
                  <DropdownDivider />
                  <DropdownItem
                    as={Link}
                    href="/auth/login"
                    className="hover:bg-gray-100 hover:text-primary transition-colors"
                  >
                    Masuk
                  </DropdownItem>
                  <DropdownItem
                    as={Link}
                    href="/auth/register"
                    className="hover:bg-gray-100 hover:text-primary transition-colors"
                  >
                    Daftar
                  </DropdownItem>
                </>
              )}
            </Dropdown>
          </div>
        </div>

        {/* Menu Collapse (desktop) */}
        <NavbarCollapse className="ms-auto me-3 md:me-6 hidden md:flex">
          {NavLinks.map((link) => (
            <Link key={link.name} href={link.url} passHref legacyBehavior>
              <NavbarLink
                href={link.url}
                className={`${
                  pathname === link.url
                    ? "text-primary bg-transparent"
                    : "text-gray-400"
                } text-sm md:text-md font-normal`}
              >
                {link.name}
              </NavbarLink>
            </Link>
          ))}
        </NavbarCollapse>
      </Navbar>

      {/* ===== Content Wrapper ===== */}
      <div className="pt-20">
        {/* ===== Hero Section ===== */}
        <section className="bg-lightgray dark:bg-darkgray overflow-hidden">
          <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="grid grid-cols-12 items-center gap-6 md:gap-10">
              {/* Teks & Tombol */}
              <div className="col-span-12 lg:col-span-6 text-center lg:text-left">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black dark:text-white leading-tight mb-4">
                  Belajar Qur'an dengan Metode{" "}
                  <span className="text-primary">Yusro</span>
                </h1>
                <p className="text-base md:text-xl text-gray-700 dark:text-gray-300 mb-6">
                  Metode pembelajaran yang mudah, cepat, dan efektif untuk
                  membaca Al-Qur'an.
                </p>
                <div className="flex justify-center lg:justify-start gap-3 flex-wrap">
                  {/* Tombol Mulai Belajar */}
                  <Link
                    href={status === "authenticated" ? "/modul" : "/auth/login"}
                    passHref
                  >
                    <button className="bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-primary-emphasis transition duration-300 text-sm">
                      Mulai Belajar
                    </button>
                  </Link>

                  {/* Tombol Coba Latihan */}
                  <Link
                    href={
                      status === "authenticated" ? "/latihan" : "/auth/login"
                    }
                    passHref
                  >
                    <button className="bg-white text-primary font-semibold py-2 px-6 rounded-full border-2 border-primary hover:bg-lightprimary transition duration-300 text-sm">
                      Coba Latihan
                    </button>
                  </Link>
                </div>¬
              </div>

              {/* Card Samping */}
              <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
                <div className="flex-1 p-6 rounded-xl text-white text-center bg-primary">
                  <Icon
                    icon="solar:book-linear"
                    className="text-5xl mx-auto mb-3"
                  />
                  <h3 className="text-xl font-bold mb-1 text-white">
                    Jelajahi Modul Interaktif
                  </h3>
                  <p className="text-sm opacity-90">
                    Materi lengkap, mudah dipahami, untuk semua tingkatan.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl text-dark dark:text-white text-center bg-lightsecondary dark:bg-darkmuted">
                    <Icon
                      icon="solar:users-group-rounded-linear"
                      className="text-4xl mx-auto mb-2 text-secondary"
                    />
                    <h3 className="text-lg font-bold mb-1 ">
                      1000+ Pengguna Aktif
                    </h3>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Bergabunglah dengan komunitas kami!
                    </p>
                  </div>
                  <div className="p-4 rounded-xl text-dark dark:text-white text-center bg-lightprimary dark:bg-darkmuted">
                    <Icon
                      icon="solar:medal-ribbon-linear"
                      className="text-4xl mx-auto mb-2 text-primary-emphasis"
                    />
                    <h3 className="text-lg font-bold mb-1">
                      Sertifikat Kelulusan
                    </h3>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Raihlah pengakuan atas usahamu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Apa itu Metode Yusro? ===== */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-left mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-center text-dark dark:text-white mb-2">
                Apa Itu Metode Yusro?
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 items-center">
              <div>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Metode Yusro adalah pendekatan revolusioner dalam pembelajaran
                  Al-Qur'an yang fokus pada kemudahan dan kecepatan. Dengan
                  memecah materi menjadi unit-unit kecil yang mudah dicerna,
                  Yusro memastikan setiap pembelajar, baik anak-anak maupun
                  dewasa, dapat membaca Al-Qur'an dalam waktu singkat.
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  Sistem kami mengintegrasikan audio interaktif, latihan
                  pengenalan huruf dan tajwid, serta fitur pelacakan progres
                  yang membuat belajar menjadi pengalaman yang menyenangkan dan
                  efektif.
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Pendekatan ini didasarkan pada prinsip pengulangan dan
                  visualisasi yang terbukti efektif dalam meningkatkan daya
                  ingat dan pemahaman. Kami percaya bahwa setiap orang berhak
                  mendapatkan akses mudah untuk mempelajari Al-Qur'an, dan Yusro
                  hadir sebagai solusinya.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Fitur Utama ===== */}
        <section className="bg-lightgray dark:bg-darkmuted py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-dark dark:text-white mb-2">
                Kenapa Memilih Yusro?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Kami hadir untuk membuat proses belajar membaca Al-Qur'an
                menjadi lebih menyenangkan dan efektif.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-white dark:bg-darkgray rounded-lg shadow-md">
                <div className="flex justify-center mb-3">
                  <Icon
                    icon="solar:star-fall-bold-duotone"
                    className="text-primary text-4xl"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-dark dark:text-white">
                  Metode Mudah
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Langkah demi langkah, dari dasar hingga mahir dengan materi
                  yang terstruktur.
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-darkgray rounded-lg shadow-md">
                <div className="flex justify-center mb-3">
                  <Icon
                    icon="solar:clock-circle-bold-duotone"
                    className="text-primary text-4xl"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-dark dark:text-white">
                  Latihan Interaktif
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uji pemahaman dengan latihan suara dan pengenalan huruf.
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-darkgray rounded-lg shadow-md">
                <div className="flex justify-center mb-3">
                  <Icon
                    icon="solar:shield-user-bold-duotone"
                    className="text-primary text-4xl"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-dark dark:text-white">
                  Progres Terpantau
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pantau kemajuan belajar Anda dan lihat seberapa jauh Anda
                  sudah melangkah.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Call to Action ===== */}
        <section className="bg-primary py-12 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Siap untuk Memulai Perjalanan Anda?
            </h2>
            <p className="text-sm text-white mb-6 opacity-90">
              Bergabunglah dengan ribuan pelajar yang telah berhasil bersama
              Yusro.
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

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import AuthRegister from "../authforms/AuthRegister";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";
import Image from "next/image";

const BoxedRegister = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-2 h-screen">
      {/* Sisi Kiri (Formulir Registrasi) */}
      <div className="flex h-full items-center justify-center px-4 py-8 bg-white dark:bg-darkgray">
        <div className="rounded-xl bg-white dark:bg-darkgray p-8 w-full md:w-96 border-none">
          <h1 className="text-3xl text-dark dark:text-white font-bold my-3 text-center lg:text-left">
            Daftar Akun Baru
          </h1>
          <p className="text-base text-gray-700 dark:text-gray-300 my-3 text-center lg:text-left">
            Silakan isi data di bawah untuk memulai perjalanan Anda.
          </p>
          <AuthRegister />
          <div className="flex gap-2 text-base text-gray-600 dark:text-gray-400 font-medium mt-6 items-center justify-center lg:justify-start">
            <p>Sudah Punya Akun?</p>
            <Link
              href="/auth/login"
              className="text-primary text-sm font-medium hover:text-primary-emphasis"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Sisi kanan (Gambar & Kutipan Hadis) */}
      <div className="relative hidden lg:block overflow-hidden h-full">
        <div className="absolute inset-0 bg-primary-emphasis opacity-80 flex flex-col items-center justify-center text-white p-10">
          <div className="max-w-md text-center">
            <p className="text-3xl leading-relaxed font-arabic">
              خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
            </p>
            <p className="text-xl leading-relaxed mt-4">
              "Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya."
            </p>
            <p className="text-base text-gray-200 mt-2">
              - (HR. Bukhari no. 5027)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxedRegister;
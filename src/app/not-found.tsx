"use client";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan",
};

const NotFoundPage = () => {
  const gradientStyle = {
    background:
      "linear-gradient(45deg, rgb(238, 119, 82,0.1), rgb(231, 60, 126,0.1), rgb(35, 166, 213,0.1), rgb(35, 213, 171,0.1))",
    backgroundSize: "400% 400%",
    animation: "gradient 15s ease infinite",
  };

  return (
    <div
      style={gradientStyle}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
    >
      <div className="max-w-lg w-full">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-32 w-32 text-primary opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.875 13.125l2.25-2.25"
            />
          </svg>
        </div>
        <h1 className="text-6xl font-extrabold text-dark tracking-tighter mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-dark mb-2">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-base text-darklink mb-8 max-w-sm mx-auto">
          Maaf, halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau
          tidak pernah ada.
        </p>
        <a
          href="/"
          className="inline-block bg-primary text-white hover:bg-primaryemphasis font-medium rounded-lg text-lg px-6 py-3 mx-auto transition-colors"
        >
          Kembali ke Beranda
        </a>
      </div>
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;

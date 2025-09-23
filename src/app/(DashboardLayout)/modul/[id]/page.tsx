"use client";

import React, { useState, useRef, useEffect } from 'react'; // Import useRef dan useEffect
import { Play } from 'lucide-react';

// Tipe props untuk ProgressBar
type ProgressBarProps = {
  current: number;
  total: number;
};

// Komponen ProgressBar (tidak ada perubahan)
const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const progressPercentage = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-1">
        <span className="text-base font-medium text-emerald-700">
          Progres Bagian A
        </span>
        <span className="text-sm font-medium text-emerald-700">
          {current} dari {total} huruf
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  )
};

// Perubahan 3: Tambahkan logika audio ke dalam LetterCard
const LetterCard = ({ letter, audioSrc, active = false, onPlay }: { letter: string; audioSrc: string; active?: boolean; onPlay: () => void; }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // useEffect untuk memuat audio saat komponen pertama kali dirender
  useEffect(() => {
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
    }
  }, [audioSrc]);

  // Fungsi internal untuk memutar audio lalu memanggil onPlay dari parent
  const handleAudioPlay = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Putar audio
      onPlay(); // Jalankan fungsi dari parent (update progress & highlight)
    }
  };

  const baseClasses = "aspect-square rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 group";
  const activeClasses = "bg-emerald-50 border-2 border-emerald-300 shadow-lg";
  const inactiveClasses = "bg-white border-2 border-gray-200";

  return (
    <div className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
      <span className="text-8xl font-normal text-black mb-4">{letter}</span>
      <button
        onClick={handleAudioPlay}
        className="w-12 h-11 bg-emerald-500 rounded-lg flex cursor-pointer items-center justify-center text-white shadow-md group-hover:bg-emerald-600 transition-colors"
        aria-label={`Putar suara huruf ${letter}`}
      >
        <Play size={24} fill="white" />
      </button>
    </div>
  );
};


// Komponen utama
export default function Modul() {
  // Perubahan 1: Ubah struktur data menjadi objek yang berisi huruf dan path audio
   const letterData = [
    { letter: "فَ", audioSrc: "/audio/Halaman_1/fa.mp3" },
    { letter: "مَ", audioSrc: "/audio/Halaman_1/ma.mp3" },
    { letter: "بَ", audioSrc: "/audio/Halaman_1/ba.mp3" },
  ];
  
  const [playedLetters, setPlayedLetters] = useState(new Set([letterData[0].letter]));
  const [activeLetter, setActiveLetter] = useState(letterData[0].letter);

  const handlePlay = (letter: string) => {
    console.log("Memperbarui state untuk:", letter);
    setActiveLetter(letter);
    setPlayedLetters(prevPlayed => new Set(prevPlayed).add(letter));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <span className="bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">
          Bagian A
        </span>
        <h2 className="text-2xl font-bold text-gray-800 mt-3">Simak Pelafalan Huruf</h2>
        <p className="text-gray-600 mt-1">Klik pada setiap huruf untuk mendengarkan pelafalannya.</p>
      </div>
      
      <ProgressBar 
        current={playedLetters.size} 
        total={letterData.length} 
      />
      
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4 justify-center">
        {/* Perubahan 2: Map dari letterData dan kirim audioSrc sebagai prop */}
        {letterData.map((data) => (
          <LetterCard
            key={data.letter}
            letter={data.letter}
            audioSrc={data.audioSrc}
            active={activeLetter === data.letter}
            onPlay={() => handlePlay(data.letter)}
          />
        ))}
      </div>
    </div>
  );
}
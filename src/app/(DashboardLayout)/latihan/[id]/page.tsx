// app/(DashboardLayout)/latihan/[id]/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import HijaiyahCard from '@/app/components/dashboard/HijaiyahCard';
import { exercisesData } from '@/app/data/exercises'; // Mengimpor data

export default function LatihanDetailPage({ params }: { params: { id: string } }) {
  const [recordings, setRecordings] = useState<Record<string, Blob>>({});
  const [allRecorded, setAllRecorded] = useState(false);

  // Cari data latihan yang sesuai dengan ID dari URL
  const exercise = exercisesData.find(ex => ex.id === params.id);
  
  if (!exercise) {
    notFound();
  }

  useEffect(() => {
    const totalLetters = exercise.letters.length;
    const recordedCount = Object.keys(recordings).length;
    setAllRecorded(recordedCount === totalLetters);
  }, [recordings, exercise.letters.length]);

  const handleRecordingComplete = (letterIndex: number) => (audioBlob: Blob) => {
    setRecordings(prev => ({
      ...prev,
      [letterIndex]: audioBlob,
    }));
  };

  const handleUploadAll = async () => {
    if (!allRecorded) return;

    for (const letterIndex in recordings) {
      const audioBlob = recordings[letterIndex];
      const fileName = `${uuidv4()}.webm`;
      console.log(`Simulasi: Mengunggah ${fileName} untuk huruf ke-${parseInt(letterIndex) + 1}`);
    }
    alert('Semua rekaman berhasil diunggah dan siap diperiksa!');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Latihan: {exercise.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{exercise.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {exercise.letters.map((item, index) => (
          <HijaiyahCard
            key={index}
            letter={item.letter}
            exampleAudioUrl={item.audioUrl}
            onRecordingStart={() => {}}
            onRecordingComplete={handleRecordingComplete(index)}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button
          onClick={handleUploadAll}
          className={`px-8 py-4 rounded-lg font-bold text-white transition-all ${
            allRecorded ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!allRecorded}
        >
          Periksa Hasil
        </button>
      </div>
    </div>
  );
}
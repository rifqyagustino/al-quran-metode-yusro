"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface HijaiyahCardProps {
  letter: string;
  exampleAudioUrl: string;
  onRecordingComplete: (audioBlob: Blob) => void;
  onRecordingStart: () => void;
}

const HijaiyahCard = ({ letter, exampleAudioUrl, onRecordingComplete, onRecordingStart }: HijaiyahCardProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isRecorded, setIsRecorded] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function getMicrophoneAccess() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        
        mediaRecorderRef.current.ondataavailable = event => {
          audioChunksRef.current.push(event.data);
        };
        
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setRecordedAudioUrl(audioUrl);
          setIsRecorded(true);
          onRecordingComplete(audioBlob);
          audioChunksRef.current = [];
        };
      } catch (err) {
        console.error('Akses microphone ditolak atau tidak ada.', err);
        alert('Akses microphone diperlukan untuk latihan ini.');
      }
    }
    getMicrophoneAccess();
  }, [onRecordingComplete]);

  const startRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      setIsRecording(true);
      onRecordingStart();
      mediaRecorderRef.current.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const playRecordedAudio = () => {
    if (recordedAudioUrl) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = recordedAudioUrl;
        audioPlayerRef.current.play();
        setIsPlaying(true);
        audioPlayerRef.current.onended = () => setIsPlaying(false);
      }
    }
  };
  
  const reRecord = () => {
    setRecordedAudioUrl(null);
    setIsRecorded(false);
    startRecording();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <audio ref={audioPlayerRef} controls={false} />
      
      <div className="flex justify-center items-center text-8xl font-arabic text-black mb-4">
        {letter}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {/* Tombol Play/Pause untuk rekaman user */}
        {isRecorded && (
          <button 
            onClick={playRecordedAudio} 
            className="bg-primary text-white p-3 rounded-full"
            disabled={isPlaying}
          >
            <Icon icon={isPlaying ? "solar:pause-circle-bold" : "solar:play-circle-bold"} height={24} />
          </button>
        )}
        
        {/* Tombol Rekam/Berhenti */}
        {!isRecording && !isRecorded && (
          <button onClick={startRecording} className="bg-green-100 text-green-500 p-3 rounded-full">
            <Icon icon="solar:microphone-bold" height={24} />
          </button>
        )}

        {isRecording && (
          <button onClick={stopRecording} className="bg-red-100 text-red-500 p-3 rounded-full">
            <Icon icon="solar:stop-circle-bold" height={24} />
          </button>
        )}

        {/* Tombol Rekam Ulang */}
        {isRecorded && (
          <button onClick={reRecord} className="bg-gray-100 text-gray-500 p-3 rounded-full">
            <Icon icon="solar:refresh-circle-bold" height={24} />
          </button>
        )}
      </div>
      
      {/* Tampilan visual seperti di gambar */}
      <style jsx>{`
        .font-arabic {
          font-family: 'Scheherazade New', 'Noto Naskh Arabic', serif;
        }
      `}</style>
    </div>
  );
};

export default HijaiyahCard;
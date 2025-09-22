"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Label, TextInput } from 'flowbite-react';
import { Icon } from '@iconify/react';

// Data simulasi pengguna
const userProfile = {
  name: 'Wildan Maulana',
  email: 'wildan@example.com',
  photo: 'https://placehold.co/150x150/0077b6/fff?text=WM', // Ganti dengan URL gambar profil Anda
};

export default function Profil() {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);

  const handleUpdateProfile = () => {
    // Simulasi fungsi update profil
    alert('Profil berhasil diperbarui!');
    console.log('Nama baru:', name);
    console.log('Email baru:', email);
  };

  const handleResetPassword = () => {
    // Simulasi fungsi reset password
    alert('Link reset password telah dikirim ke email Anda.');
  };

  const handlePhotoUpload = () => {
    // Fungsi ini akan Anda implementasikan nanti
    alert('Fungsi upload foto akan datang!');
  };

  return (
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        
        {/* Bagian Foto Profil */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-gray-200 cursor-pointer" onClick={handlePhotoUpload}>
            <Image
              src={userProfile.photo}
              alt="Foto Profil"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <Icon icon="solar:camera-outline" className="text-white text-3xl" />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Klik untuk mengubah foto profil</p>
        </div>

        {/* Formulir Profil */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nama" value="Nama Lengkap" />
            </div>
            <TextInput
              id="nama"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Alamat Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Button
            onClick={handleUpdateProfile}
            className="flex-1 bg-primary text-white hover:bg-primary-emphasis"
          >
            Update Profil
          </Button>
          <Button
            onClick={handleResetPassword}
            className="flex-1 bg-gray-200 text-black hover:bg-gray-300"
          >
            Reset Kata Sandi
          </Button>
        </div>
      </div>
  );
}
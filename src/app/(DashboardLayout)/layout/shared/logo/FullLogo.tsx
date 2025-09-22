"use client";
import React from "react";
import Image from "next/image";
import Logo from "/public/images/logos/logo.png";
import Link from "next/link";
const FullLogo = () => {
  return (
    <Link href={"/"}>
      {/* Logo untuk tema terang */}
      <Image 
        src={Logo} 
        alt="logo" 
        className="block dark:hidden rtl:scale-x-[-1]" 
        width={200} // Atur lebar logo di sini
      />
      
      {/* Logo untuk tema gelap */}
      <Image 
        src={Logo} // Anda bisa gunakan logo yang sama atau yang berbeda
        alt="logo" 
        className="hidden dark:block rtl:scale-x-[-1]" 
        width={200} // Atur lebar logo di sini
      />
    </Link>
  );
};

export default FullLogo;
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import assets from "../assets/assets";

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc = currentTheme === "dark" ? assets.darkLogo : assets.logo;

  return (
    <nav
      className="
        flex items-center justify-between fixed top-0 left-0 w-full z-30
        px-4 sm:px-12 lg:px-24 xl:px-40 py-5
        transition-colors duration-300
        bg-white dark:bg-black
        text-black dark:text-white
        shadow-xl
      "
    >
      {/* Logo */}
      <Link href="/" onClick={() => setSidebarOpen(false)} className="items-center">
        <Image
          src={logoSrc}
          alt="Okatsu Logo"
          width={128}
          height={40}
          className="w-32 h-auto"
        />
      </Link>

      {/* Links */}
      <ul className="flex flex-row gap-6 font-medium">
        <Link href="/">Home</Link>
        <Link href="#">Anime</Link>
        <Link href="#">Characters</Link>
        <Link href="#">Genre</Link>
        <Link href="#" className="pl-4">Sign in</Link>
      </ul>
    </nav>
  );
};

export default NavBar;

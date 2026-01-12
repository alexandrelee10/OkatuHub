"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import assets from "../assets/assets";

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-zinc-900 text-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6 sm:px-8 lg:px-10">
          {/* Logo */}
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <img src={assets.logo} alt="" className=" h-15"/>

          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/">Anime</Link>
            <Link href="#">Characters</Link>
            <Link href="#">Genres</Link>
            <Link href="#"><img src={assets.person_icon} alt="" /></Link>
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <img src={assets.menu_dark} alt="Open menu" className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY + SLIDE MENU (hidden on md+) */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          ${sidebarOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-black/60
            transition-opacity duration-300
            ${sidebarOpen ? "opacity-100" : "opacity-0"}
          `}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Slide-out panel */}
        <div
          className={`
            absolute top-0 right-0 h-full w-60
            bg-black text-white
            p-6 flex flex-col gap-6
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Close button */}
          <button
            className="self-end mb-4"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <span className="text-xl">✕</span>
          </button>

          {/* Links – all close the menu */}
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            Anime
          </Link>
          <Link href="#" onClick={() => setSidebarOpen(false)}>
            Characters
          </Link>
          <Link href="#" onClick={() => setSidebarOpen(false)}>
            Genres
          </Link>
          <Link href="#" onClick={() => setSidebarOpen(false)}>
            Search
          </Link>
          <Link href="#" onClick={() => setSidebarOpen(false)}>
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;

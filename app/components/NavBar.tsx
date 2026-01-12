"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import assets from "../assets/assets";

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const links = [
    { label: "Anime", href: "/" },
    { label: "Characters", href: "#" },
    { label: "Genre", href: "#" },
    { 
      href: "#",
      icon: assets.bookmark_icon,
      alt: "favorites"
    },

    {
      href: "/#",
      icon: assets.search_icon,
      alt: "",
    },    
    {
      href: "/#",
      icon: assets.profile_icon,
      alt: "Sign in",
    }
  ];

  // classname helper
  function classnames(classes: Record<string, boolean>) {
    return Object.entries(classes)
      .filter(([, value]) => value)
      .map(([cls]) => cls)
      .join(" ");
  }

  return (
    <>
      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-red-950 text-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6 sm:px-8 lg:px-10">
          {/* Logo */}
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <img src={assets.logo} alt="Okatsu logo" className="h-10" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className=" hover:underline hover:text-zinc-800 transition-colors"
                >
                  {link.icon ? (
                    <Image
                      src={link.icon}
                      alt={link.alt ?? "icon"}
                      width={28}
                      height={28}
                      className="rounded-full hover:opacity-80 transition"
                    />
                  ) : (
                    link.label
                  )}
                </Link>
              </li>
            ))}
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

          {/* Mobile links – reuse config if you want */}
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2"
            >
              {link.icon ? (
                <>
                  <Image
                    src={link.icon}
                    alt={link.alt ?? "icon"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span>Sign in</span>
                </>
              ) : (
                link.label
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavBar;

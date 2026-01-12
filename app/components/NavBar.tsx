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
      alt: "Bookmark",
    },
    {
      href: "/#",
      icon: assets.search_icon,
      alt: "Search",
    },
    {
      href: "/signin",
      icon: assets.profile_icon,
      alt: "Sign in",
    },
  ];

  return (
    <>
      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-red-950 text-white shadow-md">
        <div
          className="
            w-full flex items-center
            justify-center md:justify-between
            h-16 px-4 sm:px-8 lg:px-10
            relative
          "
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center md:justify-start"
          >
            <img
              src={assets.logo}
              alt="Okatsu logo"
              className="h-12 md:h-14"
            />
          </Link>

          {/* Desktop links (right side on md+) */}
          <ul className="hidden md:flex items-center gap-8 font-medium ml-auto">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:underline hover:text-zinc-300 transition-colors"
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

          {/* Mobile menu button (stays on the right, doesn't affect flex) */}
          <button
            className="md:hidden absolute right-4"
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

          {/* Mobile links */}
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
                  <span>{link.alt}</span>
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

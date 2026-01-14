"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import assets from "../assets/assets";

interface SafeUser {
  id: string;
  username: string;
  email: string;
  image?: string | null;
}

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<SafeUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // desktop profile dropdown
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false); // mobile bottom profile dropdown

  // NEW: search dropdown state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  // Core navigation links (no icons)
  const navLinks = [
    { label: "Anime", href: "/anime" },
    { label: "Characters", href: "#characters" },
    { label: "Genre", href: "#" },
  ];

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setMenuOpen(false);
      setMobileProfileOpen(false);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // NEW: submit handler for dropdown search
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (!q) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

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
            onClick={() => {
              setSidebarOpen(false);
              setMenuOpen(false);
              setMobileProfileOpen(false);
              setSearchOpen(false);
            }}
            className="flex items-center justify-center md:justify-start"
          >
            <Image
              src={assets.logo}
              alt="Okatsu logo"
              className="h-12 md:h-14 w-auto"
              width={160}
              height={56}
            />
          </Link>

          {/* Desktop links (right side on md+) */}
          <ul className="hidden md:flex items-center gap-6 font-medium ml-auto">
            {/* Text links */}
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:underline hover:text-zinc-300 transition-colors"
                  onClick={() => {
                    setMenuOpen(false);
                    setSearchOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* NEW: search icon (desktop) – toggles dropdown */}
            <li>
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="p-1 rounded-full hover:bg-zinc-800 transition-colors"
                aria-label="Open search"
              >
                <Image
                  src={assets.search_icon}
                  alt="Search"
                  width={26}
                  height={26}
                  className="rounded-full"
                />
              </button>
            </li>

            {/* Auth area (desktop) */}
            {!user ? (
              <li>
                <Link
                  href="/sign-in"
                  className="text-sm px-4 py-1.5 rounded-full border border-red-500 hover:bg-red-600 hover:border-red-600 transition-colors"
                >
                  Sign In
                </Link>
              </li>
            ) : (
              <li className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-red-700 flex items-center justify-center text-xs font-semibold">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.username}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <span>
                        {user.username?.charAt(0).toUpperCase() ?? "U"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">{user.username}</span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg py-2 text-sm">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-zinc-800"
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/dashboard");
                      }}
                    >
                      Dashboard
                    </button>

                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-zinc-800"
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/favorites");
                      }}
                    >
                      Favorites
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-zinc-800"
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/settings");
                      }}
                    >
                      Settings
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 text-red-300 hover:bg-zinc-800"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>

          {/* Mobile menu button (stays on the right) */}
          <button
            className="md:hidden absolute right-4"
            onClick={() => {
              setSidebarOpen(true);
              setMenuOpen(false);
              setMobileProfileOpen(false);
              setSearchOpen(false);
            }}
            aria-label="Open menu"
          >
            <img src={assets.menu_dark} alt="Open menu" className="w-7 h-7" />
          </button>
        </div>

        {/* NEW: dropdown search bar (desktop + mobile, under nav) */}
        {searchOpen && (
          <div className="w-full border-t border-zinc-800 bg-black/95 px-4 sm:px-8 lg:px-10 py-3">
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-xl mx-auto relative"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search shows & characters..."
                className="
                  w-full rounded-full bg-zinc-900/80 border border-zinc-700
                  px-4 py-2 pr-10 text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-700
                  placeholder:text-zinc-500
                "
              />

              {/* clear */}
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-8 flex items-center text-zinc-500 text-xs"
                >
                  ✕
                </button>
              )}

              {/* submit icon */}
              <button
                type="submit"
                className="absolute inset-y-0 right-2 flex items-center text-zinc-400 text-sm"
              >
                🔍
              </button>
            </form>
          </div>
        )}
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
          onClick={() => {
            setSidebarOpen(false);
            setMobileProfileOpen(false);
          }}
        />

        {/* Slide-out panel */}
        <div
          className={`
            absolute top-0 right-0 h-full w-60
            bg-black text-white
            p-6 flex flex-col
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Close button */}
          <button
            className="self-end mb-4"
            onClick={() => {
              setSidebarOpen(false);
              setMobileProfileOpen(false);
            }}
            aria-label="Close menu"
          >
            <span className="text-xl">✕</span>
          </button>

          {/* MAIN LINKS */}
          <div className="flex-1 flex flex-col gap-4 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setSidebarOpen(false);
                  setMobileProfileOpen(false);
                  setSearchOpen(false);
                }}
                className="block py-1"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile search entry inside the menu */}
            <button
              type="button"
              onClick={() => {
                setSearchOpen(true);
                setSidebarOpen(false); // close drawer, show dropdown search under nav
              }}
              className="flex items-center gap-2 py-1 text-sm text-zinc-300"
            >
              <Image
                src={assets.search_icon}
                alt="Search"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span>Search</span>
            </button>
          </div>

          {/* BOTTOM PROFILE SECTION */}
          <div className="border-t border-zinc-800 pt-4">
            {!user ? (
              <Link
                href="/sign-in"
                onClick={() => {
                  setSidebarOpen(false);
                  setMobileProfileOpen(false);
                  setSearchOpen(false);
                }}
                className="inline-block w-full text-sm px-4 py-2 rounded-full border border-red-500 hover:bg-red-600 transition-colors text-center"
              >
                Sign In
              </Link>
            ) : (
              <>
                {/* Profile row (tap to toggle) */}
                <button
                  type="button"
                  onClick={() => setMobileProfileOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-red-700 flex items-center justify-center text-xs font-semibold">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.username}
                          width={36}
                          height={36}
                        />
                      ) : (
                        <span>
                          {user.username?.charAt(0).toUpperCase() ?? "U"}
                        </span>
                      )}
                    </div>
                    <span className="text-sm">{user.username}</span>
                  </div>
                  <span className="text-lg">
                    {mobileProfileOpen ? "▴" : "▾"}
                  </span>
                </button>

                {mobileProfileOpen && (
                  <div className="mt-3 flex flex-col gap-2 text-sm">
                    <button
                      type="button"
                      className="text-left px-0 py-1 hover:text-red-300"
                      onClick={() => {
                        setSidebarOpen(false);
                        setMobileProfileOpen(false);
                        setSearchOpen(false);
                        router.push("/dashboard");
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      className="text-left px-0 py-1 hover:text-red-300"
                      onClick={() => {
                        setSidebarOpen(false);
                        setMobileProfileOpen(false);
                        setSearchOpen(false);
                        router.push("/favorites");
                      }}
                    >
                      Favorites
                    </button>
                    <button
                      type="button"
                      className="text-left px-0 py-1 hover:text-red-300"
                      onClick={() => {
                        setSidebarOpen(false);
                        setMobileProfileOpen(false);
                        setSearchOpen(false);
                        router.push("/settings");
                      }}
                    >
                      Settings
                    </button>

                    <button
                      type="button"
                      className="text-left px-0 py-1 text-red-300 hover:text-red-400"
                      onClick={async () => {
                        await handleLogout();
                        setSidebarOpen(false);
                        setMobileProfileOpen(false);
                        setSearchOpen(false);
                      }}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

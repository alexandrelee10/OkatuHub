"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import assets from "../assets/assets";

interface SafeUser {
  id: string;
  username: string;
  email: string;
  image?: string | null;
  isAdmin?: boolean;
}

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<SafeUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  // search dropdown state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { label: "Anime", href: "/anime" },
    { label: "Characters", href: "#characters" },
  ];

  const closeAll = () => {
    setSidebarOpen(false);
    setMenuOpen(false);
    setMobileProfileOpen(false);
    setSearchOpen(false);
  };

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) return setUser(null);
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Close dropdowns on outside click / Esc
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuOpen && menuRef.current && !menuRef.current.contains(t)) setMenuOpen(false);
      if (searchOpen && searchRef.current && !searchRef.current.contains(t)) setSearchOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setSidebarOpen(false);
        setMobileProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, searchOpen]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      setUser(null);
      closeAll();
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (!q) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* TOP NAV */}
      <nav className="fixed top-0 w-full z-999">
        {/* subtle blur + border for modern look */}
        <div className="bg-black/70 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-6xl mx-auto h-16 px-4 sm:px-8 lg:px-10 flex items-center gap-4">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeAll}
              className="flex items-center gap-3 shrink-0"
              aria-label="Okatsu home"
            >
              <Image
                src={assets.logo}
                alt="Okatsu logo"
                width={140}
                height={44}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => {
                        setMenuOpen(false);
                        setSearchOpen(false);
                      }}
                      className={[
                        "px-3 py-2 rounded-full text-sm transition",
                        active
                          ? "bg-white/10 text-white"
                          : "text-zinc-300 hover:text-white hover:bg-white/5",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right side */}
            <div className="ml-auto hidden md:flex items-center gap-2">

              {/* Auth area for desktop */}
              {!user ? (
                <Link
                  href="/sign-in"
                  className="text-sm px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 transition shadow-sm"
                >
                  Sign In
                </Link>
              ) : (
                <div ref={menuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen((prev) => !prev);
                      setSearchOpen(false);
                    }}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-red-600/80 flex items-center justify-center text-xs font-semibold ring-1 ring-white/10">
                      {user.image ? (
                        <Image src={user.image} alt={user.username} width={32} height={32} />
                      ) : (
                        <span>{user.username?.charAt(0).toUpperCase() ?? "U"}</span>
                      )}
                    </div>
                    <span className="text-sm text-zinc-100 max-w-[120px] truncate">{user.username}</span>
                    <span className="text-zinc-300 text-xs">▾</span>
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-xs text-zinc-400">Signed in as</p>
                        <p className="text-sm text-white truncate">{user.email}</p>
                      </div>

                      <div className="py-2 text-sm">
                        <button
                          type="button"
                          className="w-full text-left px-4 py-2 hover:bg-white/5"
                          onClick={() => {
                            setMenuOpen(false);
                            router.push("/dashboard");
                          }}
                        >
                          Dashboard
                        </button>
                        <button
                          type="button"
                          className="w-full text-left px-4 py-2 hover:bg-white/5"
                          onClick={() => {
                            setMenuOpen(false);
                            router.push("/favorites");
                          }}
                        >
                          Favorites
                        </button>
                        <button
                          type="button"
                          className="w-full text-left px-4 py-2 hover:bg-white/5"
                          onClick={() => {
                            setMenuOpen(false);
                            router.push("/settings");
                          }}
                        >
                          Settings
                        </button>

                        {user?.isAdmin && (
                          <button
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-white/5"
                            onClick={() => {
                              setMenuOpen(false);
                              router.push("/admin");
                            }}
                          >
                            Admin Panel
                          </button>
                        )}

                        <div className="h-px bg-white/10 my-2" />

                        <button
                          type="button"
                          className="w-full text-left px-4 py-2 text-red-300 hover:bg-white/5"
                          onClick={handleLogout}
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden ml-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
              onClick={() => {
                setSidebarOpen(true);
                setMenuOpen(false);
                setMobileProfileOpen(false);
                setSearchOpen(false);
              }}
              aria-label="Open menu"
            >
              <Image src={assets.menu_dark} alt="Open menu" width={22} height={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY + SLIDE MENU */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          ${sidebarOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-black/70
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
            absolute top-0 right-0 h-full w-[78%] max-w-xs
            bg-zinc-950/95 backdrop-blur-xl
            border-l border-white/10
            p-5 flex flex-col
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Top row */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-300">Menu</span>
            <button
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
              onClick={() => {
                setSidebarOpen(false);
                setMobileProfileOpen(false);
              }}
              aria-label="Close menu"
            >
              <span className="text-xl text-white">✕</span>
            </button>
          </div>

          {/* Search */}
          <form
            onSubmit={(e) => {
              handleSearchSubmit(e);
              setSidebarOpen(false);
            }}
            className="mt-5 flex gap-2"
          >
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-400 outline-none focus:border-red-500/60"
            />
            <button
              type="submit"
              className="rounded-xl px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-500 transition"
            >
              Go
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 flex-1 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setSidebarOpen(false);
                  setMobileProfileOpen(false);
                  setSearchOpen(false);
                }}
                className="px-3 py-2 rounded-xl text-zinc-200 hover:bg-white/5 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom profile */}
          <div className="border-t border-white/10 pt-4">
            {!user ? (
              <Link
                href="/sign-in"
                onClick={closeAll}
                className="inline-flex w-full justify-center text-sm px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 transition"
              >
                Sign In
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setMobileProfileOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-red-600/80 flex items-center justify-center text-xs font-semibold ring-1 ring-white/10">
                      {user.image ? (
                        <Image src={user.image} alt={user.username} width={40} height={40} />
                      ) : (
                        <span>{user.username?.charAt(0).toUpperCase() ?? "U"}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate">{user.username}</p>
                      <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-lg text-zinc-300">{mobileProfileOpen ? "▴" : "▾"}</span>
                </button>

                {mobileProfileOpen && (
                  <div className="mt-2 flex flex-col gap-1 text-sm">
                    <button
                      type="button"
                      className="text-left px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-200"
                      onClick={() => {
                        closeAll();
                        router.push("/dashboard");
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      className="text-left px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-200"
                      onClick={() => {
                        closeAll();
                        router.push("/favorites");
                      }}
                    >
                      Favorites
                    </button>
                    <button
                      type="button"
                      className="text-left px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-200"
                      onClick={() => {
                        closeAll();
                        router.push("/settings");
                      }}
                    >
                      Settings
                    </button>

                    {user?.isAdmin && (
                      <button
                        type="button"
                        className="text-left px-3 py-2 rounded-xl hover:bg-white/5 text-zinc-200"
                        onClick={() => {
                          closeAll();
                          router.push("/admin");
                        }}
                      >
                        Admin Panel
                      </button>
                    )}

                    <button
                      type="button"
                      className="text-left px-3 py-2 rounded-xl hover:bg-white/5 text-red-300"
                      onClick={handleLogout}
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

      {/* Spacer so content doesn't hide under fixed nav */}
      <div className="h-16" />
    </>
  );
};

export default NavBar;

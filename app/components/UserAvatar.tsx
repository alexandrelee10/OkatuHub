"use client";

import { usePathname } from "next/navigation";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: number;
}

export default function UserAvatar({ src, name, size = 40 }: UserAvatarProps) {
  const pathname = usePathname();

  const isRedTheme =
  pathname === "/" ||
  pathname.startsWith("/sign") ||
  pathname.startsWith("/auth");


  const bgColor = isRedTheme ? "bg-red-600" : "bg-blue-600";

  const letter =
    typeof name === "string" && name.trim().length > 0
      ? name.trim().charAt(0).toUpperCase()
      : "?";

  // If user uploaded a profile photo
  if (src && src.length > 0) {
    return (
      <img
        src={src}
        alt={name || "User"}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }

  // Fallback: first initial inside colored circle
  return (
    <div
      style={{ width: size, height: size }}
      className={`${bgColor} rounded-full flex items-center justify-center text-white font-semibold`}
    >
      {letter}
    </div>
  );
}

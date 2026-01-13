import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/app/lib/auth";

export async function POST() {
  const res = NextResponse.json(
    { message: "Logged out" },
    { status: 200 }
  );

  res.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });

  return res;
}

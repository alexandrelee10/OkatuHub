import { NextResponse } from "next/server";
import { verifyUserCredentials } from "@/app/lib/services/authService";
import { SESSION_COOKIE_NAME } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await verifyUserCredentials(email, password);
    // verifyUserCredentials should return a "safe" user (no password)

    const res = NextResponse.json(
      {
        message: "Sign in successful",
        user,
      },
      { status: 200 }
    );

    // Set HttpOnly session cookie with user.id
    res.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: user.id, // your User id is a string (cuid())
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err: any) {
    console.error("Sign in error:", err);

    return NextResponse.json(
      {
        error:
          err.message === "Invalid email or password"
            ? err.message
            : "Unable to sign in",
      },
      { status: 401 }
    );
  }
}

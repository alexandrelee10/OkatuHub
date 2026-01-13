import { NextResponse } from "next/server";
import { verifyUserCredentials } from "@/app/lib/services/authService";

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

    // TODO later: set a session cookie here

    return NextResponse.json(
      {
        message: "Sign in successful",
        user,
      },
      { status: 200 }
    );
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

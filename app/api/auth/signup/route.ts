import { NextResponse } from "next/server";
import { createUser } from "@/app/lib/services/userService";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await createUser({
      email: body.email,
      username: body.username,
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password,
      confirmPassword: body.confirmPassword,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 400 }
    );
  }
}

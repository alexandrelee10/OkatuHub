// app/api/user/settings/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/auth";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
  try {
    const authUser = await getCurrentUser();

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      firstName,
      lastName,
      username,
      email,
      currentPassword,
      newPassword,
      adminCode,
    } = body as {
      firstName?: string;
      lastName?: string;
      username?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
      adminCode?: string;
    };

    // Load full user from DB to verify password if needed
    const dbUser = await prisma.user.findUnique({
      where: { id: authUser.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData: any = {};

    if (typeof firstName === "string") updateData.firstName = firstName.trim();
    if (typeof lastName === "string") updateData.lastName = lastName.trim();
    if (typeof username === "string") updateData.username = username.trim();
    if (typeof email === "string") updateData.email = email.trim();

    // Password change: require currentPassword + newPassword
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Current password is required to set a new password." },
          { status: 400 }
        );
      }

      const ok = await bcrypt.compare(currentPassword, dbUser.password);
      if (!ok) {
        return NextResponse.json(
          { error: "Current password is incorrect." },
          { status: 400 }
        );
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      updateData.password = hashed;
    }

    // Admin promotion via secret code
    if (adminCode) {
      if (adminCode === process.env.ADMIN_SECRET) {
        updateData.isAdmin = true;
      } else {
        return NextResponse.json(
          { error: "Invalid admin code." },
          { status: 400 }
        );
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No changes were provided." },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { id: authUser.id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        isAdmin: true,
        image: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user: updated }, { status: 200 });
  } catch (err: any) {
    console.error("Settings update error:", err);

    // handle unique constraint errors (duplicate email / username)
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Email or username already in use." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// app/api/admin/characters/route.ts

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin) {
    return NextResponse.json(
      { error: "Not authorized" },
      { status: 403 }
    );
  }

  const body = await req.json();
  const {
    name,
    role,
    image,
    desc,
    stats,
    abilities,
    strength,
    weakness,
  } = body;

  if (!name || !role) {
    return NextResponse.json(
      { error: "Name and role are required" },
      { status: 400 }
    );
  }

  try {
    const character = await prisma.character.create({
      data: {
        name,
        role,
        image: image || "",
        desc: desc || "",
        stats: stats ? Number(stats) : 0,
        abilities: abilities || "",
        strength: strength || "",
        weakness: weakness || "",
      },
    });

    return NextResponse.json({ character }, { status: 201 });
  } catch (err) {
    console.error("Error creating character:", err);
    return NextResponse.json(
      { error: "Failed to create character" },
      { status: 500 }
    );
  }
}

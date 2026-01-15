import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getCurrentUser } from "@/app/lib/auth"; // you already have this

export async function POST(req: NextRequest) {
  // 1. Check user and admin flag
  const user = await getCurrentUser();
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  // 2. Parse multipart/form-data
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // 3. Convert File -> Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 4. Build upload path in /public/uploads
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  // simple unique file name: timestamp + original name (sanitized)
  const safeName = file.name.replace(/\s+/g, "_");
  const fileName = `${Date.now()}-${safeName}`;
  const filePath = path.join(uploadsDir, fileName);

  // 5. Write file to disk
  await fs.writeFile(filePath, buffer);

  // 6. Public URL that next/image or img can use
  const url = `/uploads/${fileName}`;

  return NextResponse.json({ url });
}

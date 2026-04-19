import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 });

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type))
    return NextResponse.json({ error: "Formato no permitido" }, { status: 400 });

  if (file.size > 5 * 1024 * 1024)
    return NextResponse.json({ error: "El archivo supera 5MB" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await uploadImage(buffer);
  return NextResponse.json({ url });
}

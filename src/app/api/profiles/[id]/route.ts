import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const petSchema = z.object({
  petName: z.string().min(1),
  petType: z.enum(["DOG", "CAT", "OTHER"]),
  ownerName: z.string().min(1),
  ownerContact: z.string().min(1),
  address: z.string().optional(),
  medicalInfo: z.string().optional(),
  photoUrl: z.string().url().optional().or(z.literal("")),
});

const companySchema = z.object({
  companyName: z.string().min(1),
  description: z.string().optional(),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  wpsUrl: z.string().url().optional().or(z.literal("")),
  salesContact: z.string().min(1),
  logoUrl: z.string().url().optional().or(z.literal("")),
});

const entrepreneurSchema = z.object({
  name: z.string().min(1),
  whatsappUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  tiktokUrl: z.string().url().optional().or(z.literal("")),
  facebookUrl: z.string().url().optional().or(z.literal("")),
  salesContact: z.string().min(1),
  address: z.string().optional(),
  photoUrl: z.string().url().optional().or(z.literal("")),
});

async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return session;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const userId = (session.user as any).id;
  const isAdmin = (session.user as any).role === "ADMIN";

  // Toggle activo/inactivo — solo admin
  if ("active" in body && Object.keys(body).length === 1) {
    if (!isAdmin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    const updated = await prisma.profile.update({
      where: { id },
      data: { active: body.active },
    });
    return NextResponse.json(updated);
  }

  // Edición completa — admin o dueño del perfil
  const profile = await prisma.profile.findUnique({ where: { id } });
  if (!profile) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  if (!isAdmin && profile.userId !== userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  if (profile.type === "PET") {
    const parsed = petSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    const d = parsed.data;
    await prisma.petProfile.update({
      where: { profileId: id },
      data: {
        petName: d.petName, petType: d.petType, ownerName: d.ownerName,
        ownerContact: d.ownerContact, address: d.address || null,
        medicalInfo: d.medicalInfo || null, photoUrl: d.photoUrl || null,
      },
    });
  }

  if (profile.type === "COMPANY") {
    const parsed = companySchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    const d = parsed.data;
    await prisma.companyProfile.update({
      where: { profileId: id },
      data: {
        companyName: d.companyName, description: d.description || null,
        instagramUrl: d.instagramUrl || null, websiteUrl: d.websiteUrl || null,
        wpsUrl: d.wpsUrl || null, salesContact: d.salesContact, logoUrl: d.logoUrl || null,
      },
    });
  }

  if (profile.type === "ENTREPRENEUR") {
    const parsed = entrepreneurSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    const d = parsed.data;
    await prisma.entrepreneurProfile.update({
      where: { profileId: id },
      data: {
        name: d.name, whatsappUrl: d.whatsappUrl || null, instagramUrl: d.instagramUrl || null,
        tiktokUrl: d.tiktokUrl || null, facebookUrl: d.facebookUrl || null,
        salesContact: d.salesContact, address: d.address || null, photoUrl: d.photoUrl || null,
      },
    });
  }

  return NextResponse.json({ ok: true });
}

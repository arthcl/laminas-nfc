import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { z } from "zod";

const petSchema = z.object({
  type: z.literal("PET"),
  userId: z.string(),
  petName: z.string().min(1),
  petType: z.enum(["DOG", "CAT", "OTHER"]),
  ownerName: z.string().min(1),
  ownerContact: z.string().min(1),
  address: z.string().optional(),
  medicalInfo: z.string().optional(),
  photoUrl: z.string().url().optional().or(z.literal("")),
});

const companySchema = z.object({
  type: z.literal("COMPANY"),
  userId: z.string(),
  companyName: z.string().min(1),
  description: z.string().optional(),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  wpsUrl: z.string().url().optional().or(z.literal("")),
  salesContact: z.string().min(1),
  logoUrl: z.string().url().optional().or(z.literal("")),
});

const entrepreneurSchema = z.object({
  type: z.literal("ENTREPRENEUR"),
  userId: z.string(),
  name: z.string().min(1),
  whatsappUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  tiktokUrl: z.string().url().optional().or(z.literal("")),
  facebookUrl: z.string().url().optional().or(z.literal("")),
  salesContact: z.string().min(1),
  address: z.string().optional(),
  photoUrl: z.string().url().optional().or(z.literal("")),
});

const bodySchema = z.discriminatedUnion("type", [petSchema, companySchema, entrepreneurSchema]);

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const nameForSlug =
    data.type === "PET" ? data.petName :
    data.type === "COMPANY" ? data.companyName :
    data.name;

  const slug = generateSlug(nameForSlug);

  const profile = await prisma.profile.create({
    data: {
      slug,
      type: data.type,
      userId: data.userId,
      ...(data.type === "PET" && {
        pet: {
          create: {
            petName: data.petName,
            petType: data.petType,
            ownerName: data.ownerName,
            ownerContact: data.ownerContact,
            address: data.address || null,
            medicalInfo: data.medicalInfo || null,
            photoUrl: data.photoUrl || null,
          },
        },
      }),
      ...(data.type === "COMPANY" && {
        company: {
          create: {
            companyName: data.companyName,
            description: data.description || null,
            instagramUrl: data.instagramUrl || null,
            websiteUrl: data.websiteUrl || null,
            wpsUrl: data.wpsUrl || null,
            salesContact: data.salesContact,
            logoUrl: data.logoUrl || null,
          },
        },
      }),
      ...(data.type === "ENTREPRENEUR" && {
        entrepreneur: {
          create: {
            name: data.name,
            whatsappUrl: data.whatsappUrl || null,
            instagramUrl: data.instagramUrl || null,
            tiktokUrl: data.tiktokUrl || null,
            facebookUrl: data.facebookUrl || null,
            salesContact: data.salesContact,
            address: data.address || null,
            photoUrl: data.photoUrl || null,
          },
        },
      }),
    },
  });

  return NextResponse.json(profile, { status: 201 });
}

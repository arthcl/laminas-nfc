import { Role, ProfileType, PetType } from "@prisma/client";

export type { Role, ProfileType, PetType };

export interface ProfileWithDetails {
  id: string;
  slug: string;
  type: ProfileType;
  active: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  pet?: {
    petName: string;
    petType: PetType;
    ownerName: string;
    ownerContact: string;
    address?: string | null;
    medicalInfo?: string | null;
    photoUrl?: string | null;
  } | null;
  company?: {
    companyName: string;
    description?: string | null;
    instagramUrl?: string | null;
    websiteUrl?: string | null;
    wpsUrl?: string | null;
    salesContact: string;
    logoUrl?: string | null;
  } | null;
  entrepreneur?: {
    name: string;
    whatsappUrl?: string | null;
    instagramUrl?: string | null;
    tiktokUrl?: string | null;
    facebookUrl?: string | null;
    salesContact: string;
    address?: string | null;
    photoUrl?: string | null;
  } | null;
}

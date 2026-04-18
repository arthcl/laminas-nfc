import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PetCard from "@/components/profiles/PetCard";
import CompanyCard from "@/components/profiles/CompanyCard";
import EntrepreneurCard from "@/components/profiles/EntrepreneurCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;

  const profile = await prisma.profile.findUnique({
    where: { slug, active: true },
    include: { pet: true, company: true, entrepreneur: true },
  });

  if (!profile) notFound();

  return (
    <>
      {profile.type === "PET" && profile.pet && <PetCard data={profile.pet} />}
      {profile.type === "COMPANY" && profile.company && <CompanyCard data={profile.company} />}
      {profile.type === "ENTREPRENEUR" && profile.entrepreneur && <EntrepreneurCard data={profile.entrepreneur} />}
    </>
  );
}

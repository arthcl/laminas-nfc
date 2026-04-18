import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@laminasnfc.cl";
  const password = "Admin1234!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin ya existe:", email);
    return;
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name: "Admin",
      email,
      password: hashed,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin creado:");
  console.log("   Email:", email);
  console.log("   Password:", password);
  console.log("   ⚠️  Cambia la contraseña desde el panel después del primer login.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

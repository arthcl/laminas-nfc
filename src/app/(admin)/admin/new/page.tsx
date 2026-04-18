import Link from "next/link";

const types = [
  {
    href: "/admin/profiles/new/pet",
    emoji: "🐾",
    title: "Mascota",
    description: "Ficha con datos del dueño, info médica y contacto de emergencia.",
  },
  {
    href: "/admin/profiles/new/company",
    emoji: "🏢",
    title: "Empresa",
    description: "Redes sociales, página web, descripción y contacto de ventas.",
  },
  {
    href: "/admin/profiles/new/entrepreneur",
    emoji: "🚀",
    title: "Emprendedor",
    description: "WhatsApp, redes sociales, contacto y dirección física.",
  },
];

export default function NewProfilePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">Nuevo perfil</h2>
      <p className="text-gray-500 text-sm">Selecciona el tipo de perfil a crear.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {types.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-blue-200 hover:shadow-md transition space-y-2"
          >
            <span className="text-4xl">{t.emoji}</span>
            <h3 className="font-semibold text-gray-900">{t.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{t.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

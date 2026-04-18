import Link from "next/link";

const types = [
  {
    href: "/admin/profiles/new/pet",
    emoji: "🐾",
    title: "Mascota",
    description: "Perros, gatos y más. Incluye ficha médica, contacto del dueño y dirección.",
    color: "hover:border-amber-300 hover:bg-amber-50",
    iconBg: "bg-amber-100",
  },
  {
    href: "/admin/profiles/new/company",
    emoji: "🏢",
    title: "Empresa",
    description: "Redes sociales, página web, descripción del negocio y contacto de ventas.",
    color: "hover:border-indigo-300 hover:bg-indigo-50",
    iconBg: "bg-indigo-100",
  },
  {
    href: "/admin/profiles/new/entrepreneur",
    emoji: "🚀",
    title: "Emprendedor",
    description: "WhatsApp, Instagram, TikTok, Facebook, contacto y dirección física.",
    color: "hover:border-purple-300 hover:bg-purple-50",
    iconBg: "bg-purple-100",
  },
];

export default function NewProfilePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nuevo perfil</h1>
        <p className="text-sm text-gray-500 mt-0.5">Selecciona el tipo de perfil que quieres crear.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {types.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`card p-6 border border-gray-100 transition cursor-pointer group ${t.color}`}
          >
            <div className={`w-12 h-12 rounded-2xl ${t.iconBg} flex items-center justify-center text-2xl mb-4`}>
              {t.emoji}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{t.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{t.description}</p>
            <span className="block mt-4 text-xs font-medium text-indigo-600 group-hover:underline">
              Crear perfil →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, RefreshCw, Copy, Check } from "lucide-react";

function generateSecurePassword(): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const digits = "23456789";
  const symbols = "!@#$%&*";
  const all = upper + lower + digits + symbols;

  const pick = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

  const required = [pick(upper), pick(lower), pick(digits), pick(symbols)];
  const rest = Array.from({ length: 8 }, () => pick(all));
  return [...required, ...rest]
    .sort(() => Math.random() - 0.5)
    .join("");
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  let score = 0;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: "Débil", color: "bg-red-400" },
    { label: "Regular", color: "bg-orange-400" },
    { label: "Buena", color: "bg-yellow-400" },
    { label: "Fuerte", color: "bg-emerald-500" },
    { label: "Muy fuerte", color: "bg-emerald-600" },
  ];
  const level = levels[Math.min(score, 4)];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {levels.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${i <= score - 1 ? level.color : "bg-gray-200"}`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${score <= 1 ? "text-red-500" : score <= 2 ? "text-orange-500" : "text-emerald-600"}`}>
        {level.label}
      </p>
    </div>
  );
}

export default function NewUserPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleGenerate() {
    setPassword(generateSecurePassword());
    setShowPassword(true);
  }

  async function handleCopy() {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password,
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
    };

    if (!data.password || data.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(typeof json.error === "string" ? json.error : "Error al crear usuario");
      setLoading(false);
      return;
    }

    router.push("/admin/users");
    router.refresh();
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3">
        <Link href="/admin/users" className="text-gray-400 hover:text-gray-700 transition text-sm">← Usuarios</Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nuevo usuario</h1>
        <p className="text-sm text-gray-500 mt-0.5">El usuario recibirá sus credenciales por email al ser creado.</p>
      </div>

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Nombre completo</label>
            <input name="name" type="text" required placeholder="Juan Pérez" className="input" />
          </div>

          <div>
            <label className="label">Email</label>
            <input name="email" type="email" required placeholder="juan@ejemplo.cl" className="input" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="label mb-0">Contraseña</label>
              <button
                type="button"
                onClick={handleGenerate}
                className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition"
              >
                <RefreshCw size={13} />
                Generar segura
              </button>
            </div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
                className="input pr-20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-gray-700 transition"
                  title="Copiar contraseña"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-700 transition"
                  title={showPassword ? "Ocultar" : "Mostrar"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <PasswordStrength password={password} />
          </div>

          <div>
            <label className="label">Rol</label>
            <select name="role" className="input">
              <option value="CLIENT">Cliente — acceso solo a su perfil</option>
              <option value="ADMIN">Admin — acceso completo al panel</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Link href="/admin/users" className="btn-secondary flex-1 text-center">Cancelar</Link>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? "Creando..." : "Crear usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

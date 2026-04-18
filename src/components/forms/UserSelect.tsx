"use client";

interface User {
  id: string;
  name: string | null;
  email: string;
}

export default function UserSelect({ users }: { users: User[] }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Asignar a usuario
      </label>
      <select
        name="userId"
        required
        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccionar usuario...</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name} — {u.email}
          </option>
        ))}
      </select>
    </div>
  );
}

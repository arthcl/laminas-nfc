"use client";

interface User {
  id: string;
  name: string | null;
  email: string;
}

export default function UserSelect({ users }: { users: User[] }) {
  return (
    <div>
      <label className="label">Asignar a usuario</label>
      <select name="userId" required className="input">
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

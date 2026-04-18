export default function ProfilePublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-gray-50">
      {children}
    </div>
  );
}

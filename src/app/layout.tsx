import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Láminas NFC",
  description: "Perfiles digitales para mascotas, empresas y emprendedores.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

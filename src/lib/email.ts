import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Láminas NFC <laminas@arturdev.cl>";

export async function sendWelcomeEmail({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const loginUrl = `${process.env.NEXTAUTH_URL ?? "https://laminas.arturdev.cl"}/login`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Bienvenido a Láminas NFC — tus accesos",
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:36px 40px;text-align:center;">
            <p style="margin:0;font-size:28px;">📇</p>
            <h1 style="margin:12px 0 0;color:#ffffff;font-size:22px;font-weight:700;">Láminas NFC</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Tu perfil digital está listo</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 8px;font-size:16px;color:#111827;">Hola <strong>${name}</strong>,</p>
            <p style="margin:0 0 28px;font-size:14px;color:#6b7280;line-height:1.6;">
              Se ha creado tu cuenta en la plataforma Láminas NFC. Aquí están tus credenciales de acceso:
            </p>

            <!-- Credentials box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;margin-bottom:28px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Tus accesos</p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:6px 0;font-size:13px;color:#6b7280;width:90px;">Email</td>
                      <td style="padding:6px 0;font-size:13px;color:#111827;font-weight:600;">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-size:13px;color:#6b7280;">Contraseña</td>
                      <td style="padding:6px 0;font-size:13px;color:#111827;font-weight:600;font-family:monospace;">${password}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.6;">
              Te recomendamos cambiar tu contraseña después de tu primer ingreso.
            </p>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:10px;">
                    Ingresar ahora →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #f3f4f6;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              Si no esperabas este mensaje, puedes ignorarlo.<br/>
              © ${new Date().getFullYear()} Láminas NFC
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}

import { Resend } from "resend";

const FROM = "Laminas NFC <laminas@arturdev.cl>";

export async function sendWelcomeEmail({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const baseUrl = process.env.NEXTAUTH_URL ?? "https://laminas.arturdev.cl";
  const loginUrl = `${baseUrl}/login`;
  const settingsUrl = `${baseUrl}/portal/settings`;
  const firstName = name.split(" ")[0];

  await resend.emails.send({
    from: FROM,
    to: email,
    replyTo: "laminas@arturdev.cl",
    subject: `Tu cuenta en Laminas NFC está lista`,
    text: `Hola ${firstName},\n\nSe ha creado tu cuenta en Laminas NFC.\n\nEmail: ${email}\nContrasena temporal: ${password}\n\nIngresa en: ${loginUrl}\n\nPor seguridad, cambia tu contrasena en: ${settingsUrl}\n\n© ${new Date().getFullYear()} Laminas NFC`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tu cuenta en Laminas NFC</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:36px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.3px;">Laminas NFC</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">Tu perfil digital NFC</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px 28px;">
            <p style="margin:0 0 6px;font-size:17px;font-weight:600;color:#111827;">Hola, ${firstName}</p>
            <p style="margin:0 0 28px;font-size:14px;color:#6b7280;line-height:1.6;">
              Se ha creado tu cuenta en la plataforma. A continuación están tus datos de ingreso:
            </p>

            <!-- Credentials box -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:28px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Datos de ingreso</p>
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="padding:5px 0;font-size:13px;color:#94a3b8;width:100px;vertical-align:top;">Email</td>
                      <td style="padding:5px 0;font-size:13px;color:#1e293b;font-weight:600;">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0;font-size:13px;color:#94a3b8;vertical-align:top;">Contrasena</td>
                      <td style="padding:5px 0;font-size:13px;color:#1e293b;font-weight:600;font-family:'Courier New',Courier,monospace;letter-spacing:0.05em;">${password}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Security note -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#fef3c7;border-radius:10px;margin-bottom:28px;">
              <tr>
                <td style="padding:14px 18px;">
                  <p style="margin:0;font-size:13px;color:#92400e;line-height:1.5;">
                    <strong>Recomendacion:</strong> Cambia tu contrasena luego de ingresar por primera vez desde
                    <a href="${settingsUrl}" style="color:#92400e;font-weight:600;">Mi cuenta &rarr; Cambiar contrasena</a>.
                  </p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center">
                  <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:13px 32px;border-radius:10px;">
                    Ingresar a mi cuenta
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:18px 40px;border-top:1px solid #f1f5f9;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
              Si no esperabas este mensaje, puedes ignorarlo.<br/>
              &copy; ${new Date().getFullYear()} Laminas NFC
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

const { Resend } = require('resend');

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Falta configurar RESEND_API_KEY en las variables de entorno de Vercel');
    return res.status(500).json({ error: 'Servicio de email no configurado' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM || 'Radiadores San Pedro <onboarding@resend.dev>';
  const safeName = (name || '').toString().trim().slice(0, 100) || 'Cliente';

  try {
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: 'Confirmación de tu pedido — Radiadores San Pedro',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#F2F0EB;padding:0">
          <div style="background:#0E2A4E;padding:28px 32px">
            <h1 style="color:#fff;font-size:22px;margin:0;letter-spacing:.02em">Radiadores San Pedro</h1>
            <p style="color:#8FA3BC;font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin:6px 0 0">Radiadores · Baterías · Repuestos</p>
          </div>
          <div style="padding:32px;background:#fff">
            <p style="font-size:16px;color:#0A2140;margin:0 0 16px">Hola ${safeName},</p>
            <p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">
              Recibimos tu solicitud de compra en nuestra web. En breve nos comunicamos por WhatsApp
              para confirmar disponibilidad, coordinar el pago y el envío o retiro por el local.
            </p>
            <p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 24px">
              Si tenés alguna urgencia, también podés escribirnos directamente:
              <a href="https://wa.me/5493329594092" style="color:#E01F26;font-weight:bold">WhatsApp (3329) 68-4352</a>.
            </p>
            <p style="font-size:13px;color:#8FA3BC;line-height:1.5;margin:0">
              Alejandro Maino 2647, San Pedro, Buenos Aires · Envíos a todo el país
            </p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Error de Resend:', error);
      return res.status(502).json({ error: 'No se pudo enviar el email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error enviando comprobante:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
};

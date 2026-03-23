import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/mailjet';

export async function POST(request: Request) {
  try {
    const { name, email, phone, plan, message } = await request.json();

    const { success, data, error } = await sendEmail({
      to: 'arielpiroy@gmail.com',
      subject: `Nuevo Lead: ${plan || 'Contacto General'} - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #6366f1;">Nuevo contacto desde nucleoai.site</h2>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>WhatsApp:</strong> ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">${phone}</a>` : 'No proporcionado'}</p>
          <p><strong>Plan de interés:</strong> <span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">${plan || 'Consulta General'}</span></p>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; font-style: italic;">
            ${message || 'Sin mensaje adicional'}
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #9ca3af;">Enviado desde el formulario de contacto de nucleoai.site</p>
        </div>
      `,
    });

    if (!success) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/mailjet';

export async function POST(request: Request) {
  try {
    const { name, email, phone } = await request.json();

    const { success, data, error } = await sendEmail({
      to: 'arielpiroy@gmail.com',
      subject: `Nueva Descarga PDF: Introducción al No-Code - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #6366f1;">Nuevo lead desde Curso Gratis</h2>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>WhatsApp:</strong> ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">${phone}</a>` : 'No proporcionado'}</p>
          <p style="margin-top: 20px;">El usuario ha solicitado la descarga de la guía PDF.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #9ca3af;">Enviado desde el formulario de curso de nucleoai.site</p>
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

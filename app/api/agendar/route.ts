import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/mailjet';

export async function POST(request: Request) {
  try {
    const { name, email, date, time } = await request.json();

    const { success, data, error } = await sendEmail({
      to: 'arielpiroy@gmail.com',
      subject: `Nueva Cita Agendada: ${date} a las ${time} - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #6366f1;">Nueva cita agendada en nucleoai.site</h2>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Fecha:</strong> <span style="color: #111827; font-weight: bold;">${date}</span></p>
          <p><strong>Hora:</strong> <span style="color: #111827; font-weight: bold;">${time}hs</span></p>
          <div style="margin-top: 30px; text-align: center;">
             <a href="mailto:${email}" style="background: #6366f1; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Responder al Cliente</a>
          </div>
          <p style="margin-top: 40px; font-size: 12px; color: #9ca3af;">Generado por el módulo de agenda de nucleoai.site</p>
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

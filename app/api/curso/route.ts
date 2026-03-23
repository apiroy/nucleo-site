import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { name, email, phone } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      console.log("Mock Curso Lead Email Sent to arielpiroy@gmail.com:", { name, email, phone });
      return NextResponse.json({ success: true, mock: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Nucleoai.site <onboarding@resend.dev>',
      to: ['arielpiroy@gmail.com'],
      subject: `Nueva Descarga PDF: Introducción al No-Code - ${name}`,
      html: `
        <h2>Nuevo lead desde Curso Gratis</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${phone || 'No proporcionado'}</p>
        <p>El usuario ha solicitado la descarga de la guía PDF.</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

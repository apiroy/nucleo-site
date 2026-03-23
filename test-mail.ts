import { sendEmail } from './lib/email/mailjet.ts';

async function test() {
  console.log('--- Iniciando prueba de Mailjet ---');
  
  const result = await sendEmail({
    to: 'arielpiroy@gmail.com',
    subject: 'Prueba de Sistema Nucleoai.site',
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #6366f1;">¡Prueba de Mailjet Exitosa!</h2>
        <p>Este es un email de prueba enviado desde <strong>nucleoai.site</strong> utilizando la infraestructura de Mailjet de Madre Nieve.</p>
        <hr />
        <p>Si recibes esto, significa que el envío de correos ya está operativo.</p>
      </div>
    `,
  });

  if (result.success) {
    console.log('✅ Prueba exitosa:', JSON.stringify(result.data, null, 2));
  } else {
    console.log('❌ Error en la prueba:', result.error);
  }
}

test();

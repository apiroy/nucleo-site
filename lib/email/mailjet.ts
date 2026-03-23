import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY || 'c2c942122c0fcdf8775c2c576ac25ef2',
  apiSecret: process.env.MAILJET_API_SECRET || '48da47cca4a03557c2f3646cee1c6948'
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  fromEmail?: string;
  fromName?: string;
}

export async function sendEmail({ 
  to, 
  subject, 
  html, 
  fromEmail = 'info@madrenieve.com.ar', 
  fromName = 'Nucleoai.site' 
}: SendEmailOptions) {
  try {
    const result = await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: fromEmail,
              Name: fromName,
            },
            To: [
              {
                Email: to,
                Name: 'Ariel Piroyansky',
              },
            ],
            Subject: subject,
            HTMLPart: html,
          },
        ],
      });

    return { success: true, data: result.body };
  } catch (error: any) {
    console.error('Mailjet Error:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}

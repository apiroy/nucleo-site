import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY || 'a82909bd5db7ca5ba3c28cc22accffa1',
  apiSecret: process.env.MAILJET_API_SECRET || '2ee1e34f8acd3df5b56939d3c7746dd7'
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

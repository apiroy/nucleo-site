import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const runtime = 'edge';

const VERIFY_TOKEN = process.env.INSTAGRAM_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.INSTAGRAM_PAGE_ACCESS_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    return new Response(challenge, { status: 200 });
  }
  
  return new Response('Forbidden', { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Instagram Webhook received:', JSON.stringify(body, null, 2));

    // Meta Webhooks pueden enviar múltiples eventos en un solo POST
    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    // Solo procesamos si hay un comentario y tiene el texto clave
    if (value && value.text && value.from) {
      const commentText = value.text.toLowerCase();
      const igUserId = value.from.id;
      const igUsername = value.from.username;
      const commentId = value.id;

      if (commentText.includes('guia')) {
        // 1. Verificar en Supabase si ya se le envió hoy para evitar spam
        const today = new Date().toISOString().split('T')[0];
        
        const { data: existingLead, error: fetchError } = await supabase
          .from('ig_leads')
          .select('*')
          .eq('ig_user_id', igUserId)
          .gte('last_contacted_at', `${today}T00:00:00Z`)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
           console.error('Error fetching lead:', fetchError);
        }

        if (!existingLead) {
          // 2. Enviar Mensaje Directo (DM)
          const dmResponse = await fetch(`https://graph.facebook.com/v17.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              recipient: { id: igUserId },
              message: { text: "¡Hola! Gracias por tu interés en descargar tu guía gratuita. Acá tenés toda la info: https://nucleoai.site/curso-gratis" }
            })
          });

          // 3. Responder al comentario públicamente
          const replyResponse = await fetch(`https://graph.facebook.com/v17.0/${commentId}/replies?access_token=${PAGE_ACCESS_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: "¡Listo! Te enviamos la info por mensaje privado. ✨"
            })
          });

          // 4. Registrar en Supabase
          if (dmResponse.ok || replyResponse.ok) {
            const { error: upsertError } = await supabase
              .from('ig_leads')
              .upsert({
                ig_user_id: igUserId,
                ig_username: igUsername,
                last_contacted_at: new Date().toISOString()
              }, { onConflict: 'ig_user_id' });

            if (upsertError) console.error('Error logging lead:', upsertError);
          }
        } else {
          console.log(`User ${igUsername} already contacted today.`);
        }
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

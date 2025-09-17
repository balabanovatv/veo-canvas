import { supabase } from '@/integrations/supabase/client';

const N8N_WEBHOOK_URL = 'https://gkexpert.app.n8n.cloud/webhook/create-prompt';

export async function sendPromptToN8N(prompt: string, dialogueUuid: string) {
  const { data: session } = await supabase.auth.getSession();
  const accessToken = session?.session?.access_token;
  
  if (!accessToken) {
    throw new Error('Пользователь не авторизован');
  }

  const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      prompt,
      dialogue_uuid: dialogueUuid,
    }),
  });

  return await response.json();
}
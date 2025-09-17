import { supabase } from '@/integrations/supabase/client';

const N8N_WEBHOOK_URL = 'https://gkexpert.app.n8n.cloud/webhook/veo/generate';
const N8N_APPROVE_URL = 'https://gkexpert.app.n8n.cloud/webhook/veo/approve';

// Создание запроса
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
      dialogue_id: dialogueUuid,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Одобрение промпта
export async function approvePrompt(jobId: string, quantity: number) {
  const { data: session } = await supabase.auth.getSession();
  const accessToken = session?.session?.access_token;
  
  if (!accessToken) {
    throw new Error('Пользователь не авторизован');
  }

  const response = await fetch(N8N_APPROVE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      job_id: jobId,
      approved: true,
      generations_count: quantity,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Получение статуса job'а
export async function getJobStatus(jobId: string) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId)
    .single();

  if (error) throw error;
  return data;
}
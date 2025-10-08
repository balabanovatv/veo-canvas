// src/lib/n8n-api.ts
import { supabase } from "@/integrations/supabase/client";

const N8N_URL = "https://gkexpert.app.n8n.cloud/webhook/veo/generate";

// --- helpers ---------------------------------------------------------------

async function authHeader() {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("Пользователь не авторизован");
  return { Authorization: `Bearer ${token}` };
}

async function postToN8n(body: Record<string, any>) {
  const headers = {
    "Content-Type": "application/json",
    ...(await authHeader()),
  };

  const res = await fetch(N8N_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  // читаем как текст на случай не-JSON ответа
  const text = await res.text();
  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    json = { ok: false, error: { message: "Invalid JSON from n8n", raw: text } };
  }

  if (!res.ok || json?.ok === false) {
    const msg = json?.error?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return json;
}

// --- public API ------------------------------------------------------------

/**
 * Создать диалог/промпт (ветка "create").
 * dialogUuid — это твой локальный uuid; он же возвращается сервером.
 * Для обратной совместимости возвращаем и job_id (равен dialogue_uuid).
 */
export async function sendPromptToN8N(prompt: string, dialogueUuid: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  const resp = await postToN8n({
    action: "create",
    prompt,
    dialogue_uuid: dialogueUuid,
    user_id: user?.id,
  });

  // Создаём новую запись о задаче
  if (user) {
    await supabase.from("jobs").insert({
      user_id: user.id,
      dialogue_uuid: dialogueUuid,
      status: "queued",
      prompt
    });
  }

  // совместимость с существующим фронтом
  if (!resp.job_id && resp.dialogue_uuid) {
    resp.job_id = resp.dialogue_uuid;
  }
  return resp;
}

/**
 * Получить статус (ветка "status").
 * Параметр называется jobId в твоём коде — используем его как dialogue_uuid.
 */
export async function getJobStatus(jobId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  return postToN8n({
    action: "status",
    dialogue_uuid: jobId,
    user_id: user?.id,
  });
}

/**
 * Одобрить промпт и запустить генерации (ветка "approve").
 * Параметр jobId — это dialogue_uuid.
 */
export async function approvePrompt(jobId: string, quantity: number) {
  const { data: { user } } = await supabase.auth.getUser();
  
  return postToN8n({
    action: "approve",
    dialogue_uuid: jobId,
    quantity,
    user_id: user?.id,
  });
}

import type { Credentials } from './types';
import { request } from './request';

export async function sendMessage(
  credentials: Credentials,
  chatId: string,
  message: string,
) {
  const result = await request<{ idMessage: string }>(credentials, 'sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  });

  if (typeof result?.idMessage !== 'string' || !result.idMessage) {
    throw new Error('Не удалось подтвердить отправку сообщения.');
  }

  return result.idMessage;
}

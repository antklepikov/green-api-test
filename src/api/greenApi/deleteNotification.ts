import type { Credentials } from './types';
import { request } from './request';

export async function deleteNotification(
  credentials: Credentials,
  receiptId: number,
  signal: AbortSignal,
) {
  const result = await request<{ result: boolean }>(
    credentials,
    'deleteNotification',
    { method: 'DELETE', signal },
    `/${receiptId}`,
  );

  if (result?.result !== true) {
    throw new Error('Не удалось подтвердить обработку уведомления.');
  }
}

import type { Credentials, IncomingNotification } from './types';
import { request } from './request';

export async function receiveNotification(credentials: Credentials, signal: AbortSignal) {
  const notification = await request<IncomingNotification | null>(
    credentials,
    'receiveNotification',
    { signal },
  );

  if (notification !== null && (
    typeof notification?.receiptId !== 'number' ||
    typeof notification.body?.typeWebhook !== 'string'
  )) {
    throw new Error('GREEN-API вернул неожиданное уведомление.');
  }

  return notification;
}

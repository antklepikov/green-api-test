import type { Credentials } from './types';
import { request } from './request';

export async function setNotificationSettings(credentials: Credentials) {
  const result = await request<{ saveSettings: boolean }>(credentials, 'setSettings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      webhookUrl: '',
      incomingWebhook: 'yes',
    }),
  });

  if (result?.saveSettings !== true) {
    throw new Error('Не удалось сохранить настройки входящих уведомлений.');
  }
}

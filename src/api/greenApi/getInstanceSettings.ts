import type { Credentials } from './types';
import { request } from './request';

type InstanceSettings = {
  webhookUrl: string;
  incomingWebhook: 'yes' | 'no';
};

export async function getInstanceSettings(credentials: Credentials) {
  const settings = await request<InstanceSettings>(credentials, 'getSettings');

  if (
    typeof settings?.webhookUrl !== 'string' ||
    (settings.incomingWebhook !== 'yes' && settings.incomingWebhook !== 'no')
  ) {
    throw new Error('GREEN-API вернул неожиданные настройки инстанса.');
  }

  return settings;
}


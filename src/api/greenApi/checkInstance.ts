import type { Credentials } from './types';
import { request } from './request';

export async function checkInstance(credentials: Credentials) {
  const data = await request<{ stateInstance: string }>(credentials, 'getStateInstance');

  if (typeof data?.stateInstance !== 'string') {
    throw new Error('GREEN-API вернул неожиданный ответ. Повторите попытку.');
  }

  if (data.stateInstance === 'notAuthorized') {
    throw new Error('Подключите WhatsApp к инстансу в личном кабинете GREEN-API через «Связанные устройства».');
  }

  if (data.stateInstance !== 'authorized') {
    throw new Error(`Инстанс не готов к работе (${data.stateInstance}). Проверьте его состояние в личном кабинете GREEN-API.`);
  }
}


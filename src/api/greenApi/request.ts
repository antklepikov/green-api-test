import type { Credentials } from './types';

const API_URL = 'https://api.green-api.com';

export async function request<T>(
  { idInstance, apiTokenInstance }: Credentials,
  method: string,
  options: RequestInit = {},
  path = '',
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(
      `${API_URL}/waInstance${encodeURIComponent(idInstance)}/${method}/${encodeURIComponent(apiTokenInstance)}${path}`,
      {
        ...options,
        signal: options.signal
          ? AbortSignal.any([options.signal, AbortSignal.timeout(15000)])
          : AbortSignal.timeout(15000),
      },
    );
  } catch {
    throw new Error('Не удалось связаться с GREEN-API. Проверьте соединение и повторите попытку.');
  }

  if (response.status === 401 || response.status === 403) {
    throw new Error('Проверьте idInstance и apiTokenInstance. Доступ к инстансу отклонён.');
  }

  if (!response.ok) {
    throw new Error(`GREEN-API вернул ошибку ${response.status}. Проверьте данные и повторите попытку.`);
  }

  const text = await response.text();

  // При пустой очереди receiveNotification возвращает пустое тело ответа.
  if (method === 'receiveNotification' && !text.trim()) {
    return null as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    const contentType = response.headers.get('content-type') || 'не указан';
    throw new Error(`GREEN-API: ${method} вернул некорректный JSON (HTTP ${response.status}, формат: ${contentType}).`);
  }
}


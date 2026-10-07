import type { Credentials } from './api/greenApi/types';

const SESSION_KEY = 'green-api-whatsapp-credentials';

export function readSession(): Credentials | null {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    if (
      typeof data?.idInstance !== 'string' ||
      !/^\d+$/.test(data.idInstance) ||
      typeof data?.apiTokenInstance !== 'string' ||
      !data.apiTokenInstance.trim()
    ) {
      return null;
    }

    return { idInstance: data.idInstance, apiTokenInstance: data.apiTokenInstance };
  } catch {
    return null;
  }
}

export function saveSession(credentials: Credentials) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(credentials));
  } catch {
    throw new Error('Не удалось сохранить сессию. Разрешите хранение данных для этого сайта.');
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

import type { Credentials } from './types';
import { getInstanceSettings } from './getInstanceSettings';
import { setNotificationSettings } from './setNotificationSettings';

export async function configureNotifications(credentials: Credentials) {
  const settings = await getInstanceSettings(credentials);

  if (settings.webhookUrl === '' && settings.incomingWebhook === 'yes') {
    return;
  }

  await setNotificationSettings(credentials);
}

import type { IncomingNotification } from '../api/greenApi/types';
import type { Message } from '../types';

export function getIncomingMessage(
  { body }: IncomingNotification,
  chatId: string,
): Message | null {
  if (
    body.typeWebhook !== 'incomingMessageReceived' ||
    body.senderData?.chatId !== chatId ||
    typeof body.idMessage !== 'string'
  ) {
    return null;
  }

  const data = body.messageData;
  let text: string | undefined;

  switch (data?.typeMessage) {
    case 'textMessage':
      text = data.textMessageData?.textMessage;
      break;
    case 'extendedTextMessage':
    case 'quotedMessage':
      text = data.extendedTextMessageData?.text;
      break;
  }

  if (typeof text !== 'string') return null;

  return { id: body.idMessage, text, direction: 'incoming' };
}

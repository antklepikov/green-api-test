import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Credentials } from '../api/greenApi/types';
import type { Chat, Message } from '../types';
import { receiveNotification } from '../api/greenApi/receiveNotification';
import { deleteNotification } from '../api/greenApi/deleteNotification';
import { getIncomingMessage } from '../utils/getIncomingMessage';

export default function useIncomingMessages(
  credentials: Credentials | null,
  chat: Chat | null,
  setMessages: Dispatch<SetStateAction<Message[]>>,
) {
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    if (!credentials || !chat) return;

    const controller = new AbortController();
    const { signal } = controller;
    let timer: ReturnType<typeof setTimeout>;

    const poll = async () => {
      try {
        const notification = await receiveNotification(credentials, signal);
        if (signal.aborted) return;

        if (notification) {
          const message = getIncomingMessage(notification, chat.chatId);
          const isOutgoingApiMessage =
            notification.body.typeWebhook === 'outgoingAPIMessageReceived' &&
            notification.body.senderData?.chatId === chat.chatId;

          const isOutgoingStatus =
            notification.body.typeWebhook === 'outgoingMessageStatus' &&
            notification.body.chatId === chat.chatId;

          if (!message && !isOutgoingApiMessage && !isOutgoingStatus) {
            setError(`Получение остановлено: событие ${notification.body.typeWebhook}. Уведомление сохранено в GREEN-API.`);
            return;
          }

          if (message) {
            setMessages((messages) => {
              if (signal.aborted || messages.some((item) => item.id === message.id)) return messages;
              return [...messages, message];
            });
          }
          // Исходящие уведомления и статусы подтверждаем без добавления сообщения.
          await deleteNotification(credentials, notification.receiptId, signal);
        }

        if (signal.aborted) return;
        setError('');
        timer = setTimeout(poll, 1000);
      } catch (error) {
        if (signal.aborted) return;
        setError(error instanceof Error ? error.message : 'Не удалось получить сообщения.');
        timer = setTimeout(poll, 3000);
      }
    };

    timer = setTimeout(poll, 0);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [credentials, chat, setMessages]);

  return error;
}

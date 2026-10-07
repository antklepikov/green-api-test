import { styles } from './ChatWindow.styles';
import { Alert, Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import type { Chat, Message } from '../types';
import MessageInput from './MessageInput';

type ChatWindowProps = {
  chat: Chat | null;
  messages: Message[];
  receivingError: string;
  onSend: (text: string) => Promise<void>;
};

export default function ChatWindow({ chat, messages, onSend, receivingError }: ChatWindowProps) {
  return (
    <Box sx={styles.container}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={styles.header}>
        <Avatar sx={styles.avatar}>
          {chat ? chat.phoneNumber.slice(-2) : 'W'}
        </Avatar>
        <Typography fontWeight={600} sx={styles.phoneNumber}>
          {chat ? `+${chat.phoneNumber}` : 'Переписка'}
        </Typography>
      </Stack>
      {receivingError && <Alert severity="error">{receivingError}</Alert>}
      <Box sx={styles.messagesArea}>
        {messages.length ? (
          <Stack spacing={1.25}>
            {messages.map((message) => (
              <Paper
                key={message.id}
                elevation={0}
                sx={[styles.messageBubble, message.direction === 'outgoing' ? styles.outgoingMessage : styles.incomingMessage]}
              >
                <Typography sx={styles.messageText}>
                  {message.text}
                </Typography>
              </Paper>
            ))}
          </Stack>
        ) : (
          <Stack spacing={1} alignItems="center" justifyContent="center" sx={styles.emptyState}>
            <Typography variant="h5" fontWeight={600}>
              {chat ? 'Начните переписку' : 'Чат WhatsApp'}
            </Typography>
            <Typography color="text.secondary" sx={styles.emptyDescription}>
              {chat ? 'Напишите первое сообщение собеседнику' : 'Введите номер получателя слева и создайте чат'}
            </Typography>
          </Stack>
        )}
      </Box>
      {chat && <MessageInput key={chat.chatId} onSend={onSend} />}
    </Box>
  );
}

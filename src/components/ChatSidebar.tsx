import { styles } from './ChatSidebar.styles';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Avatar, Box, Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import type { Chat } from '../types';

type ChatSidebarProps = {
  chat: Chat | null;
  onCreateChat: (phoneNumber: string) => void;
  onLogout: () => void;
};

export default function ChatSidebar({ chat, onCreateChat, onLogout }: ChatSidebarProps) {
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const input = String(formData.get('phoneNumber') ?? '').trim();
    const phoneNumber = input.replace(/[\s()-]/g, '').replace(/^\+/, '');

    if (!/^\+?[\d\s()-]+$/.test(input) || !/^[1-9]\d{6,14}$/.test(phoneNumber)) {
      setError('Введите номер с кодом страны: от 7 до 15 цифр, например +7 999 123-45-67.');
      return;
    }

    setError('');
    onCreateChat(phoneNumber);
  }

  return (
    <Paper square elevation={0} sx={styles.container}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={styles.header}>
        <Avatar sx={styles.logo}>W</Avatar>
        <Box>
          <Typography variant="h6" fontWeight={700}>Чаты</Typography>
          <Typography variant="caption" color="text.secondary">WhatsApp · GREEN-API</Typography>
        </Box>
      </Stack>
      <Divider />
      <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={styles.form}>
        <Typography fontWeight={600}>Новый чат</Typography>
        <TextField
          name="phoneNumber"
          label="Телефон получателя"
          placeholder="+7 999 123-45-67"
          type="tel"
          size="small"
          required
          fullWidth
          error={Boolean(error)}
          helperText={error || 'Укажите номер с кодом страны'}
        />
        <Button type="submit" variant="contained" sx={styles.createButton}>Создать чат</Button>
      </Stack>
      {chat && (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={styles.selectedChat}>
          <Avatar sx={styles.avatar}>{chat.phoneNumber.slice(-2)}</Avatar>
          <Box sx={styles.chatInfo}>
            <Typography fontWeight={600} sx={styles.phoneNumber}>+{chat.phoneNumber}</Typography>
            <Typography variant="body2" color="text.secondary">Текущий чат</Typography>
          </Box>
        </Stack>
      )}
      <Box sx={styles.footer}>
        <Divider sx={styles.footerDivider} />
        <Button onClick={onLogout} fullWidth sx={styles.logoutButton}>Выйти / сменить инстанс</Button>
      </Box>
    </Paper>
  );
}

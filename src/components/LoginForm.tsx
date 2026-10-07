import { styles } from './LoginForm.styles';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Alert, Avatar, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { checkInstance } from '../api/greenApi/checkInstance';
import { configureNotifications } from '../api/greenApi/configureNotifications';
import type { Credentials } from '../api/greenApi/types';

type LoginFormProps = {
  onLogin: (credentials: Credentials) => void;
};

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [error, setError] = useState('');
  const requestPending = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestPending.current) return;

    const formData = new FormData(event.currentTarget);
    const credentials = {
      idInstance: String(formData.get('idInstance') ?? '').trim(),
      apiTokenInstance: String(formData.get('apiTokenInstance') ?? '').trim(),
    };

    if (!/^\d+$/.test(credentials.idInstance) || !credentials.apiTokenInstance) {
      setError('Введите числовой idInstance и непустой apiTokenInstance.');
      return;
    }

    setError('');
    requestPending.current = true;

    try {
      await checkInstance(credentials);
      await configureNotifications(credentials);
      onLogin(credentials);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Не удалось подключить инстанс.');
    } finally {
      requestPending.current = false;
    }
  }

  return (
    <Box sx={styles.container}>
      <Paper elevation={0} sx={styles.card}>
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <Box>
            <Avatar sx={styles.logo}>W</Avatar>
            <Typography variant="h5" fontWeight={600}>Чат WhatsApp</Typography>
            <Typography color="text.secondary">Введите данные инстанса WhatsApp из GREEN-API</Typography>
          </Box>
          <TextField name="idInstance" label="idInstance" required fullWidth />
          <TextField name="apiTokenInstance" label="apiTokenInstance" type="password" required fullWidth />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" sx={styles.submitButton}>Продолжить</Button>
        </Stack>
      </Paper>
    </Box>
  );
}

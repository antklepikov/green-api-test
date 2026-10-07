import { styles } from './MessageInput.styles';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Alert, Button, Paper, Stack, SvgIcon, TextField } from '@mui/material';

type MessageInputProps = {
  onSend: (text: string) => Promise<void>;
};

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const requestPending = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = text.trim();
    if (!message || requestPending.current) return;

    setError('');
    requestPending.current = true;
    const draft = text;

    try {
      await onSend(message);
      // Сохраняем новый текст, если пользователь изменил его во время запроса.
      setText((current) => current === draft ? '' : current);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Не удалось отправить сообщение.');
    } finally {
      requestPending.current = false;
    }
  }

  return (
    <Paper square elevation={0} sx={styles.container}>
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <TextField
            placeholder="Напишите сообщение"
            slotProps={{ htmlInput: { 'aria-label': 'Сообщение' } }}
            sx={styles.textField}
            value={text}
            onChange={(event) => setText(event.target.value)}
            multiline
            maxRows={4}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!text.trim()}
            aria-label="Отправить сообщение"
            title="Отправить сообщение"
            sx={styles.sendButton}
          >
            <SvgIcon><path d="M3 20.5v-7l12-1.5-12-1.5v-7L22 12 3 20.5Z" /></SvgIcon>
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

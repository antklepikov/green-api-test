import { useState } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';

export default function App() {
  const [showChat, setShowChat] = useState(false);

  if (!showChat) {
    return (
      <Box sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', p: 2 }}>
        <Paper variant="outlined" sx={{ width: '100%', maxWidth: 400, p: 3 }}>
          <Stack spacing={3} component="form" onSubmit={(event) => {
            event.preventDefault();
            setShowChat(true);
          }}>
            <Box>
              <Typography variant="h5" fontWeight={600}>Чат MAX</Typography>
              <Typography color="text.secondary">Подключение через GREEN-API</Typography>
            </Box>
            <TextField label="idInstance" required fullWidth />
            <TextField label="apiTokenInstance" type="password" required fullWidth />
            <Typography variant="body2" color="text.secondary">
              Каркас интерфейса. Подключение к API ещё не реализовано.
            </Typography>
            <Button type="submit" variant="contained">Продолжить</Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh', flexDirection: { xs: 'column', sm: 'row' } }}>
      <Paper square variant="outlined" sx={{ width: { xs: '100%', sm: 300 }, p: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Чат MAX</Typography>
          <TextField label="Телефон получателя" placeholder="+7 999 123-45-67" fullWidth />
          <Button variant="contained" disabled>Создать чат</Button>
          <Button onClick={() => setShowChat(false)}>Выйти / сменить инстанс</Button>
        </Stack>
      </Paper>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Paper square variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6">Переписка</Typography>
        </Paper>
        <Box sx={{ flex: 1, display: 'grid', placeItems: 'center', p: 3 }}>
          <Typography color="text.secondary" textAlign="center">
            Здесь будут сообщения выбранного собеседника
          </Typography>
        </Box>
        <Paper square variant="outlined" sx={{ p: 2 }}>
          <Stack direction="row" spacing={2}>
            <TextField label="Сообщение" fullWidth disabled />
            <Button variant="contained" disabled>Отправить</Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

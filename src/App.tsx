import { styles } from './App.styles';
import { useRef, useState } from 'react';
import { Grid } from '@mui/material';
import type { Credentials } from './api/greenApi/types';
import type { Chat, Message } from './types';
import { sendMessage } from './api/greenApi/sendMessage';
import { clearSession, readSession, saveSession } from './session';
import LoginForm from './components/LoginForm';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import useIncomingMessages from './hooks/useIncomingMessages';

export default function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(readSession);

  const [chat, setChat] = useState<Chat | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const chatVersion = useRef(0);
  const receivingError = useIncomingMessages(credentials, chat, setMessages);

  function handleCreateChat(phoneNumber: string) {
    chatVersion.current += 1;
    setMessages([]);
    setChat({
      phoneNumber,
      chatId: `${phoneNumber}@c.us`,
    });
  }

  async function handleSendMessage(text: string) {
    if (!credentials || !chat) {
      throw new Error('Сначала войдите и создайте чат.');
    }

    const version = chatVersion.current;
    const id = await sendMessage(credentials, chat.chatId, text);

    // Ответ старого запроса не должен попадать в новый чат.
    if (version !== chatVersion.current) return;

    setMessages((previous) => [
      ...previous,
      { id, text, direction: 'outgoing' },
    ]);
  }

  function handleLogin(credentials: Credentials) {
    saveSession(credentials);
    setCredentials(credentials);
  }

  function handleLogout() {
    clearSession();
    chatVersion.current += 1;
    setMessages([]);
    setCredentials(null);
    setChat(null);
  }

  if (!credentials) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Grid container sx={styles.container}>
      <Grid size={{ xs: 12, md: 3 }} sx={styles.sidebarColumn}>
        <ChatSidebar chat={chat} onCreateChat={handleCreateChat} onLogout={handleLogout} />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }} sx={styles.chatColumn}>
        <ChatWindow
          chat={chat}
          messages={messages}
          onSend={handleSendMessage}
          receivingError={receivingError}
        />
      </Grid>
    </Grid>
  );
}

import type { SxProps, Theme } from '@mui/material';
import { chatBackground } from '../chatBackground';

export const styles = {
  container: {
    flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: {
      xs: '75dvh', md: '100dvh'
    }, bgcolor: '#f5f3ed'
  },
  header: {
    px: {
      xs: 2, md: 3
    }, py: 2, minHeight: 78, borderBottom: '1px solid', borderColor: '#e6e2d9'
  },
  avatar: {
    width: 44, height: 44, bgcolor: '#d9e9e4', color: 'primary.main'
  },
  phoneNumber: {
    overflowWrap: 'anywhere'
  },
  messagesArea: {
    flex: 1, minHeight: 0, overflowY: 'auto', px: {
      xs: 2, md: 5
    }, py: 3, bgcolor: '#f5f1e8', backgroundImage: chatBackground
  },
  messageBubble: {
    px: 2,
    py: 1.25,
    maxWidth: {
      xs: '88%', md: '70%'
    },
    boxShadow: '0 1px 1px rgba(11, 20, 26, 0.08)'
  },
  messageText: {
    whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', lineHeight: 1.5
  },
  emptyState: {
    height: '100%', textAlign: 'center'
  },
  emptyDescription: {
    maxWidth: 320
  },
  outgoingMessage: {
    alignSelf: 'flex-end', bgcolor: '#d9fdd3', borderRadius: '18px 18px 4px 18px'
  },
  incomingMessage: {
    alignSelf: 'flex-start', bgcolor: '#ffffff', borderRadius: '18px 18px 18px 4px'
  },
} satisfies Record<string, SxProps<Theme>>;

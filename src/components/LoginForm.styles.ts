import type { SxProps, Theme } from '@mui/material';
import { chatBackground } from '../chatBackground';

export const styles = {
  container: {
    minHeight: '100dvh', display: 'grid', placeItems: 'center', p: 2, backgroundImage: chatBackground
  },
  card: {
    width: '100%', maxWidth: 420, p: {
      xs: 3, sm: 4
    }, border: '1px solid', borderColor: 'divider', boxShadow: '0 12px 48px rgba(11, 20, 26, 0.08)'
  },
  logo: {
    bgcolor: 'primary.main', width: 52, height: 52, mb: 2, fontWeight: 700
  },
  submitButton: {
    borderRadius: 6, py: 1.5
  },
} satisfies Record<string, SxProps<Theme>>;

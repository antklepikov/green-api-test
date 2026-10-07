import type { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    height: '100%', display: 'flex', flexDirection: 'column', borderRight: '1px solid', borderColor: 'divider'
  },
  header: {
    px: 3, py: 2.5
  },
  logo: {
    bgcolor: 'primary.main', width: 42, height: 42, fontWeight: 700
  },
  form: {
    p: 3
  },
  createButton: {
    borderRadius: 6, py: 1.25
  },
  selectedChat: {
    mx: 1.5, p: 2, borderRadius: 3, bgcolor: '#f0f2f5'
  },
  avatar: {
    bgcolor: '#d9e9e4', color: 'primary.main'
  },
  chatInfo: {
    minWidth: 0
  },
  phoneNumber: {
    overflowWrap: 'anywhere'
  },
  footer: {
    mt: 'auto', p: 2
  },
  footerDivider: {
    mb: 1.5
  },
  logoutButton: {
    color: 'text.secondary'
  },
} satisfies Record<string, SxProps<Theme>>;

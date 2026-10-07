import type { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    minHeight: '100dvh'
  },
  sidebarColumn: {
    height: {
      md: '100dvh'
    }, overflowY: {
      md: 'auto'
    }
  },
  chatColumn: {
    display: 'flex', minHeight: {
      xs: '60dvh', md: 'auto'
    }
  },
} satisfies Record<string, SxProps<Theme>>;

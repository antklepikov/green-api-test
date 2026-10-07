import type { SxProps, Theme } from '@mui/material';

export const styles = {
  container: {
    px: {
      xs: 2, md: 3
    }, py: 1.5, bgcolor: '#f5f3ed'
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 7
    }, '& fieldset': {
      borderColor: '#e1e4e5'
    }
  },
  sendButton: {
    minWidth: 48, width: 48, height: 48, borderRadius: '50%', flexShrink: 0, bgcolor: '#1daa61', '&:hover': {
      bgcolor: '#16894e'
    }
  },
} satisfies Record<string, SxProps<Theme>>;

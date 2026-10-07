import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';

const theme = createTheme({
  palette: {
    primary: { main: '#008069', dark: '#006b58', contrastText: '#ffffff' },
    background: { default: '#f5f3ed', paper: '#ffffff' },
    text: { primary: '#111b21', secondary: '#667781' },
    divider: '#e9edef',
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiOutlinedInput: {
      styleOverrides: { root: { backgroundColor: '#ffffff' } },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);

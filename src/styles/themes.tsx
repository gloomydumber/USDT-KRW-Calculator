import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00FF00',
    },
    text: {
      primary: '#00FF00',
    }
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f4f4f4', // A softer shade of gray instead of stark white
      paper: '#ffffff'   // Keeping paper white but can also be adjusted if needed
    }
  }
});
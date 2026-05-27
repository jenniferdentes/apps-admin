import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#244B72',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#5C6BC0',
    },
    background: {
      default: '#F4F6F8',
      paper: '#ffffff',
    },
    text: {
      primary: '#202938',
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, fontSize: '1.5rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    body2: { fontSize: '0.875rem', color: '#64748B' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500 },
        contained: {
          backgroundColor: '#244B72',
          paddingLeft: 16,
          paddingRight: 16,
          boxShadow: 'none',
          '&:hover': { backgroundColor: '#1a3a5c', boxShadow: 'none' },
          '&:active': { boxShadow: 'none' },
          '&:focus': { boxShadow: 'none' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 8, backgroundColor: '#fff' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
  },
})

export default theme

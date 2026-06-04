import { createTheme, alpha } from '@mui/material/styles';

// ─────────────────────────────────────────────────────────────────────────────
// CubX Design System — MUI Theme
// Tokens extracted from Figma: Admin-MUI-CubX-Library (palette collection)
// Light/Dark values resolved from Figma variables on 2025-06-04
// ─────────────────────────────────────────────────────────────────────────────

const cubxTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },

  colorSchemes: {
    // ── LIGHT ─────────────────────────────────────────────────────────────────
    light: {
      palette: {
        mode: 'light',

        primary: {
          main:        '#244b72',
          dark:        '#0c2e50',
          light:       '#85a4c2',
          contrastText:'#ffffff',
        },

        secondary: {
          main:        '#ebf0f5',
          dark:        '#dfe9f2',
          light:       '#f7f8fc',
          contrastText:'#244b72',
        },

        error: {
          main:        '#de5243',
          dark:        '#c83e2e',
          light:       '#fcf4f2',
          contrastText:'#ffffff',
        },

        warning: {
          main:        '#ef6c00',
          dark:        '#e65100',
          light:       '#ff9800',
          contrastText:'#ffffff',
        },

        info: {
          main:        '#0288d1',
          dark:        '#01579b',
          light:       '#03a9f4',
          contrastText:'#ffffff',
        },

        success: {
          main:        '#16b364',
          dark:        '#084c2e',
          light:       '#d3f8df',
          contrastText:'#ffffff',
        },

        text: {
          primary:   '#202938',
          secondary: '#4a5466',
          disabled:  '#9aa2b2',
        },

        background: {
          default: '#ffffff',
          paper:   '#f7f8fc',
        },

        divider: '#eaecf0',

        action: {
          active:            '#667085',
          hover:             alpha('#000000', 0.04),
          selected:          alpha('#000000', 0.08),
          focus:             alpha('#000000', 0.12),
          disabled:          alpha('#000000', 0.38),
          disabledBackground:alpha('#000000', 0.12),
        },
      },
    },

    // ── DARK ──────────────────────────────────────────────────────────────────
    dark: {
      palette: {
        mode: 'dark',

        primary: {
          main:        '#7582eb',
          dark:        '#456c92',
          light:       '#ebf0f5',
          contrastText:'#ebf0f5',
        },

        secondary: {
          main:        '#698bac',
          dark:        '#606374',
          light:       '#404350',
          contrastText:'#ffffff',
        },

        error: {
          main:        '#e8786c',
          dark:        '#de5243',
          light:       '#f0a69e',
          contrastText:'#ffffff',
        },

        warning: {
          main:        '#fb8c00',
          dark:        '#f57c00',
          light:       '#ff9800',
          contrastText:alpha('#000000', 0.87),
        },

        info: {
          main:        '#4077d1',
          dark:        '#92b2e5',
          light:       '#21498a',
          contrastText:alpha('#000000', 0.87),
        },

        success: {
          main:        '#3ccb7f',
          dark:        '#087443',
          light:       '#73e2a3',
          contrastText:alpha('#000000', 0.87),
        },

        text: {
          primary:   '#f2f4f7',
          secondary: '#eaecf0',
          disabled:  '#98a2b3',
        },

        background: {
          default: '#262d3c',
          paper:   '#101828',
        },

        divider: '#404350',

        action: {
          active:            '#d0d5dd',
          hover:             alpha('#ffffff', 0.08),
          selected:          alpha('#ffffff', 0.16),
          focus:             alpha('#ffffff', 0.12),
          disabled:          alpha('#ffffff', 0.38),
          disabledBackground:alpha('#ffffff', 0.12),
        },
      },
    },
  },

  // ── TYPOGRAPHY ──────────────────────────────────────────────────────────────
  typography: {
    fontFamily: '"Geist", "Inter", system-ui, sans-serif',
    fontSize: 14,
    fontWeightLight:   300,
    fontWeightRegular: 400,
    fontWeightMedium:  500,
    fontWeightBold:    600,
    h1: { fontSize: '2rem',    fontWeight: 600, lineHeight: 1.2 },
    h2: { fontSize: '1.5rem',  fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '1.125rem',fontWeight: 500, lineHeight: 1.4 },
    h5: { fontSize: '1rem',    fontWeight: 500, lineHeight: 1.5 },
    h6: { fontSize: '0.875rem',fontWeight: 500, lineHeight: 1.5 },
    body1:   { fontSize: '0.875rem', lineHeight: 1.6 },
    body2:   { fontSize: '0.8125rem',lineHeight: 1.6 },
    caption: { fontSize: '0.75rem',  lineHeight: 1.5 },
    overline:{ fontSize: '0.75rem',  fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' },
  },

  // ── SHAPE ───────────────────────────────────────────────────────────────────
  shape: {
    borderRadius: 8,
  },

  // ── COMPONENT OVERRIDES ─────────────────────────────────────────────────────
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500, boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      },
    },

    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        // Custom scrollbar
        '*::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          background: theme.palette.mode === 'dark' ? '#344054' : '#eaecf0',
          borderRadius: '3px',
          '&:hover': {
            background: theme.palette.mode === 'dark' ? '#475467' : '#d0d5dd',
          },
        },
      }),
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          // Use Figma token: _components/appBar/defaultFill
          // light: #262d3c (navy) | dark: resolved from alias
          backgroundImage: 'none',
        },
        colorDefault: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#1e2536' : '#262d3c',
          color: '#ffffff',
        }),
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        // elevation-0 maps to Figma background/paper-elevation-0
        // elevation-1+ maps to background/paper-elevation-1
      },
    },

    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? '#3e4352'   // Figma: background/paper-elevation-0 dark
              : '#fcfbfd',  // Figma: background/paper-elevation-0 light
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        }),
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:not(:last-child)': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }),
      },
    },

    MuiChip: {
      styleOverrides: {
        outlined: ({ theme }) => ({
          borderColor:
            theme.palette.mode === 'dark'
              ? '#344054'   // Figma: _components/chip/defaultEnabledBorder dark
              : '#98a2b3',  // Figma: _components/chip/defaultEnabledBorder light
        }),
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: ({ theme }) => ({
          borderColor:
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.23)' // Figma: _components/input/outlined/enabledBorder dark
              : '#d0d5dd',               // Figma: _components/input/outlined/enabledBorder light
        }),
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          // Figma: _components/tooltip/fill — same in both modes
          backgroundColor: 'rgba(97,97,97,0.9)',
          fontSize: '0.75rem',
        },
      },
    },

    MuiBackdrop: {
      styleOverrides: {
        root: {
          // Figma: _components/backdrop/fill
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
      },
    },
  },
});

export default cubxTheme;

// ─────────────────────────────────────────────────────────────────────────────
// Usage in your app root:
//
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import cubxTheme from '@/theme';
//
// export default function RootLayout({ children }) {
//   return (
//     <AppRouterCacheProvider>
//       <ThemeProvider theme={cubxTheme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </AppRouterCacheProvider>
//   );
// }
// ─────────────────────────────────────────────────────────────────────────────

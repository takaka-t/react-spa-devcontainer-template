import { createTheme } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material/styles'

export function createAppTheme(mode: PaletteMode) {
  const isLight = mode === 'light'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#2563eb',
      },
      secondary: {
        main: '#0f766e',
      },
      background: {
        default: isLight ? '#f7f8fb' : '#111827',
        paper: isLight ? '#ffffff' : '#1f2937',
      },
      text: {
        primary: isLight ? '#111827' : '#f9fafb',
        secondary: isLight ? '#5b6472' : '#c7d2de',
      },
      divider: isLight ? '#e3e8ef' : '#344054',
    },
    shape: {
      // MUI の borderRadius は 8px 程度にそろえ、業務画面として落ち着いた見た目にします。
      borderRadius: 8,
    },
    typography: {
      fontFamily: ['Roboto', 'system-ui', 'Segoe UI', 'sans-serif'].join(','),
      h1: {
        fontSize: '2rem',
        fontWeight: 700,
        letterSpacing: 0,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: 0,
      },
      h3: {
        fontSize: '1.125rem',
        fontWeight: 700,
        letterSpacing: 0,
      },
      button: {
        fontWeight: 700,
        letterSpacing: 0,
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 700,
          },
        },
      },
    },
  })
}

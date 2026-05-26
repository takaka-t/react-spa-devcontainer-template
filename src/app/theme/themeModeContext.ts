import { createContext } from 'react'
import type { PaletteMode } from '@mui/material/styles'

export type ThemeModeContextValue = {
  mode: PaletteMode
  setMode: (mode: PaletteMode) => void
  toggleMode: () => void
}

export const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined)

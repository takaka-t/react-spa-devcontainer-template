import { useEffect, useMemo, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { createAppTheme } from './createAppTheme.ts'
import { ThemeModeContext } from './themeModeContext.ts'
import type { ThemeModeContextValue } from './themeModeContext.ts'

const STORAGE_KEY = 'sample-app-theme-mode'

type ThemeModeProviderProps = {
  children: ReactNode
}

function readInitialMode(): PaletteMode {
  // Vite の SPA では通常 window を参照できますが、将来 SSR に寄せても壊れにくいように分岐しています。
  if (typeof window === 'undefined') {
    return 'light'
  }

  let storedMode: string | null

  try {
    storedMode = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return 'light'
  }

  if (storedMode === 'light' || storedMode === 'dark') {
    return storedMode
  }

  return 'light'
}

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>(() => readInitialMode())

  const theme = useMemo(() => createAppTheme(mode), [mode])

  const contextValue = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode: () => {
        setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [mode],
  )

  useEffect(() => {
    // テーマ選択を localStorage に保存して、リロード後も同じ見た目を保ちます。
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // 保存に失敗しても、現在の画面内では React state の mode が効いているため操作は継続できます。
    }
  }, [mode])

  return (
    <ThemeModeContext.Provider value={contextValue}>
      {/* CssBaseline はブラウザごとの既定スタイル差をならし、MUI テーマの背景色も body に反映します。 */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

import type { ReactNode } from 'react'
import '@fontsource/roboto/latin-300.css'
import '@fontsource/roboto/latin-400.css'
import '@fontsource/roboto/latin-500.css'
import '@fontsource/roboto/latin-700.css'
import { ThemeModeProvider } from './theme/ThemeModeProvider.tsx'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    // アプリ全体で使う Provider は、このコンポーネントに集約します。
    // 認証、API クライアント、状態管理などを追加する場合も、main.tsx を肥大化させずにここへ足せます。
    <ThemeModeProvider>{children}</ThemeModeProvider>
  )
}

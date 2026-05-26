import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

type SectionProps = {
  title?: string
  description?: string
  children: ReactNode
}

export function Section({ title, description, children }: SectionProps) {
  return (
    // まとまった表示領域は Section として共通化します。
    // 複雑な sx を各ページに散らさず、再利用できるコンポーネントへ閉じ込めるためです。
    <Paper
      sx={{
        p: { xs: 2, md: 3 },
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Stack spacing={2.5}>
        {(title || description) && (
          <Stack spacing={0.5}>
            {title && <Typography variant="h3">{title}</Typography>}
            {description && <Typography color="text.secondary">{description}</Typography>}
          </Stack>
        )}
        {children}
      </Stack>
    </Paper>
  )
}

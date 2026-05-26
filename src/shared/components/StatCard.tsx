import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

type StatCardProps = {
  label: string
  value: string
  helper: string
  icon: ReactNode
}

export function StatCard({ label, value, helper, icon }: StatCardProps) {
  return (
    <Paper
      sx={{
        p: 2.5,
        height: '100%',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          {icon}
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="h2">{value}</Typography>
          <Typography variant="body2" color="text.secondary">
            {helper}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

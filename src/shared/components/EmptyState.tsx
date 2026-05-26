import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', py: 6, px: 2 }}>
      <InboxOutlinedIcon color="disabled" fontSize="large" />
      <Stack spacing={0.75}>
        <Typography variant="h3">{title}</Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Stack>
      {action}
    </Stack>
  )
}

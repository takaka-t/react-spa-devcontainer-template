import { Link as RouterLink } from 'react-router'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

type BreadcrumbItem = {
  label: string
  to?: string
}

type PageHeaderProps = {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: ReactNode
}

export function PageHeader({ title, description, breadcrumbs = [], actions }: PageHeaderProps) {
  return (
    // ページ冒頭の見出し、説明、操作ボタンを共通化します。
    // 各ページで余白や見出しサイズがばらつかないように、よく出る UI は shared/components に寄せます。
    <Stack spacing={2}>
      {breadcrumbs.length > 0 && (
        <Breadcrumbs aria-label="パンくず">
          {breadcrumbs.map((item) =>
            item.to ? (
              <Link key={item.label} component={RouterLink} to={item.to} underline="hover" color="inherit">
                {item.label}
              </Link>
            ) : (
              <Typography key={item.label} color="text.primary">
                {item.label}
              </Typography>
            ),
          )}
        </Breadcrumbs>
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}
      >
        <Stack spacing={0.75}>
          <Typography variant="h1">{title}</Typography>
          {description && <Typography color="text.secondary">{description}</Typography>}
        </Stack>
        {actions}
      </Stack>
    </Stack>
  )
}

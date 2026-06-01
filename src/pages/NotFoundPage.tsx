import { Link as RouterLink } from 'react-router'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { EmptyState } from '../shared/components/EmptyState.tsx'
import { PageHeader } from '../shared/components/PageHeader.tsx'

export function NotFoundPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        title="ページが見つかりません"
        description="指定された URL に対応する画面はありません。"
        breadcrumbs={[
          { label: 'ダッシュボード', to: '/' },
          { label: '404' },
        ]}
      />
      <EmptyState
        title="存在しないページです"
        description="URL を確認するか、ダッシュボードから操作をやり直してください。"
        action={
          <Button component={RouterLink} to="/" startIcon={<HomeOutlinedIcon />} variant="contained">
            ダッシュボードへ戻る
          </Button>
        }
      />
    </Stack>
  )
}

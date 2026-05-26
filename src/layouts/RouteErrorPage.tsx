import { isRouteErrorResponse, Link as RouterLink, useRouteError } from 'react-router'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

function getErrorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`
  }

  if (error instanceof Error) {
    return error.message
  }

  return '予期しないエラーが発生しました'
}

export function RouteErrorPage() {
  const error = useRouteError()

  return (
    // errorElement は loader や画面描画中のエラーを受け止める場所です。
    // 実務ではここでログ送信や監視サービスへの通知を追加することが多いです。
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '100vh',
        p: 3,
        bgcolor: 'background.default',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 560,
          p: 4,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
          <ErrorOutlineOutlinedIcon color="error" fontSize="large" />
          <Stack spacing={1}>
            <Typography variant="h1">エラーが発生しました</Typography>
            <Typography color="text.secondary">{getErrorMessage(error)}</Typography>
          </Stack>
          <Button component={RouterLink} to="/" startIcon={<HomeOutlinedIcon />} variant="contained">
            ダッシュボードへ戻る
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

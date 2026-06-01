import { Form, useActionData, useNavigation, useSearchParams } from 'react-router'
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { LoginActionData } from '../../app/auth/authRoutes.ts'

export function LoginPage() {
  const actionData = useActionData() as LoginActionData | undefined
  const navigation = useNavigation()
  const [searchParams] = useSearchParams()
  const isSubmitting = navigation.state === 'submitting'
  const redirectTo = searchParams.get('redirectTo') ?? '/'

  return (
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
          maxWidth: 420,
          p: 4,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Box
              sx={{
                display: 'grid',
                placeItems: 'center',
                width: 48,
                height: 48,
                borderRadius: 1,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <AnalyticsOutlinedIcon />
            </Box>
            <Stack spacing={0.5}>
              <Typography variant="h1">CustomerHub</Typography>
              <Typography color="text.secondary">業務画面へログイン</Typography>
            </Stack>
          </Stack>

          {actionData?.error && <Alert severity="error">{actionData.error}</Alert>}

          <Form method="post">
            <Stack spacing={2.5}>
              <input type="hidden" name="redirectTo" value={redirectTo} />
              <TextField
                label="メールアドレス"
                name="email"
                type="email"
                autoComplete="username"
                defaultValue="operator@example.com"
                fullWidth
              />
              <TextField
                label="パスワード"
                name="password"
                type="password"
                autoComplete="current-password"
                defaultValue="password"
                fullWidth
              />
              <Button type="submit" variant="contained" size="large" startIcon={<LoginOutlinedIcon />} disabled={isSubmitting}>
                ログイン
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Paper>
    </Box>
  )
}

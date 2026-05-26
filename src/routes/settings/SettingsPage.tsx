import { useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import type { PaletteMode } from '@mui/material/styles'
import { useThemeMode } from '../../app/theme/useThemeMode.ts'
import { PageHeader } from '../../shared/components/PageHeader.tsx'
import { Section } from '../../shared/components/Section.tsx'

export function SettingsPage() {
  const { mode, setMode } = useThemeMode()
  const [workspaceName, setWorkspaceName] = useState('CustomerHub')
  const [contactEmail, setContactEmail] = useState('ops@example.com')
  const [weeklyReportEnabled, setWeeklyReportEnabled] = useState(true)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  function handleSave() {
    // このサンプルでは保存先を持たないため Snackbar の表示だけにしています。
    // 実アプリでは、ここで API 送信やフォームライブラリとの連携を行います。
    setSnackbarOpen(true)
  }

  return (
    <Stack spacing={3}>
      <PageHeader
        title="設定"
        description="MUI のフォーム部品、テーマ切り替え、通知 UI のサンプルです。"
        breadcrumbs={[
          { label: 'ダッシュボード', to: '/' },
          { label: '設定' },
        ]}
        actions={
          <Button variant="contained" startIcon={<SaveOutlinedIcon />} onClick={handleSave}>
            保存
          </Button>
        }
      />

      <Stack spacing={3}>
        <Section title="ワークスペース">
          <Stack spacing={2.5}>
            <TextField
              label="ワークスペース名"
              value={workspaceName}
              onChange={(event) => setWorkspaceName(event.target.value)}
              fullWidth
            />
            <TextField
              label="連絡先メールアドレス"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              type="email"
              fullWidth
            />
          </Stack>
        </Section>

        <Section title="表示と通知">
          <Stack spacing={2.5}>
            <FormControl>
              <FormLabel id="theme-mode-label">テーマ</FormLabel>
              <RadioGroup
                row
                aria-labelledby="theme-mode-label"
                value={mode}
                onChange={(event) => setMode(event.target.value as PaletteMode)}
              >
                <FormControlLabel value="light" control={<Radio />} label="ライト" />
                <FormControlLabel value="dark" control={<Radio />} label="ダーク" />
              </RadioGroup>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={weeklyReportEnabled}
                  onChange={(event) => setWeeklyReportEnabled(event.target.checked)}
                />
              }
              label="週次レポートを受け取る"
            />
          </Stack>
        </Section>
      </Stack>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" variant="filled" onClose={() => setSnackbarOpen(false)}>
          設定を保存しました
        </Alert>
      </Snackbar>
    </Stack>
  )
}

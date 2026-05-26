import { Outlet, NavLink } from 'react-router'
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import { useThemeMode } from '../app/theme/useThemeMode.ts'

type NavItem = {
  label: string
  to: string
  end?: boolean
  icon: ReactNode
}

const navItems: NavItem[] = [
  {
    label: 'ダッシュボード',
    to: '/',
    end: true,
    icon: <DashboardOutlinedIcon fontSize="small" />,
  },
  {
    label: '顧客一覧',
    to: '/customers',
    icon: <PeopleAltOutlinedIcon fontSize="small" />,
  },
  {
    label: '伝票検索',
    to: '/vouchers',
    icon: <ReceiptLongOutlinedIcon fontSize="small" />,
  },
  {
    label: '設定',
    to: '/settings',
    icon: <SettingsOutlinedIcon fontSize="small" />,
  },
]

function AppNavLink({ label, to, end, icon }: NavItem) {
  return (
    <NavLink to={to} end={end} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        // NavLink の isActive を使うと、現在表示している画面に合わせてナビゲーションの見た目を変えられます。
        // MUI の Button に直接ルーター情報を持たせるより、役割を分けた方がサンプルとして読みやすくなります。
        <Stack
          component="span"
          direction="row"
          spacing={1.25}
          sx={{
            alignItems: 'center',
            minHeight: 40,
            px: 1.5,
            borderRadius: 1,
            color: isActive ? 'primary.main' : 'text.secondary',
            bgcolor: isActive ? 'action.selected' : 'transparent',
            fontWeight: isActive ? 700 : 500,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          {icon}
          <Typography component="span" variant="body2" sx={{ fontWeight: 'inherit' }}>
            {label}
          </Typography>
        </Stack>
      )}
    </NavLink>
  )
}

export function AppLayout() {
  const { mode, toggleMode } = useThemeMode()

  return (
    // 画面全体の大枠は Box と Stack で構成しています。
    // Flexbox ベースにしておくと、CSS の標準的な知識をそのまま活かしやすくなります。
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="aside"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          gap: 2,
          width: { xs: '100%', md: 280 },
          p: 2,
          borderRight: { xs: 'none', md: 1 },
          borderBottom: { xs: 1, md: 'none' },
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: 40,
              height: 40,
              borderRadius: 1,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <AnalyticsOutlinedIcon fontSize="small" />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h3" component="p">
              CustomerHub
            </Typography>
            <Typography variant="caption" color="text.secondary">
              React Router + MUI Sample
            </Typography>
          </Box>
        </Stack>

        <Divider />

        <Stack component="nav" spacing={0.75} aria-label="メインナビゲーション">
          {navItems.map((item) => (
            <AppNavLink key={item.to} {...item} />
          ))}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack spacing={1.5}>
          <Chip label="Demo workspace" size="small" color="secondary" variant="outlined" />
          <Button href="https://mui.com/material-ui/getting-started/" target="_blank" rel="noreferrer">
            MUI Docs
          </Button>
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
        <Box
          component="header"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            minHeight: 64,
            px: { xs: 2, md: 3 },
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Tooltip title={mode === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}>
            <IconButton onClick={toggleMode} aria-label="テーマを切り替え">
              {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            maxWidth: 1180,
            mx: 'auto',
            p: { xs: 2, md: 3 },
          }}
        >
          {/* Outlet はネストされた子ルートの表示位置です。共通レイアウトとページ固有の内容を分離できます。 */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

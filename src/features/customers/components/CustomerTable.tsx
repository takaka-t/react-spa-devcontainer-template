import { Link as RouterLink } from 'react-router'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { formatCurrency, formatDate } from '../../../shared/utils/format.ts'
import type { Customer } from '../types.ts'
import { CustomerStatusChip } from './CustomerStatusChip.tsx'

type CustomerTableProps = {
  customers: Customer[]
}

export function CustomerTable({ customers }: CustomerTableProps) {
  return (
    // 一覧表示は MUI Table を使います。
    // 小〜中規模の業務一覧では構造を把握しやすく、DataGrid ほど依存や設定が増えません。
    <TableContainer>
      <Table sx={{ minWidth: 920 }} aria-label="顧客一覧">
        <TableHead>
          <TableRow>
            <TableCell>顧客</TableCell>
            <TableCell>ステータス</TableCell>
            <TableCell>担当</TableCell>
            <TableCell>最終接点</TableCell>
            <TableCell align="right">年間収益</TableCell>
            <TableCell>健全性</TableCell>
            <TableCell align="right">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} hover>
              <TableCell>
                <Stack spacing={0.25}>
                  <Typography sx={{ fontWeight: 700 }}>{customer.company}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {customer.name} / {customer.email}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <CustomerStatusChip status={customer.status} />
              </TableCell>
              <TableCell>{customer.owner}</TableCell>
              <TableCell>{formatDate(customer.lastContactedAt)}</TableCell>
              <TableCell align="right">{formatCurrency(customer.revenue)}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Box sx={{ width: 96 }}>
                    <LinearProgress
                      variant="determinate"
                      value={customer.healthScore}
                      color={customer.healthScore < 60 ? 'warning' : 'primary'}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {customer.healthScore}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Button
                  component={RouterLink}
                  to={`/customers/${customer.id}`}
                  endIcon={<ArrowForwardOutlinedIcon />}
                  size="small"
                >
                  詳細
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

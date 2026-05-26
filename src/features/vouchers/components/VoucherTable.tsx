import { Fragment, useMemo, useState } from 'react'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
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
import type { Account, Department, Supplier, Voucher } from '../types.ts'
import { VoucherStatusChip } from './VoucherStatusChip.tsx'

type VoucherTableProps = {
  vouchers: Voucher[]
  suppliers: Supplier[]
  departments: Department[]
  accounts: Account[]
}

export function VoucherTable({ vouchers, suppliers, departments, accounts }: VoucherTableProps) {
  const [expandedVoucherId, setExpandedVoucherId] = useState<string | null>(null)

  const supplierById = useMemo(() => new Map(suppliers.map((supplier) => [supplier.id, supplier])), [suppliers])
  const departmentById = useMemo(
    () => new Map(departments.map((department) => [department.id, department])),
    [departments],
  )
  const accountById = useMemo(() => new Map(accounts.map((account) => [account.id, account])), [accounts])
  const maxTotalAmount = Math.max(...vouchers.map((voucher) => voucher.totalAmount), 1)

  return (
    // 伝票ヘッダーと明細を同じ表に詰め込みすぎると読みにくくなります。
    // まず一覧ではヘッダー情報を比較し、必要な伝票だけ展開して明細を見る設計にしています。
    <TableContainer>
      <Table sx={{ minWidth: 1080 }} aria-label="伝票検索結果">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 56 }} />
            <TableCell>伝票</TableCell>
            <TableCell>取引先</TableCell>
            <TableCell>部門</TableCell>
            <TableCell>ステータス</TableCell>
            <TableCell align="right">明細数</TableCell>
            <TableCell align="right">税込金額</TableCell>
            <TableCell>金額感</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vouchers.map((voucher) => {
            const supplier = supplierById.get(voucher.supplierId)
            const department = departmentById.get(voucher.departmentId)
            const isExpanded = expandedVoucherId === voucher.id

            return (
              <Fragment key={voucher.id}>
                <TableRow hover>
                  <TableCell>
                    <IconButton
                      size="small"
                      aria-label={isExpanded ? '明細を閉じる' : '明細を開く'}
                      onClick={() => setExpandedVoucherId(isExpanded ? null : voucher.id)}
                    >
                      {isExpanded ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowRightOutlinedIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.25}>
                      <Typography sx={{ fontWeight: 700 }}>{voucher.voucherNo}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(voucher.voucherDate)} / {voucher.title}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.25}>
                      <Typography>{supplier?.name ?? '不明な取引先'}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {supplier?.code ?? voucher.supplierId}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.25}>
                      <Typography>{department?.name ?? '不明な部門'}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {department?.code ?? voucher.departmentId}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <VoucherStatusChip status={voucher.status} />
                  </TableCell>
                  <TableCell align="right">
                    <Chip label={`${voucher.lines.length} 行`} size="small" />
                  </TableCell>
                  <TableCell align="right">{formatCurrency(voucher.totalAmount)}</TableCell>
                  <TableCell>
                    <Box sx={{ width: 120 }}>
                      <LinearProgress variant="determinate" value={(voucher.totalAmount / maxTotalAmount) * 100} />
                    </Box>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={8} sx={{ p: 0, borderBottom: isExpanded ? 1 : 0, borderColor: 'divider' }}>
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2, bgcolor: 'action.hover' }}>
                        <Stack spacing={1.5}>
                          <Typography variant="body2" color="text.secondary">
                            {voucher.memo}
                          </Typography>

                          <Table size="small" aria-label={`${voucher.voucherNo} の明細`}>
                            <TableHead>
                              <TableRow>
                                <TableCell>品目</TableCell>
                                <TableCell>勘定科目</TableCell>
                                <TableCell>プロジェクト</TableCell>
                                <TableCell align="right">数量</TableCell>
                                <TableCell align="right">単価</TableCell>
                                <TableCell align="right">税額</TableCell>
                                <TableCell align="right">税込</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {voucher.lines.map((line) => {
                                const account = accountById.get(line.accountId)

                                return (
                                  <TableRow key={line.id}>
                                    <TableCell>
                                      <Stack spacing={0.25}>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                          {line.itemName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                          {line.note}
                                        </Typography>
                                      </Stack>
                                    </TableCell>
                                    <TableCell>
                                      {account ? `${account.code} / ${account.name}` : line.accountId}
                                    </TableCell>
                                    <TableCell>{line.projectCode}</TableCell>
                                    <TableCell align="right">{line.quantity}</TableCell>
                                    <TableCell align="right">{formatCurrency(line.unitPrice)}</TableCell>
                                    <TableCell align="right">{formatCurrency(line.taxAmount)}</TableCell>
                                    <TableCell align="right">{formatCurrency(line.lineAmount + line.taxAmount)}</TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        </Stack>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

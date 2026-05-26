import Chip from '@mui/material/Chip'
import type { ChipProps } from '@mui/material/Chip'
import { voucherStatusLabels } from '../data/masters.ts'
import type { VoucherStatus } from '../types.ts'

const statusColors: Record<VoucherStatus, ChipProps['color']> = {
  draft: 'default',
  submitted: 'info',
  approved: 'success',
  paid: 'secondary',
  voided: 'warning',
}

type VoucherStatusChipProps = {
  status: VoucherStatus
}

export function VoucherStatusChip({ status }: VoucherStatusChipProps) {
  return <Chip label={voucherStatusLabels[status]} color={statusColors[status]} size="small" variant="outlined" />
}

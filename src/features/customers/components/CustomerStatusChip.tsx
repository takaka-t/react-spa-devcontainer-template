import Chip from '@mui/material/Chip'
import type { ChipProps } from '@mui/material/Chip'
import { customerStatusLabels } from '../data/customers.ts'
import type { CustomerStatus } from '../types.ts'

const statusColors: Record<CustomerStatus, ChipProps['color']> = {
  active: 'success',
  trial: 'info',
  atRisk: 'warning',
  paused: 'default',
}

type CustomerStatusChipProps = {
  status: CustomerStatus
}

export function CustomerStatusChip({ status }: CustomerStatusChipProps) {
  return (
    // ステータス表示を小さなコンポーネントにしておくと、一覧と詳細で同じ表現を再利用できます。
    <Chip label={customerStatusLabels[status]} color={statusColors[status]} size="small" variant="outlined" />
  )
}

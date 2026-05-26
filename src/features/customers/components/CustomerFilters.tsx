import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { customerStatusLabels } from '../data/customers.ts'
import type { CustomerStatus } from '../types.ts'

export type CustomerStatusFilter = CustomerStatus | 'all'

type CustomerFiltersProps = {
  query: string
  status: CustomerStatusFilter
  onQueryChange: (query: string) => void
  onStatusChange: (status: CustomerStatusFilter) => void
  onClear: () => void
}

const statusFilterItems: { value: CustomerStatusFilter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: customerStatusLabels.active },
  { value: 'trial', label: customerStatusLabels.trial },
  { value: 'atRisk', label: customerStatusLabels.atRisk },
  { value: 'paused', label: customerStatusLabels.paused },
]

export function CustomerFilters({
  query,
  status,
  onQueryChange,
  onStatusChange,
  onClear,
}: CustomerFiltersProps) {
  return (
    // フィルター領域も Stack で横並びにし、狭い画面では自然に折り返します。
    // URL クエリと状態を同期する処理はページ側に置き、ここは入力 UI に専念させています。
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}>
      <TextField
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        label="顧客を検索"
        size="small"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
        <InputLabel id="customer-status-filter-label">ステータス</InputLabel>
        <Select
          labelId="customer-status-filter-label"
          value={status}
          label="ステータス"
          onChange={(event) => onStatusChange(event.target.value as CustomerStatusFilter)}
        >
          {statusFilterItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button onClick={onClear} startIcon={<FilterAltOffOutlinedIcon />} sx={{ flexShrink: 0 }}>
        条件をクリア
      </Button>
    </Stack>
  )
}

import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import { voucherStatusLabels } from '../data/masters.ts'
import type { Account, Department, Supplier, VoucherStatus } from '../types.ts'

export type VoucherSearchDraft = {
  keyword: string
  dateFrom: string
  dateTo: string
  supplierId: string
  departmentId: string
  accountId: string
  status: VoucherStatus | 'all'
  amountMin: string
  amountMax: string
}

type VoucherSearchFormProps = {
  draft: VoucherSearchDraft
  suppliers: Supplier[]
  departments: Department[]
  accounts: Account[]
  onDraftChange: (draft: VoucherSearchDraft) => void
  onApply: () => void
  onClear: () => void
}

const statusOptions: { value: VoucherSearchDraft['status']; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'draft', label: voucherStatusLabels.draft },
  { value: 'submitted', label: voucherStatusLabels.submitted },
  { value: 'approved', label: voucherStatusLabels.approved },
  { value: 'paid', label: voucherStatusLabels.paid },
  { value: 'voided', label: voucherStatusLabels.voided },
]

function getMasterLabel(master: Supplier | Department | Account) {
  return `${master.code} / ${master.name}`
}

export function VoucherSearchForm({
  draft,
  suppliers,
  departments,
  accounts,
  onDraftChange,
  onApply,
  onClear,
}: VoucherSearchFormProps) {
  const selectedSupplier = suppliers.find((supplier) => supplier.id === draft.supplierId) ?? null
  const selectedDepartment = departments.find((department) => department.id === draft.departmentId) ?? null
  const selectedAccount = accounts.find((account) => account.id === draft.accountId) ?? null

  return (
    // 明細を持つ伝票検索では、入力のたびに一覧が動くと利用者が条件を組み立てにくくなります。
    // そのため、このフォームは「入力中の条件」を保持し、検索ボタンで URL と一覧へ反映する作りにしています。
    <Stack spacing={2.5}>
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
        <TextField
          label="キーワード"
          value={draft.keyword}
          onChange={(event) => onDraftChange({ ...draft, keyword: event.target.value })}
          placeholder="伝票番号、件名、メモ、明細名、プロジェクト"
          fullWidth
          size="small"
        />

        <Autocomplete
          value={selectedSupplier}
          options={suppliers}
          getOptionLabel={getMasterLabel}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_event, value) => onDraftChange({ ...draft, supplierId: value?.id ?? '' })}
          sx={{ minWidth: { xs: '100%', lg: 280 } }}
          renderInput={(params) => <TextField {...params} label="取引先マスタ" size="small" />}
          renderOption={(props, option) => (
            <Stack component="li" spacing={0.25} {...props}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {option.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {option.code}
              </Typography>
            </Stack>
          )}
        />
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField
          label="伝票日 From"
          type="date"
          value={draft.dateFrom}
          onChange={(event) => onDraftChange({ ...draft, dateFrom: event.target.value })}
          size="small"
          sx={{ minWidth: { xs: '100%', md: 180 } }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="伝票日 To"
          type="date"
          value={draft.dateTo}
          onChange={(event) => onDraftChange({ ...draft, dateTo: event.target.value })}
          size="small"
          sx={{ minWidth: { xs: '100%', md: 180 } }}
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <Autocomplete
          value={selectedDepartment}
          options={departments}
          getOptionLabel={getMasterLabel}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_event, value) => onDraftChange({ ...draft, departmentId: value?.id ?? '' })}
          sx={{ minWidth: { xs: '100%', md: 220 } }}
          renderInput={(params) => <TextField {...params} label="部門マスタ" size="small" />}
        />

        <Autocomplete
          value={selectedAccount}
          options={accounts}
          getOptionLabel={getMasterLabel}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_event, value) => onDraftChange({ ...draft, accountId: value?.id ?? '' })}
          sx={{ minWidth: { xs: '100%', md: 240 } }}
          renderInput={(params) => <TextField {...params} label="明細の勘定科目" size="small" />}
        />
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { xs: 'stretch', md: 'center' } }}>
        <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 160 } }}>
          <InputLabel id="voucher-status-label">ステータス</InputLabel>
          <Select
            labelId="voucher-status-label"
            value={draft.status}
            label="ステータス"
            onChange={(event) =>
              onDraftChange({ ...draft, status: event.target.value as VoucherSearchDraft['status'] })
            }
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="税込金額 From"
          type="number"
          value={draft.amountMin}
          onChange={(event) => onDraftChange({ ...draft, amountMin: event.target.value })}
          size="small"
          sx={{ minWidth: { xs: '100%', md: 160 } }}
        />
        <TextField
          label="税込金額 To"
          type="number"
          value={draft.amountMax}
          onChange={(event) => onDraftChange({ ...draft, amountMax: event.target.value })}
          size="small"
          sx={{ minWidth: { xs: '100%', md: 160 } }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ ml: { md: 'auto' } }}>
          <Button variant="contained" startIcon={<SearchOutlinedIcon />} onClick={onApply}>
            検索
          </Button>
          <Button startIcon={<RestartAltOutlinedIcon />} onClick={onClear}>
            クリア
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

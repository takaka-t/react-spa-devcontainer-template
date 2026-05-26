import { useMemo, useState } from 'react'
import { useLoaderData, useSearchParams } from 'react-router'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { VoucherSearchForm } from '../../features/vouchers/components/VoucherSearchForm.tsx'
import type { VoucherSearchDraft } from '../../features/vouchers/components/VoucherSearchForm.tsx'
import { VoucherTable } from '../../features/vouchers/components/VoucherTable.tsx'
import { voucherStatusLabels } from '../../features/vouchers/data/masters.ts'
import type { Account, Department, Supplier, Voucher, VoucherStatus } from '../../features/vouchers/types.ts'
import { EmptyState } from '../../shared/components/EmptyState.tsx'
import { PageHeader } from '../../shared/components/PageHeader.tsx'
import { Section } from '../../shared/components/Section.tsx'
import { formatCurrency } from '../../shared/utils/format.ts'
import { vouchersLoader } from './vouchers.loader.ts'

type VoucherLoaderData = {
  vouchers: Voucher[]
  suppliers: Supplier[]
  departments: Department[]
  accounts: Account[]
}

const emptyDraft: VoucherSearchDraft = {
  keyword: '',
  dateFrom: '',
  dateTo: '',
  supplierId: '',
  departmentId: '',
  accountId: '',
  status: 'all',
  amountMin: '',
  amountMax: '',
}

function isVoucherStatus(value: string | null): value is VoucherStatus {
  return value === 'draft' || value === 'submitted' || value === 'approved' || value === 'paid' || value === 'voided'
}

function readDraftFromSearchParams(searchParams: URLSearchParams): VoucherSearchDraft {
  const status = searchParams.get('status')

  return {
    keyword: searchParams.get('q') ?? '',
    dateFrom: searchParams.get('from') ?? '',
    dateTo: searchParams.get('to') ?? '',
    supplierId: searchParams.get('supplier') ?? '',
    departmentId: searchParams.get('department') ?? '',
    accountId: searchParams.get('account') ?? '',
    status: isVoucherStatus(status) ? status : 'all',
    amountMin: searchParams.get('min') ?? '',
    amountMax: searchParams.get('max') ?? '',
  }
}

function buildSearchParams(draft: VoucherSearchDraft) {
  const searchParams = new URLSearchParams()
  const keyword = draft.keyword.trim()

  if (keyword) {
    searchParams.set('q', keyword)
  }

  if (draft.dateFrom) {
    searchParams.set('from', draft.dateFrom)
  }

  if (draft.dateTo) {
    searchParams.set('to', draft.dateTo)
  }

  if (draft.supplierId) {
    searchParams.set('supplier', draft.supplierId)
  }

  if (draft.departmentId) {
    searchParams.set('department', draft.departmentId)
  }

  if (draft.accountId) {
    searchParams.set('account', draft.accountId)
  }

  if (draft.status !== 'all') {
    searchParams.set('status', draft.status)
  }

  if (draft.amountMin) {
    searchParams.set('min', draft.amountMin)
  }

  if (draft.amountMax) {
    searchParams.set('max', draft.amountMax)
  }

  return searchParams
}

function parseAmount(value: string) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return undefined
  }

  const amount = Number(trimmedValue)

  return Number.isFinite(amount) ? amount : undefined
}

function normalizeText(value: string) {
  return value.trim().toLowerCase()
}

function formatAmountFilter(value: string) {
  const amount = parseAmount(value)

  return amount === undefined ? value : formatCurrency(amount)
}

export function VoucherSearchPage() {
  const loaderData = useLoaderData<typeof vouchersLoader>() as VoucherLoaderData
  const [searchParams, setSearchParams] = useSearchParams()
  const searchKey = searchParams.toString()
  const appliedDraft = useMemo(() => readDraftFromSearchParams(searchParams), [searchParams])
  const [draftState, setDraftState] = useState(() => ({
    searchKey,
    draft: appliedDraft,
  }))
  const draft = draftState.searchKey === searchKey ? draftState.draft : appliedDraft

  const supplierById = useMemo(
    () => new Map(loaderData.suppliers.map((supplier) => [supplier.id, supplier])),
    [loaderData.suppliers],
  )
  const departmentById = useMemo(
    () => new Map(loaderData.departments.map((department) => [department.id, department])),
    [loaderData.departments],
  )
  const accountById = useMemo(
    () => new Map(loaderData.accounts.map((account) => [account.id, account])),
    [loaderData.accounts],
  )

  const filteredVouchers = useMemo(() => {
    const keyword = normalizeText(appliedDraft.keyword)
    const amountMin = parseAmount(appliedDraft.amountMin)
    const amountMax = parseAmount(appliedDraft.amountMax)

    return loaderData.vouchers.filter((voucher) => {
      const supplier = supplierById.get(voucher.supplierId)
      const department = departmentById.get(voucher.departmentId)
      const searchableValues = [
        voucher.voucherNo,
        voucher.title,
        voucher.memo,
        supplier?.code,
        supplier?.name,
        department?.code,
        department?.name,
        ...voucher.lines.flatMap((line) => {
          const account = accountById.get(line.accountId)

          return [line.itemName, line.note, line.projectCode, account?.code, account?.name]
        }),
      ]

      const matchesKeyword =
        keyword.length === 0 ||
        searchableValues.some((value) => value !== undefined && normalizeText(value).includes(keyword))
      const matchesDateFrom = !appliedDraft.dateFrom || voucher.voucherDate >= appliedDraft.dateFrom
      const matchesDateTo = !appliedDraft.dateTo || voucher.voucherDate <= appliedDraft.dateTo
      const matchesSupplier = !appliedDraft.supplierId || voucher.supplierId === appliedDraft.supplierId
      const matchesDepartment = !appliedDraft.departmentId || voucher.departmentId === appliedDraft.departmentId
      const matchesAccount =
        !appliedDraft.accountId || voucher.lines.some((line) => line.accountId === appliedDraft.accountId)
      const matchesStatus = appliedDraft.status === 'all' || voucher.status === appliedDraft.status
      const matchesAmountMin = amountMin === undefined || voucher.totalAmount >= amountMin
      const matchesAmountMax = amountMax === undefined || voucher.totalAmount <= amountMax

      return (
        matchesKeyword &&
        matchesDateFrom &&
        matchesDateTo &&
        matchesSupplier &&
        matchesDepartment &&
        matchesAccount &&
        matchesStatus &&
        matchesAmountMin &&
        matchesAmountMax
      )
    })
  }, [accountById, appliedDraft, departmentById, loaderData.vouchers, supplierById])

  const totalAmount = filteredVouchers.reduce((sum, voucher) => sum + voucher.totalAmount, 0)
  const lineCount = filteredVouchers.reduce((sum, voucher) => sum + voucher.lines.length, 0)

  const activeFilters = [
    appliedDraft.keyword && { key: 'keyword', label: `キーワード: ${appliedDraft.keyword}` },
    appliedDraft.dateFrom && { key: 'dateFrom', label: `From: ${appliedDraft.dateFrom}` },
    appliedDraft.dateTo && { key: 'dateTo', label: `To: ${appliedDraft.dateTo}` },
    appliedDraft.supplierId && {
      key: 'supplierId',
      label: `取引先: ${supplierById.get(appliedDraft.supplierId)?.name ?? appliedDraft.supplierId}`,
    },
    appliedDraft.departmentId && {
      key: 'departmentId',
      label: `部門: ${departmentById.get(appliedDraft.departmentId)?.name ?? appliedDraft.departmentId}`,
    },
    appliedDraft.accountId && {
      key: 'accountId',
      label: `勘定科目: ${accountById.get(appliedDraft.accountId)?.name ?? appliedDraft.accountId}`,
    },
    appliedDraft.status !== 'all' && { key: 'status', label: `状態: ${voucherStatusLabels[appliedDraft.status]}` },
    appliedDraft.amountMin && { key: 'amountMin', label: `金額From: ${formatAmountFilter(appliedDraft.amountMin)}` },
    appliedDraft.amountMax && { key: 'amountMax', label: `金額To: ${formatAmountFilter(appliedDraft.amountMax)}` },
  ].filter((filter): filter is { key: keyof VoucherSearchDraft; label: string } => Boolean(filter))

  function applyDraft(nextDraft: VoucherSearchDraft) {
    const nextSearchParams = buildSearchParams(nextDraft)

    setDraftState({
      searchKey: nextSearchParams.toString(),
      draft: nextDraft,
    })
    setSearchParams(nextSearchParams)
  }

  function removeFilter(key: keyof VoucherSearchDraft) {
    const nextDraft: VoucherSearchDraft = {
      ...appliedDraft,
      [key]: key === 'status' ? 'all' : '',
    }

    applyDraft(nextDraft)
  }

  return (
    <Stack spacing={3}>
      <PageHeader
        title="伝票検索"
        description="ヘッダー条件と明細条件を組み合わせて、複雑な伝票データを検索できます。"
        breadcrumbs={[
          { label: 'ダッシュボード', to: '/' },
          { label: '伝票検索' },
        ]}
      />

      <Section title="検索条件" description="マスタ項目は候補から選択できます。コードと名称のどちらでも探せます。">
        <VoucherSearchForm
          draft={draft}
          suppliers={loaderData.suppliers}
          departments={loaderData.departments}
          accounts={loaderData.accounts}
          onDraftChange={(nextDraft) => setDraftState({ searchKey, draft: nextDraft })}
          onApply={() => applyDraft(draft)}
          onClear={() => {
            setDraftState({ searchKey: '', draft: emptyDraft })
            setSearchParams(new URLSearchParams())
          }}
        />
      </Section>

      <Stack spacing={1.5}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between' }}>
          <Stack spacing={0.5}>
            <Typography variant="h3">検索結果</Typography>
            <Typography color="text.secondary">
              {filteredVouchers.length} 件 / {lineCount} 明細 / 合計 {formatCurrency(totalAmount)}
            </Typography>
          </Stack>

          {activeFilters.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {activeFilters.map((filter) => (
                <Chip key={filter.key} label={filter.label} onDelete={() => removeFilter(filter.key)} />
              ))}
            </Stack>
          )}
        </Stack>

        <Paper sx={{ border: 1, borderColor: 'divider', overflow: 'hidden' }}>
          {filteredVouchers.length > 0 ? (
            <VoucherTable
              vouchers={filteredVouchers}
              suppliers={loaderData.suppliers}
              departments={loaderData.departments}
              accounts={loaderData.accounts}
            />
          ) : (
            <EmptyState
              title="条件に一致する伝票がありません"
              description="日付範囲、マスタ項目、明細の勘定科目などを見直してください。"
            />
          )}
        </Paper>
      </Stack>
    </Stack>
  )
}

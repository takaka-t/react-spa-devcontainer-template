import { useMemo } from 'react'
import { useLoaderData, useSearchParams } from 'react-router'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { CustomerFilters } from '../../features/customers/components/CustomerFilters.tsx'
import type { CustomerStatusFilter } from '../../features/customers/components/CustomerFilters.tsx'
import { CustomerTable } from '../../features/customers/components/CustomerTable.tsx'
import type { Customer } from '../../features/customers/types.ts'
import { EmptyState } from '../../shared/components/EmptyState.tsx'
import { PageHeader } from '../../shared/components/PageHeader.tsx'
import { Section } from '../../shared/components/Section.tsx'
import { customersLoader } from './customers.loader.ts'

function normalizeStatusFilter(value: string | null): CustomerStatusFilter {
  if (value === 'active' || value === 'trial' || value === 'atRisk' || value === 'paused') {
    return value
  }

  return 'all'
}

export function CustomerListPage() {
  const customers = useLoaderData<typeof customersLoader>() as Customer[]
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const status = normalizeStatusFilter(searchParams.get('status'))

  const filteredCustomers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return customers.filter((customer) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [customer.name, customer.company, customer.email, customer.owner].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        )
      const matchesStatus = status === 'all' || customer.status === status

      return matchesQuery && matchesStatus
    })
  }, [customers, query, status])

  function updateSearchParams(nextQuery: string, nextStatus: CustomerStatusFilter) {
    // 検索条件を URL に持たせると、リロード、共有、ブラウザの戻る/進むに強い画面になります。
    // フォームの内部 state だけに閉じるより、業務アプリの一覧画面では扱いやすい設計です。
    const nextParams = new URLSearchParams()

    if (nextQuery.trim()) {
      nextParams.set('q', nextQuery.trim())
    }

    if (nextStatus !== 'all') {
      nextParams.set('status', nextStatus)
    }

    setSearchParams(nextParams)
  }

  return (
    <Stack spacing={3}>
      <PageHeader
        title="顧客一覧"
        description="顧客の契約状況、担当者、健全性を確認できます。"
        breadcrumbs={[
          { label: 'ダッシュボード', to: '/' },
          { label: '顧客一覧' },
        ]}
      />

      <Section title="検索条件" description="顧客名、会社名、メール、担当者で検索できます。">
        <CustomerFilters
          query={query}
          status={status}
          onQueryChange={(nextQuery) => updateSearchParams(nextQuery, status)}
          onStatusChange={(nextStatus) => updateSearchParams(query, nextStatus)}
          onClear={() => setSearchParams(new URLSearchParams())}
        />
      </Section>

      <Paper sx={{ border: 1, borderColor: 'divider', overflow: 'hidden' }}>
        {filteredCustomers.length > 0 ? (
          <CustomerTable customers={filteredCustomers} />
        ) : (
          <EmptyState
            title="条件に一致する顧客がありません"
            description="検索キーワードやステータス条件を変更してください。"
          />
        )}
      </Paper>
    </Stack>
  )
}

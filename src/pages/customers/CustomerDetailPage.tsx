import { useLoaderData, useNavigate } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { CustomerStatusChip } from '../../features/customers/components/CustomerStatusChip.tsx'
import { getCustomerById } from '../../features/customers/data/customers.ts'
import type { Customer } from '../../features/customers/types.ts'
import { PageHeader } from '../../shared/components/PageHeader.tsx'
import { Section } from '../../shared/components/Section.tsx'
import { formatCurrency, formatDate } from '../../shared/utils/format.ts'

export function loader({ params }: LoaderFunctionArgs) {
  const customerId = params.customerId ?? ''
  const customer = getCustomerById(customerId)

  if (!customer) {
    // loader で Response を throw すると、対応する errorElement に処理を渡せます。
    // 「存在しない ID」のような想定済みエラーも、画面側の分岐で散らさず扱えます。
    throw new Response('Customer not found', {
      status: 404,
      statusText: '顧客が見つかりません',
    })
  }

  return customer
}

export function CustomerDetailPage() {
  const customer = useLoaderData<typeof loader>() as Customer
  const navigate = useNavigate()

  return (
    <Stack spacing={3}>
      <PageHeader
        title={customer.company}
        description={`${customer.name} さんの契約情報とフォロー状況`}
        breadcrumbs={[
          { label: 'ダッシュボード', to: '/' },
          { label: '顧客一覧', to: '/customers' },
          { label: customer.company },
        ]}
        actions={
          <Button
            onClick={() => {
              void navigate('/customers')
            }}
            startIcon={<ArrowBackOutlinedIcon />}
          >
            一覧へ戻る
          </Button>
        }
      />

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ alignItems: 'stretch' }}>
        <Section title="顧客概要" description="動的ルート /customers/:customerId で表示している詳細画面です。">
          <Stack spacing={2.5}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary">
                  担当者
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>{customer.owner}</Typography>
              </Stack>
              <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary">
                  ステータス
                </Typography>
                <CustomerStatusChip status={customer.status} />
              </Stack>
            </Stack>

            <Divider />

            <Stack spacing={1}>
              <Button
                href={`mailto:${customer.email}`}
                startIcon={<EmailOutlinedIcon />}
                sx={{ alignSelf: 'flex-start' }}
              >
                {customer.email}
              </Button>
              <Typography color="text.secondary">{customer.notes}</Typography>
            </Stack>
          </Stack>
        </Section>

        <Section title="契約と健全性">
          <Stack spacing={2.5} sx={{ minWidth: { lg: 360 } }}>
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                プラン
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>{customer.plan}</Typography>
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                年間収益
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>{formatCurrency(customer.revenue)}</Typography>
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                最終接点
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>{formatDate(customer.lastContactedAt)}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  健全性スコア
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>{customer.healthScore}</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={customer.healthScore}
                color={customer.healthScore < 60 ? 'warning' : 'primary'}
              />
            </Stack>
          </Stack>
        </Section>
      </Stack>
    </Stack>
  )
}

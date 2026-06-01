import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { CustomerStatusChip } from '../../features/customers/components/CustomerStatusChip.tsx'
import { customers } from '../../features/customers/data/customers.ts'
import { PageHeader } from '../../shared/components/PageHeader.tsx'
import { Section } from '../../shared/components/Section.tsx'
import { StatCard } from '../../shared/components/StatCard.tsx'
import { formatCurrency, formatDate } from '../../shared/utils/format.ts'

export function DashboardPage() {
  const activeCustomers = customers.filter((customer) => customer.status === 'active')
  const atRiskCustomers = customers.filter((customer) => customer.status === 'atRisk')
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.revenue, 0)
  const averageHealthScore = Math.round(
    customers.reduce((sum, customer) => sum + customer.healthScore, 0) / customers.length,
  )
  const recentCustomers = [...customers]
    .sort((firstCustomer, secondCustomer) => secondCustomer.lastContactedAt.localeCompare(firstCustomer.lastContactedAt))
    .slice(0, 4)

  return (
    <Stack spacing={3}>
      <PageHeader
        title="ダッシュボード"
        description="顧客状況の概要を確認できます。"
        breadcrumbs={[{ label: 'ダッシュボード' }]}
      />

      {/* Grid は KPI カードのようなカラム配置に限定して使っています。縦積みや単純な横並びは Stack を優先します。 */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="総顧客数"
            value={`${customers.length} 社`}
            helper="サンプルデータ全体"
            icon={<PeopleAltOutlinedIcon color="primary" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="契約中"
            value={`${activeCustomers.length} 社`}
            helper="現在アクティブな顧客"
            icon={<BusinessCenterOutlinedIcon color="success" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="年間収益"
            value={formatCurrency(totalRevenue)}
            helper="全顧客の合計"
            icon={<MonetizationOnOutlinedIcon color="secondary" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="平均健全性"
            value={`${averageHealthScore}`}
            helper={`要フォロー ${atRiskCustomers.length} 社`}
            icon={<TrendingUpOutlinedIcon color="warning" />}
          />
        </Grid>
      </Grid>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ alignItems: 'stretch' }}>
        <Section title="最近接点のあった顧客" description="最終接点日が新しい順に表示しています。">
          <Stack spacing={2}>
            {recentCustomers.map((customer) => (
              <Stack
                key={customer.id}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}
              >
                <Stack spacing={0.25}>
                  <Typography sx={{ fontWeight: 700 }}>{customer.company}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {customer.name} / {formatDate(customer.lastContactedAt)}
                  </Typography>
                </Stack>
                <CustomerStatusChip status={customer.status} />
              </Stack>
            ))}
          </Stack>
        </Section>

        <Section title="健全性サマリー" description="一覧や詳細で使う指標をカード外でも再利用できます。">
          <Stack spacing={2.25} sx={{ minWidth: { lg: 360 } }}>
            {customers.slice(0, 4).map((customer) => (
              <Stack key={customer.id} spacing={0.75}>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {customer.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {customer.healthScore}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={customer.healthScore}
                  color={customer.healthScore < 60 ? 'warning' : 'primary'}
                />
              </Stack>
            ))}
          </Stack>
        </Section>
      </Stack>
    </Stack>
  )
}

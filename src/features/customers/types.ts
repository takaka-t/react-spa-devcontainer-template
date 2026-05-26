export type CustomerStatus = 'active' | 'trial' | 'atRisk' | 'paused'

export type CustomerPlan = 'Starter' | 'Growth' | 'Enterprise'

export type Customer = {
  id: string
  name: string
  company: string
  email: string
  owner: string
  status: CustomerStatus
  plan: CustomerPlan
  lastContactedAt: string
  revenue: number
  healthScore: number
  notes: string
}

import type { Customer, CustomerStatus } from '../types.ts'

export const customerStatusLabels: Record<CustomerStatus, string> = {
  active: '契約中',
  trial: 'トライアル',
  atRisk: '要フォロー',
  paused: '休止中',
}

// サンプルでは API の代わりに静的データを使います。
// 実アプリでは、このファイルを fetch / React Query / SDK 呼び出しなどに置き換えると移行しやすいです。
export const customers: Customer[] = [
  {
    id: 'cus-001',
    name: '山田 花子',
    company: 'Northstar Labs',
    email: 'hanako.yamada@example.com',
    owner: '佐藤',
    status: 'active',
    plan: 'Enterprise',
    lastContactedAt: '2026-05-20',
    revenue: 1440000,
    healthScore: 92,
    notes: '四半期レビューで利用部門の追加相談あり。契約更新前に管理者向け説明会を設定する。',
  },
  {
    id: 'cus-002',
    name: '鈴木 太郎',
    company: 'Blue Field Inc.',
    email: 'taro.suzuki@example.com',
    owner: '高橋',
    status: 'trial',
    plan: 'Growth',
    lastContactedAt: '2026-05-18',
    revenue: 360000,
    healthScore: 78,
    notes: 'トライアル2週目。主要機能の利用は進んでいるが、権限設計の質問が残っている。',
  },
  {
    id: 'cus-003',
    name: '佐々木 美咲',
    company: 'Orbit Works',
    email: 'misaki.sasaki@example.com',
    owner: '田中',
    status: 'atRisk',
    plan: 'Starter',
    lastContactedAt: '2026-05-12',
    revenue: 120000,
    healthScore: 41,
    notes: '直近30日のログインが減少。次回連絡では利用目的の再確認とテンプレート提案を行う。',
  },
  {
    id: 'cus-004',
    name: '田村 健',
    company: 'Keystone Design',
    email: 'ken.tamura@example.com',
    owner: '佐藤',
    status: 'active',
    plan: 'Growth',
    lastContactedAt: '2026-05-21',
    revenue: 480000,
    healthScore: 86,
    notes: '導入チームからの評価が高い。来月、別部署への展開可否を確認する。',
  },
  {
    id: 'cus-005',
    name: '小林 彩',
    company: 'Lighthouse Media',
    email: 'aya.kobayashi@example.com',
    owner: '高橋',
    status: 'paused',
    plan: 'Starter',
    lastContactedAt: '2026-04-30',
    revenue: 96000,
    healthScore: 55,
    notes: '予算都合で一時休止。再開見込みは次期キャンペーン開始後。',
  },
  {
    id: 'cus-006',
    name: '中村 拓也',
    company: 'Atlas Retail',
    email: 'takuya.nakamura@example.com',
    owner: '田中',
    status: 'active',
    plan: 'Enterprise',
    lastContactedAt: '2026-05-23',
    revenue: 2160000,
    healthScore: 95,
    notes: '複数店舗で利用拡大中。請求レポートの自動化要望がある。',
  },
]

export function getCustomerById(customerId: string) {
  return customers.find((customer) => customer.id === customerId)
}

import type { Account, Department, Supplier, VoucherStatus } from '../types.ts'

export const voucherStatusLabels: Record<VoucherStatus, string> = {
  draft: '下書き',
  submitted: '申請中',
  approved: '承認済み',
  paid: '支払済み',
  voided: '取消',
}

// 検索項目で使う取引先マスタです。
// 実アプリでは API から取得したマスタを Autocomplete に渡す構成に置き換えることが多いです。
export const suppliers: Supplier[] = [
  { id: 'sup-001', code: 'S-1001', name: 'North Bridge Trading' },
  { id: 'sup-002', code: 'S-1002', name: 'Harbor Systems' },
  { id: 'sup-003', code: 'S-1003', name: 'Greenline Office' },
  { id: 'sup-004', code: 'S-1004', name: 'Atlas Logistics' },
  { id: 'sup-005', code: 'S-1005', name: 'Metro Creative' },
]

export const departments: Department[] = [
  { id: 'dep-sales', code: 'D-10', name: '営業部' },
  { id: 'dep-admin', code: 'D-20', name: '管理部' },
  { id: 'dep-product', code: 'D-30', name: 'プロダクト部' },
  { id: 'dep-marketing', code: 'D-40', name: 'マーケティング部' },
]

export const accounts: Account[] = [
  { id: 'acc-software', code: '6110', name: 'ソフトウェア利用料' },
  { id: 'acc-travel', code: '6210', name: '旅費交通費' },
  { id: 'acc-supplies', code: '6310', name: '消耗品費' },
  { id: 'acc-outsourcing', code: '6410', name: '外注費' },
  { id: 'acc-advertising', code: '6510', name: '広告宣伝費' },
  { id: 'acc-shipping', code: '6610', name: '荷造運賃' },
]

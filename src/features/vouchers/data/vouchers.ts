import type { Voucher, VoucherLine } from '../types.ts'

type VoucherInput = Omit<Voucher, 'subtotalAmount' | 'taxAmount' | 'totalAmount'>

function buildLine(line: Omit<VoucherLine, 'lineAmount' | 'taxAmount'>): VoucherLine {
  const lineAmount = line.quantity * line.unitPrice
  const taxAmount = Math.round(lineAmount * line.taxRate)

  return {
    ...line,
    lineAmount,
    taxAmount,
  }
}

function buildVoucher(input: VoucherInput): Voucher {
  const subtotalAmount = input.lines.reduce((sum, line) => sum + line.lineAmount, 0)
  const taxAmount = input.lines.reduce((sum, line) => sum + line.taxAmount, 0)

  return {
    ...input,
    subtotalAmount,
    taxAmount,
    totalAmount: subtotalAmount + taxAmount,
  }
}

// 明細を持つ伝票データのサンプルです。
// 一覧ではヘッダー情報を見せ、必要なときだけ明細を展開できる UI にしています。
export const vouchers: Voucher[] = [
  buildVoucher({
    id: 'vch-001',
    voucherNo: 'AP-2026-0001',
    voucherDate: '2026-05-02',
    supplierId: 'sup-001',
    departmentId: 'dep-sales',
    status: 'approved',
    title: '展示会出展関連費用',
    memo: '春季展示会の装飾、配送、当日備品をまとめた伝票。',
    lines: [
      buildLine({
        id: 'line-001-1',
        accountId: 'acc-advertising',
        itemName: 'ブース装飾デザイン',
        projectCode: 'PRJ-EXPO',
        quantity: 1,
        unitPrice: 280000,
        taxRate: 0.1,
        note: 'デザイン、入稿、当日調整を含む',
      }),
      buildLine({
        id: 'line-001-2',
        accountId: 'acc-shipping',
        itemName: '展示物の往復配送',
        projectCode: 'PRJ-EXPO',
        quantity: 2,
        unitPrice: 42000,
        taxRate: 0.1,
        note: '会場搬入と返送',
      }),
      buildLine({
        id: 'line-001-3',
        accountId: 'acc-supplies',
        itemName: '配布資料用備品',
        projectCode: 'PRJ-EXPO',
        quantity: 12,
        unitPrice: 1800,
        taxRate: 0.1,
        note: 'ファイル、名札、卓上備品',
      }),
    ],
  }),
  buildVoucher({
    id: 'vch-002',
    voucherNo: 'AP-2026-0002',
    voucherDate: '2026-05-08',
    supplierId: 'sup-002',
    departmentId: 'dep-product',
    status: 'submitted',
    title: '開発環境ライセンス更新',
    memo: '開発チーム向けツールの年次更新。利用者数は前期より増加。',
    lines: [
      buildLine({
        id: 'line-002-1',
        accountId: 'acc-software',
        itemName: 'コード品質管理 SaaS',
        projectCode: 'PRJ-CORE',
        quantity: 18,
        unitPrice: 9600,
        taxRate: 0.1,
        note: '年間契約の月割単価',
      }),
      buildLine({
        id: 'line-002-2',
        accountId: 'acc-software',
        itemName: '設計レビュー支援ツール',
        projectCode: 'PRJ-CORE',
        quantity: 8,
        unitPrice: 14400,
        taxRate: 0.1,
        note: 'プロダクト部のみ利用',
      }),
    ],
  }),
  buildVoucher({
    id: 'vch-003',
    voucherNo: 'AP-2026-0003',
    voucherDate: '2026-05-10',
    supplierId: 'sup-003',
    departmentId: 'dep-admin',
    status: 'paid',
    title: 'オフィス消耗品補充',
    memo: '月次でまとめて購入しているオフィス備品。',
    lines: [
      buildLine({
        id: 'line-003-1',
        accountId: 'acc-supplies',
        itemName: 'コピー用紙',
        projectCode: 'GEN-ADMIN',
        quantity: 20,
        unitPrice: 720,
        taxRate: 0.1,
        note: 'A4 500枚入り',
      }),
      buildLine({
        id: 'line-003-2',
        accountId: 'acc-supplies',
        itemName: '文具セット',
        projectCode: 'GEN-ADMIN',
        quantity: 10,
        unitPrice: 3200,
        taxRate: 0.1,
        note: '新入社員用',
      }),
      buildLine({
        id: 'line-003-3',
        accountId: 'acc-shipping',
        itemName: '配送手数料',
        projectCode: 'GEN-ADMIN',
        quantity: 1,
        unitPrice: 2500,
        taxRate: 0.1,
        note: 'まとめ配送',
      }),
    ],
  }),
  buildVoucher({
    id: 'vch-004',
    voucherNo: 'AP-2026-0004',
    voucherDate: '2026-05-14',
    supplierId: 'sup-004',
    departmentId: 'dep-sales',
    status: 'draft',
    title: '顧客訪問交通費',
    memo: '複数顧客を訪問した日の交通費。経路確認待ち。',
    lines: [
      buildLine({
        id: 'line-004-1',
        accountId: 'acc-travel',
        itemName: '新幹線往復',
        projectCode: 'PRJ-SALES',
        quantity: 2,
        unitPrice: 18120,
        taxRate: 0.1,
        note: '東京から大阪',
      }),
      buildLine({
        id: 'line-004-2',
        accountId: 'acc-travel',
        itemName: '市内移動',
        projectCode: 'PRJ-SALES',
        quantity: 6,
        unitPrice: 380,
        taxRate: 0.1,
        note: '地下鉄とバス',
      }),
    ],
  }),
  buildVoucher({
    id: 'vch-005',
    voucherNo: 'AP-2026-0005',
    voucherDate: '2026-05-18',
    supplierId: 'sup-005',
    departmentId: 'dep-marketing',
    status: 'approved',
    title: '広告クリエイティブ制作',
    memo: '新サービス告知用のバナー、短尺動画、LP素材制作。',
    lines: [
      buildLine({
        id: 'line-005-1',
        accountId: 'acc-outsourcing',
        itemName: 'LP メインビジュアル制作',
        projectCode: 'PRJ-LAUNCH',
        quantity: 1,
        unitPrice: 180000,
        taxRate: 0.1,
        note: 'PC と mobile の2サイズ',
      }),
      buildLine({
        id: 'line-005-2',
        accountId: 'acc-advertising',
        itemName: '短尺動画編集',
        projectCode: 'PRJ-LAUNCH',
        quantity: 3,
        unitPrice: 76000,
        taxRate: 0.1,
        note: '15秒、30秒、縦型',
      }),
    ],
  }),
  buildVoucher({
    id: 'vch-006',
    voucherNo: 'AP-2026-0006',
    voucherDate: '2026-05-22',
    supplierId: 'sup-002',
    departmentId: 'dep-product',
    status: 'voided',
    title: '検証環境追加費用',
    memo: '契約条件の見直しにより取消。再申請予定。',
    lines: [
      buildLine({
        id: 'line-006-1',
        accountId: 'acc-software',
        itemName: '負荷検証クラウド利用料',
        projectCode: 'PRJ-CORE',
        quantity: 40,
        unitPrice: 2100,
        taxRate: 0.1,
        note: '見積条件を再確認中',
      }),
    ],
  }),
]

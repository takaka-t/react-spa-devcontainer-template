import { accounts, departments, suppliers } from '../../features/vouchers/data/masters.ts'
import { vouchers } from '../../features/vouchers/data/vouchers.ts'

export function vouchersLoader() {
  // 伝票一覧と検索に必要なマスタを同時に返します。
  // 実アプリでは、画面初期表示に必要な API をまとめて呼び出す場所として使えます。
  return {
    vouchers,
    suppliers,
    departments,
    accounts,
  }
}

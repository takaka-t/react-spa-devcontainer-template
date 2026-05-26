export type VoucherStatus = 'draft' | 'submitted' | 'approved' | 'paid' | 'voided'

export type Supplier = {
  id: string
  code: string
  name: string
}

export type Department = {
  id: string
  code: string
  name: string
}

export type Account = {
  id: string
  code: string
  name: string
}

export type VoucherLine = {
  id: string
  accountId: string
  itemName: string
  projectCode: string
  quantity: number
  unitPrice: number
  taxRate: number
  lineAmount: number
  taxAmount: number
  note: string
}

export type Voucher = {
  id: string
  voucherNo: string
  voucherDate: string
  supplierId: string
  departmentId: string
  status: VoucherStatus
  title: string
  memo: string
  lines: VoucherLine[]
  subtotalAmount: number
  taxAmount: number
  totalAmount: number
}

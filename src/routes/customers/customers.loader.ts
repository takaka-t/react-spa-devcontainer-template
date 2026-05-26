import type { LoaderFunctionArgs } from 'react-router'
import { customers, getCustomerById } from '../../features/customers/data/customers.ts'

export function customersLoader() {
  // loader は画面表示前に必要なデータを準備するための React Router の仕組みです。
  // 今回は静的データを返していますが、実アプリではここを API 呼び出しに置き換えられます。
  return customers
}

export function customerDetailLoader({ params }: LoaderFunctionArgs) {
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

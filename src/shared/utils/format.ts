const currencyFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function formatDate(value: string) {
  // YYYY-MM-DD を new Date(value) で直接扱うと UTC として解釈され、
  // 利用者のタイムゾーンによって前日表示になることがあります。
  // 日付だけを扱う画面では、年月日を分解してローカル日付として生成します。
  const [yearText, monthText, dayText] = value.split('-')
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)

  if (!year || !month || !day) {
    return value
  }

  return dateFormatter.format(new Date(year, month - 1, day))
}
